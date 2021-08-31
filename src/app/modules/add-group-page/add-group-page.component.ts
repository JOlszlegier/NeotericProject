import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, Validators} from "@angular/forms";


import {User} from "../../core/interfaces/interfaces";
import {GroupService} from "../../core/services/group-service";

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit {
  public groupName: string = '';
  public newGroupUsers: User[] = [];

  formTemplate = this.fb.group({
    users: this.fb.array([
      this.fb.control('', Validators.required)
    ])
  });


  constructor(private router: Router, private groupService: GroupService, private fb: FormBuilder) {
  }

  get users(): FormArray {
    return this.formTemplate.get('users') as FormArray
  }

  addNewPeople(): void {
    this.users.push(this.fb.control(''));
  }


  ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      this.users.push(this.fb.control(''));
    }
  }

  saveGroup(): void {
    this.groupService.addNewGroup(this.groupName, this.newGroupUsers)
    console.log(this.newGroupUsers);

    // this.router.navigate(['/main'])
  }
}
