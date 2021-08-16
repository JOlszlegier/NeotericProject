import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit {
  groupName: string = '';
  groupNewPeople: FormArray = new FormArray([])
  newGroupUsersEmails: string [] = [];
  newGroupUsersNames: string [] = [];

  addNewPeople() {
    this.groupNewPeople.controls.push(new FormControl(''));
  }

  removePeople(index: number) {
    this.groupNewPeople.removeAt(index);
  }

  ngOnInit() {
    this.groupNewPeople.controls.push(new FormControl(''))
    this.groupNewPeople.controls.push(new FormControl(''))
    this.groupNewPeople.controls.push(new FormControl(''))
  }

  saveGroup() {
    console.log(this.newGroupUsersEmails)
    console.log(this.newGroupUsersNames)
  }
}
