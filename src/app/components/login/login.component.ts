import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  public error;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,private ngxService: NgxUiLoaderService) { 
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
     });
    }

  ngOnInit() {
  }

 public onSubmitLogin(e){
    e.preventDefault();
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe( res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/todo']);
        this.ngxService.stop();
      },
      err => {this.error = err.error; console.log('error :', err) }); 
    }
  }

  

}
