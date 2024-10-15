import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  
  signupForm!: FormGroup;
  errorMessage:string='';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
      agreeterm: [false, Validators.requiredTrue]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  // Custom validator to check if password and confirm password match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmpassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      const username = this.signupForm.value.username;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      const confirmpassword = this.signupForm.value.confirmpassword;
  
      // Ensure password and confirmPassword match before submitting
      if (password !== confirmpassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }
  
      // Call signup method from authService
      this.authService.signup(username, email, password,confirmpassword).subscribe({
        next: response => {
          console.log('Signup successful', response);
          localStorage.setItem('token',response.token)
          localStorage.setItem('access_token',response.access_token)
          // Handle success (e.g., navigate to a different page)
          this.router.navigateByUrl('/login')
        },
        error: err => {
          console.error('Signup failed', err);
          this.errorMessage = 'Signup failed. Please check your input.';
        }
      });
    }
  }
  

  get f() {
    return this.signupForm.controls;
  }

}