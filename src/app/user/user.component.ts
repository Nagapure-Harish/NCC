import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../user';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{


  
  user: User = new User();
  users: any = [];
  
  
  constructor(  private fb:FormBuilder,private userService:UserService,private toast:ToastrService) { }


  public userfrm = this.fb.group({
    srNo:this.fb.control('',[Validators.required]),
    regNo:this.fb.control('',[Validators.required]),
    name:this.fb.control('',[Validators.required]),
    fatherName:this.fb.control('',[Validators.required]),
    address:this.fb.control('',[Validators.required]),
    rank:this.fb.control('',[Validators.required]),
    adhar:this.fb.control('',[Validators.required]),
    accountNo:this.fb.control('',[Validators.required]),
    bankName:this.fb.control('',[Validators.required]),
    dateOfBirth:this.fb.control('',[Validators.required]),
    className:this.fb.control('',[Validators.required]),
    yearOfNcc:this.fb.control('',[Validators.required]),
    ifcCode:this.fb.control('',[Validators.required]),
    mobile:this.fb.control('',[Validators.required]),
    remark:this.fb.control('',[Validators.required]),
  });

  modalMode: 'create' | 'edit' = 'create';

  ngOnInit(): void {
   this.loadUsers();

  this.get();
  }

  edit(obj: any) {
    this.userfrm.patchValue(obj);
    this.modalMode = 'edit';

  }

  resetForm() {
    this.userfrm.reset();
    this.modalMode = 'create';
  }

  loadUsers(): void {
    this.userService.getCadet().subscribe(
      (data: any[]) => {
        this.users = data;
        console.log(this.users)
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // ngAfterViewInit() {
  //   // DataTables initialization should be done here if the table content is dynamic
  //   $(document).ready(function() {
  //     setTimeout(()=>{
  //       $('#example').DataTable({
  //         lengthMenu:[2,4,6],
  //         ordering:true,
  //         retrieve:true,
  //         paging:true 
  //       });
  //     },1000);
  //   });
  // }

  addOrUpdateUser() {
    if (this.modalMode === 'create') {
      this.create();
    } else if (this.modalMode === 'edit') {
      this.update();
    }
  }

get() {
  this.userService.getCadet().subscribe(data => {
    this.users = data;
     console.log(this.users)
     setTimeout(()=>{
      $('#example').DataTable({
        lengthMenu:[2,4,6],
        ordering:true,
        retrieve:true,
        paging:true 
      });
    },1000);
  });
}


create(){
  console.log(this.user);
  const user1 = this.userfrm.value;
  if(this.userfrm.valid){
  this.userService.createCadet(user1).subscribe((data:User)=>{
   console.log(data);
   this.toast.success('🤩Cadet Added Successfully...!','success');
   this.loadUsers();
  });
}else{
  this.toast.error('🤔something went wrong...!','error');
}
}

  
update(){
  console.log(this.users);
  const User = this.userfrm.value;
  if(this.userfrm.valid){
  this.userService.updateCadet(this.userfrm.value ).subscribe((data: User) => {
      console.log(data);
      this.toast.success('🤩Cadet Updeted Successfully...!','success');
     this.loadUsers();    
    });
  }else{
    this.toast.error('🤔somthing went wrong...!','error');
  }
  this.loadUsers();
}

delete(mobile: any): void {
    this.userService.deleteCadet(mobile).subscribe((data: any) => {
        console.log(data);
        this.loadUsers();
      }
    );
  }

  export(){
    this.userService.exportCadet().subscribe((data:Blob)=>{
      console.log(data);
      const blob =new Blob([data],{type:'application/octet-stream'});
      saveAs(data,'Nominal Roll.xls')
    });
  }

  updateExcel(){
    this.userService.updateexcel(this.userfrm.value.mobile,User).subscribe((data:Blob)=>{
      console.log(data);
      const blob = new Blob([data],{type:'application/octet-stream'});
      saveAs(data,'Nominal Roll.xls')
    })
  }

 
}
 