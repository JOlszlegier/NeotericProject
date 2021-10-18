import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../core/services/group-service";
import {AuthApiService} from "../../core/services/auth-api-service";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit {
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
              private fb: FormBuilder, private api: AuthApiService, private cookieService: CookieService) {
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
    this.users.removeAt(index);
  }

  public ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      (this.formTemplate.controls['users'] as FormArray).push(this.createUser());
    }
  }

  public saveGroup(): void {
    let emailsArray: string[] = this.formTemplate.value.users.map((item: { email: any; }) => item.email);
    emailsArray.push(this.cookieService.get(`userName`))
    const addGroupSub = this.api.createGroup(
      this.formTemplate.value.groupName, emailsArray)
      .subscribe(() => {
        this.router.navigate(['/main']);
      })
    this.subscriptions.add(addGroupSub);
  }

  public cancel(): void {
    this.router.navigate(['/main']);
  }

  public friendCheck(friend: string): void {
    const friendCheckSub = this.api.isInFriendList(this.cookieService.get('userId'), friend, "Dashboard").subscribe(data => {
      this.isFriendCorrect = data.correctUser;
      if (!data.correctUser) {
        this.incorrectUsers.push(friend);
      }
      let emailsArray: string[] = this.formTemplate.value.users.map((item: { email: any; }) => item.email);
      for (let index in this.incorrectUsers) {
        console.log(this.incorrectUsers);
        if (!emailsArray.includes(this.incorrectUsers[index])) {
          this.incorrectUsers.splice(Number(index), 1);
        }
      }
    })

    this.subscriptions.add(friendCheckSub);
  }

}
