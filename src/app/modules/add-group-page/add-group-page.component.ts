import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {Router} from "@angular/router";

import {User} from "../../core/interfaces/interfaces";
import {GroupService} from "../../core/services/group-service";

@Component({
  selector: 'app-add-group-page',
  templateUrl: './add-group-page.component.html',
  styleUrls: ['./add-group-page.component.scss']
})
export class AddGroupPageComponent implements OnInit {
  groupName: string = '';
  groupNewPeople: FormArray = new FormArray([])
  newGroupUsers: User[] = []

  constructor(private router: Router, private groupService: GroupService) {
  }

  addNewPeople() {
    this.groupNewPeople.controls.push(new FormControl(''));
    this.newGroupUsers.push({email: '', name: ''})
  }

  removePeople(index: number) {
    this.groupNewPeople.removeAt(index);
  }

  ngOnInit() {
    for (let i = 0; i < 3; i++) {
      this.groupNewPeople.controls.push(new FormControl(''))
      this.newGroupUsers.push({email: '', name: ''})
    }
  }

  saveGroup() {
    this.groupService.addNewGroup(this.groupName, this.newGroupUsers)
    this.router.navigate(['/main'])
  }
}
