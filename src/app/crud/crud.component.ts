import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent {
  localStorageKey = "adbaudvsud";
  LoginFormSubmitted = false;

  userForm: FormGroup;
  userData: any = [];


  constructor(private formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      id: [''],
    });
  }

  // validation 
  get loginFormValue(){
    return this.userForm.controls
  }

  ngOnInit() {
    if (localStorage.getItem(this.localStorageKey)) {
      this.userData = JSON.parse(localStorage.getItem(this.localStorageKey) || '');
    }
  }

  SubmitForm() {
    this.LoginFormSubmitted = true;
    if (this.userForm.valid) {
      if (this.userForm.value.id) {
        //  Update Data
        let index = this.userData.findIndex((x: any) => x.id === this.userForm.value.id);
        this.userData.splice(index, 1, this.userForm.value);
      } else {
        // Add Data
        this.userForm.patchValue({
          id: new Date().getTime(),
        });
        this.userData.push(this.userForm.value);
      }
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.userData));
      this.userForm.reset();
      this.LoginFormSubmitted = false;
    } else {
      console.log('form invalid');
    }
  }

  UpdateUserData(user_id: number) {
    let singleData = this.userData.find((x: any) => x.id === user_id);

    this.userForm.patchValue({
      fname: singleData.fname,
      lname: singleData.lname,
      email: singleData.email,
      dob: singleData.dob,
      address: singleData.address,
      phoneNo: singleData.phoneNo,
      id: singleData.id,
    });
  }

  DeleteUserData(user_id: string) {
    // debugger;
    let index = this.userData.findIndex((x: any) => x.id === user_id);
    if (index > -1) {
      this.userData.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.userData));
    }
  }
}
