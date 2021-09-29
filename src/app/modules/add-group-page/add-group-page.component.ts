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
  public isFriendCorrect: boolean = true;
  public subscriptions!: Subscription;
  formTemplate = this.fb.group({
    groupName: new FormControl('', Validators.required),
    users: this.fb.array([
      this.createUser()
    ])
  });

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
    this.users.removeAt(index);
  }

  public ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      (this.formTemplate.controls['users'] as FormArray).push(this.createUser());
    }

  }

  public saveGroup(): void {
    const addGroupSub = this.api.createGroup(
      this.formTemplate.value.groupName, this.formTemplate.value.users.map((item: { email: any; }) => item.email))
      .subscribe(() => {
        this.router.navigate(['/main']);
      })
    this.subscriptions.add(addGroupSub);
  }

  public cancel(): void {
    this.router.navigate(['/main']);
  }

  public friendCheck(friend: string): void {
    const friendCheckSub = this.api.isInFriendList(this.cookieService.get('userId'), friend).subscribe(data => {
      this.isFriendCorrect = data.correctUser;
    })
    this.subscriptions.add(friendCheckSub);
  }

}
