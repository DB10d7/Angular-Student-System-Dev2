import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { BatchService } from 'src/app/batch/batch.service';
import { UserUpdateRequestPayload } from '../update-user/update-user-request.payload';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  userUpdateRequestPayload : UserUpdateRequestPayload;
  userUpdateForm : any= FormGroup;
  listBatch:any;
  constructor(public authService:AuthService,private batchService: BatchService, private router:Router,private route: ActivatedRoute) {
    this.userUpdateRequestPayload = {
      username: '',
      name: '',
      password: '',
      email: '',
      batch: '',
      role: ''
    } 
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((result:any)=>{
      console.log(result);
      this.userUpdateForm = new FormGroup ({
        username: new FormControl(result['username']),
        name: new FormControl(result['name']),
        password: new FormControl(result['password']),
        email: new FormControl(result['email']),
        batch: new FormControl(result['batch']),
        role: new FormControl(result['role']) 
       });
       if(this.authService.getUserRole() === 'SUPER-ADMIN'){
        this.viewBatchList();
       }
       
    });
  }
  viewBatchList(){
    this.batchService.getBatchList().subscribe((resp)=>{

      this.listBatch = resp;
      console.log(this.listBatch);
      })
  }
  onSubmit(){
    this.userUpdateRequestPayload.username = this.userUpdateForm.get('username').value;
    this.userUpdateRequestPayload.name = this.userUpdateForm.get('name').value;
    this.userUpdateRequestPayload.email = this.userUpdateForm.get('email').value;
    this.userUpdateRequestPayload.password = this.userUpdateForm.get('password').value;
    this.userUpdateRequestPayload.batch = this.userUpdateForm.get('batch').value;
    this.userUpdateRequestPayload.role = this.userUpdateForm.get('role').value;


    console.warn(this.userUpdateRequestPayload);
    this.authService.updateUser(this.route.snapshot.params['name'],this.userUpdateRequestPayload).subscribe((data)=>{
      console.warn("data is here",data);
      alert("User Updated Successfully");
      this.router.navigate(['']);
    })
  }
}