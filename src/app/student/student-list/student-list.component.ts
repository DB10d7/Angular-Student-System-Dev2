import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  listStudent:any;
  searchText = '';
  constructor(private studentService: StudentService,public authService:AuthService ,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.studentService.getStudentList().subscribe((resp)=>{

      this.listStudent = resp;
      })
  }
  viewStudent(name: String){
    this.router.navigate(['singleStudent/',name]);
  }
  viewAllDays(name: String){
    this.router.navigate(['dayListByStudent/',name]);
  }
  deleteUnverifiedUser(id:Number){
    this.authService.deleteUser(id).subscribe(data =>{
      alert(data);
      this.ngOnInit();
    }, error =>{
      alert("Srry");
    });
  }
}
