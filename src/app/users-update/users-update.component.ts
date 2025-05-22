import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './users-update.component.html',
  styleUrl: './users-update.component.scss'
})
export class UsersUpdateComponent {
  userForm!: FormGroup;

  constructor(
    private _userService: UserService,
    private _actRoute: ActivatedRoute
  ) {
    // Initialize the form
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      skill: new FormControl(''),
    });

    // Load data if ID is present in route
    const id = this._actRoute.snapshot.paramMap.get('id');
    if (id) {
      console.log("Edit User ID:", id);
      this.getData(id);
    }
  }

  // Fetch user data and patch into form
  getData(id: string) {
    this._userService.getUserbyId(id).subscribe({
      next: (resp: any) => {
        console.log("API Response:", resp);
        const userData = resp.updateOneUser; // Adjusted based on your backend response

        if (userData) {
          this.userForm.setValue({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            contact: userData.contact || '',
            age: userData.age || '',
            gender: userData.gender || '',
            skill: userData.skill || ''
          });
        } else {
          console.warn("User data is missing or malformed:", resp);
        }
      },
      error: (err) => {
        console.error("API Error:", err);
      }
    });
  }

  // Submit updated form
  submit() {
    const id = this._actRoute.snapshot.paramMap.get('id');
    const updatedData = { ...this.userForm.value, id };

    this._userService.updateUser(updatedData).subscribe({
      next: (resp) => {
        console.log("Form updated successfully:", resp);
        alert("Form updated successfully!");
      },
      error: (err) => {
        console.error("Update error:", err);
      }
    });
  }
}
