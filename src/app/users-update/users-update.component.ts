import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './users-update.component.html',
  styleUrl: './users-update.component.scss'
})
export class UsersUpdateComponent {
  userForm!: FormGroup;
  data:any | null
  updateUserForm: any | undefined;
  constructor(private _userService: UserService, private _actRoute:ActivatedRoute) {
    const id = this._actRoute.snapshot.paramMap.get('id')
    if(id){
      console.log(id)
      this.getData(id) 
    }

    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      contact: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      skill: new FormControl(''),
    })
  }
  userInfo() {
    console.log(this.updateUserForm.value);
    const id = this._actRoute.snapshot.paramMap.get('id')
    this.updateUserForm.value.id=id;
    // return false;
    this._userService.updateUser(this.userForm.value).subscribe({
      next: (resp) => {
        //console.log(resp);
        console.log("form updated successfully")
        // this.userForm.reset();
        alert("Form updated Successfully");
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getData(id:any){
    this._userService.getUserbyId(id).subscribe({next:(resp:any)=>{
      console.log(resp);
      this.data=resp.result;

      this.userForm = new FormGroup({
        firstName: new FormControl(this.data.firstName),
        lastName: new FormControl(this.data.lastName),
        email: new FormControl(this.data.email),
        contact: new FormControl(this.data.contact),
        age: new FormControl(this.data.age),
        gender: new FormControl(this.data.gender),
        skill: new FormControl(this.data.skill),
      })

       
    },error:(err)=>{
      console.log(err);
    }})
  }
}
