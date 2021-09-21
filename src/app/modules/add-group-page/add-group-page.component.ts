import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {GroupService} from "../../core/services/group-service";
import {AuthApiService} from "../../core/services/auth-api-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit {

  public subscriptions!: Subscription;
  formTemplate = this.fb.group({
    groupName: new FormControl('', Validators.required),
    users: this.fb.array([
      this.createUser()
    ])
  });

  createUser() {
    return this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  constructor(private router: Router, private groupService: GroupService,
              private fb: FormBuilder, private api: AuthApiService) {
  }

  get users(): FormArray {
    return this.formTemplate.get('users') as FormArray
  }


  addNewPeople(): void {
    (this.formTemplate.controls['users'] as FormArray).push(this.createUser())
  }

  removePeople(index: number) {
    this.users.removeAt(index);
  }

  ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      (this.formTemplate.controls['users'] as FormArray).push(this.createUser());
    }

  }

  saveGroup(): void {
    const addGroupSub = this.api.createGroup(
      this.formTemplate.value.groupName, this.formTemplate.value.users.map((item: { email: any; }) => item.email))
      .subscribe(() => {
        this.router.navigate(['/main']);
      })
    this.subscriptions.add(addGroupSub);
  }

  cancel(): void {
    this.router.navigate(['/main']);
  }
}
