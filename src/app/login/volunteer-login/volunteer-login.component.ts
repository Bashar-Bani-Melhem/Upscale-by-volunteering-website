import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-volunteer-login',
  templateUrl: './volunteer-login.component.html',
  styleUrls: ['./volunteer-login.component.css']
})
export class VolunteerLoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private authService:AuthService,private router:Router,
    private hot:HotToastService) { }
    loginForm = this.fb.group({
      email:this.fb.control('',[Validators.required,Validators.email]),
      password:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    })
    formStatus?:string;
  ngOnInit(): void {
  }
  get email(){
    return this.loginForm.controls.email
  }
  get password(){
    return this.loginForm.controls.password
  }
  submit(){
    this.authService.signIn(this.loginForm.controls.email.value+'',
    this.loginForm.controls.password.value+'').pipe(
      this.hot.observe({
        loading: 'Loging In...',
        success:'Welcome To Application',
        error:(error)=>'This Error Happend'+error
      })).subscribe({
      next: (data)=>{
        this.router.navigate(['volunteer/volunteerProfile'])
      },
      error:(error:FirebaseError)=>{
        this.formStatus= error.message; 
           }
    })
  }

}
