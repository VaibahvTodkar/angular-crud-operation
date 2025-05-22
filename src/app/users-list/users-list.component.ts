import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [NgFor, RouterLink],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  userlist:any | undefined;
  constructor(private _user:UserService){
    this.getData()
  }

  getData(){
    this._user.getUsersList().subscribe({next:(resp:any)=>{
      console.log(resp);
      this.userlist = resp.result;
    },error:(err)=>{
      console.log(err);
    }
  })
  }

  deleteUser(id:any){
      console.log(id);
      // confirm("Conform to delete User? ")
      const isConform = confirm("Conform to delete User?");
      console.log(isConform);
      if(isConform){
        this._user.deleteUser(id).subscribe({next:(resp)=>{
          console.log(resp);
          alert("User deleted Succressfully");
          this.getData();
        },error:(err)=>{
          console.log(err);
        }})
      }
  }
}
