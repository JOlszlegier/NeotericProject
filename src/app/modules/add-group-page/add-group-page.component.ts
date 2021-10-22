import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../core/services/group-service";
import {AuthApiService} from "../../core/services/auth-api-service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar,MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit,OnDestroy {
  public isFriendCorrect: boolean = false;
  public subscriptions: Subscription = new Subscription();
  formTemplate = this.fb.group({
    groupName: new FormControl('', Validators.required),
    users: this.fb.array([
      this.createUser()
    ])
  });
  public incorrectUsers: string[] = [];

  public createUser(): FormGroup {
    return this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  constructor(private router: Router, private groupService: GroupService,
              private fb: FormBuilder, private api: AuthApiService, private cookieService: CookieService,
              private snackBar:MatSnackBar) {
  }

  public get users(): FormArray {
    return this.formTemplate.get('users') as FormArray
  }


  public addNewPeople(): void {
    (this.formTemplate.controls['users'] as FormArray).push(this.createUser())
  }

  public removePeople(index: number) {
    if (this.incorrectUsers.includes(this.formTemplate.value.users[index].email)) {
      this.incorrectUsers.splice(this.incorrectUsers.indexOf(this.formTemplate.value.users[index]), 1);
    }
    if(this.incorrectUsers.length===0){
      this.snackBar.dismiss();
    }
    this.users.removeAt(index);
  }

  public ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      (this.formTemplate.controls['users'] as FormArray).push(this.createUser());
    }
  }

  public ngOnDestroy():void {
    this.subscriptions.unsubscribe();
  }

  public saveGroup(): void {
    let emailsArray: string[] = this.formTemplate.value.users.map((item: { email: any; }) => item.email);
    emailsArray.push(this.cookieService.get(`userName`))
    const addGroupSub = this.api.createGroup(
      this.formTemplate.value.groupName, emailsArray)
      .subscribe(() => {
        this.router.navigate(['/main']);
        this.openSuccessSnackBar('Group added successfully');
      })
    this.subscriptions.add(addGroupSub);
  }

  public cancel(): void {
    this.router.navigate(['/main']);
  }

  public openErrorSnackBar(message:string):void{
    this.snackBar.open(message,'',{
      panelClass:['add-group-error-snackbar'],
    })
  }

  public openSuccessSnackBar(message:string):void{
    this.snackBar.open(message,'',{
      panelClass:['add-group-success-snackbar'],
      horizontalPosition:"left",
      verticalPosition:"top",
      duration:2000
    })
  }

  public friendCheck(friend: string): void {
    const friendCheckSub = this.api.isInFriendList(this.cookieService.get('userId'), friend, "Dashboard").subscribe(data => {
      this.isFriendCorrect = data.correctUser;
      if (!data.correctUser) {
        this.incorrectUsers.push(friend);
        this.openErrorSnackBar('Incorrect user,please change!')
      }
      let emailsArray: string[] = this.formTemplate.value.users.map((item: { email: any; }) => item.email);
      for (let index in this.incorrectUsers) {
        if (!emailsArray.includes(this.incorrectUsers[index])) {
          this.incorrectUsers.splice(Number(index), 1);
        }
      }
      if(this.incorrectUsers.length===0){
        this.snackBar.dismiss();
      }
    })

    this.subscriptions.add(friendCheckSub);
  }

}
