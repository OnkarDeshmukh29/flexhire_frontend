import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onloginSubmit() {
    if (this.loginForm.valid) {

      console.log('Login Succesfull', this.loginForm.value);
    
      if (this.loginForm.valid) {

        // Directly use the form values without creating a credentials object
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;
      
        // Call login method of authService with the form values directly
        this.authService.login(username, password).subscribe({
          next: response => {
            console.log('Login successful', response);
            console.log('Full response:', response); 
            if (response.token) {
              localStorage.setItem('access_token', response.token);
            } else {
              console.error('Token is missing in the response');
            }
          
            //this.authService.storeToken(response.token);
            // Navigate to a different page or take other actions here
            this.router.navigateByUrl('/dashboard');
          },
          error: err => {
            console.error('Login failed', err);
            this.errorMessage = 'Invalid credentials. Please try again.';
            this.router.navigate(['/login'])
          }
        });
      }
    }      
  }

  // Helper method to access form controls in the template
  get f() {
    return this.loginForm.controls;
  }
}