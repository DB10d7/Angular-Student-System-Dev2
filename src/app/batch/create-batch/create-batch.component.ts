import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BatchService } from '../batch.service';
import { CreateBatchRequestPayload } from './create-batch-request.payload';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})
export class CreateBatchComponent implements OnInit {
  
  createBatchRequestPayload: any= CreateBatchRequestPayload;
  createBatchForm: any;

  constructor(private router:Router,private batchService: BatchService) {
    this.createBatchRequestPayload = {
      name:'',
      description:'',
      createdBy:''
    }
    this.createBatchRequestPayload ={
      name:'',
      description:'',
      createdBy:''
    }
   }

  ngOnInit(): void {
    this.createBatchForm = new FormGroup({
      name: new FormControl('',Validators.required),
      description: new FormControl('', Validators.required),
      createdBy: new FormControl('', Validators.required) 
    })
  }
  
  onSubmit(){
    this.createBatchRequestPayload.name= this.createBatchForm.get('name').value;
    this.createBatchRequestPayload.description= this.createBatchForm.get('description').value;
    this.createBatchRequestPayload.createdBy= this.createBatchForm.get('craetedBy').value;

    this.batchService.createBatch(this.createBatchRequestPayload)
      .subscribe(data => {
        this.router.navigate(['batchList']),
        console.log(data);
      }, error => {
        console.log(error);
        
      });
  }

}