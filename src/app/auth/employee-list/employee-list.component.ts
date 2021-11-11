import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  listEmployee:any;
  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.authService.getEmployeeList().subscribe((resp)=>{
  
      this.listEmployee = resp;
      })
  }
  updateUser(name: String){
    this.router.navigate(['updateUser/',name]);
  }
}