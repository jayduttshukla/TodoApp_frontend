import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public registerForm: FormGroup;
  public error;
  
  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,private ngxService: NgxUiLoaderService) { 
  
    this.registerForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,10}$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    
  }
  ngOnInit() {
  }
  
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  public onSubmitSignUp(e) {
    e.preventDefault();
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe( res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/todo']);
        this.ngxService.stop();
      },
      err => { this.error = err.error.text; this.ngxService.stop(); console.log('abc : ', err.error)} );
    }
  }
}
