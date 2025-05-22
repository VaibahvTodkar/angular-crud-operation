import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './users-create.component.html',
  styleUrl: './users-create.component.scss'
})
export class UsersCreateComponent {
  updateUserForm!: FormGroup;

  constructor(private _userService: UserService) {
    this.updateUserForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      skill: new FormControl('')
    })
  }
  userInfo() {
    console.log(this.updateUserForm.value);
    this._userService.createUser(this.updateUserForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        console.log("form submit successfully")
        this.updateUserForm.reset();
        alert("Form submit Successfully");
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
