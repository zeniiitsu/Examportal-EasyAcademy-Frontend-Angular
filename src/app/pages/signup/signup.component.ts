import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  // Create a FormGroup
  signupForm: FormGroup;

  //for password field toggle visibility
  hidePassword: boolean = true;

  constructor(private userService:UserService, private snack: MatSnackBar, private formBuilder: FormBuilder) { }


  public user={
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  }

  ngOnInit(): void {
    // Initialize the form group with validators
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
          Validators.minLength(10), // Example: Minimum length of 10 digits
          Validators.maxLength(10), // Example: Maximum length of 15 digits
        ],
      ],
    });
  }



  // }

togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  formSubmit() {
    // Check if the form is valid before submitting
    if (this.signupForm.valid) {
      // Get the form values from the loginForm
      const formValues = this.signupForm.value;
      console.log(formValues);
      this.userService.addUser(formValues).subscribe(
        (data: any) => {
          console.log(data);
          Swal.fire('Success', 'Registered Successfully. User ID is :' + data.id, 'success');
        },
        (error) => {
          console.log(error);
          this.snack.open('Something went wrong', 'OK', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snack.open('Please fill out all the required fields correctly', 'OK', {
        duration: 3000,
      });
    }
  }



  resetForm() {
    // Reset the form controls
    this.signupForm.reset();
  }

}
