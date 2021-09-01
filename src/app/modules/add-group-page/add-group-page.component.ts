import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder} from "@angular/forms";
import {GroupService} from "../../core/services/group-service";

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit {


  // formTemplate = this.fb.group({
  //   groupName: [''],
  //   users: this.fb.array([
  //     this.fb.control('', Validators.required)
  //   ])
  // });

  formTemplate = this.fb.group({
    groupName: [''],
    users: this.fb.array([
      this.fb.group({
        name: '',
        email: ''
      })
    ])
  })

  constructor(private router: Router, private groupService: GroupService, private fb: FormBuilder) {
  }

  get users(): FormArray {
    return this.formTemplate.get('users') as FormArray
  }

  addNewPeople(): void {
    this.users.push(this.fb.control(''));
  }

  removePeople(index: number) {
    this.users.removeAt(index);
  }

  ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      this.users.push(this.fb.control(''));
    }
  }

  saveGroup(): void {
    console.log(this.formTemplate.value)
    //this.groupService.addNewGroup(this.groupName, this.newGroupUsers)
    this.router.navigate(['/main'])
  }
}
