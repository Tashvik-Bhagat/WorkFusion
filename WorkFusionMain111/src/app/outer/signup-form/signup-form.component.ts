import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  signupForm: FormGroup;

  roles = [
    { displayName: 'Client', value: 4 },
    { displayName: 'Manager', value: 2 },
    { displayName: 'Employee', value: 3 },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService 
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        fullName: ['', Validators.required],
        roleId: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        passwordHash: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('passwordHash')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const user: UserModel = this.signupForm.value;
      this.userService.registerUser(user).subscribe(
        (response) => {
          this.toastr.success('User registered successfully!', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          this.signupForm.reset();
        },
        (error) => {
          this.toastr.error('Error registering user: ' + error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        }
      );
    }
  }
}
