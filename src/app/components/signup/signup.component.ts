import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    private router: Router) { 
  
    this.registerForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  ngOnInit() {
  }
  public onSubmitSignUp(e) {
    e.preventDefault();
    if(this.registerForm.valid){
      console.log('form Val ',this.registerForm.value)
      this.authService.register(this.registerForm.value).subscribe( res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/todo']);
      },
      err => this.error = err.error);
    }
  }
}
