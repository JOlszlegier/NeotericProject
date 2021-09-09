import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {GroupService} from "../../core/services/group-service";

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit {

  formTemplate = this.fb.group({
    groupName: new FormControl('', Validators.required),
    users: this.fb.array([
      this.createUser()
    ])
  });

  createUser() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  constructor(private router: Router, private groupService: GroupService,
              private fb: FormBuilder) {
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
    console.log(this.formTemplate.value);
    //add group to backend
    console.log(this.formTemplate.valid);
    this.router.navigate(['/main']);
  }

  cancel(): void {
    this.router.navigate(['/main']);
  }
}
