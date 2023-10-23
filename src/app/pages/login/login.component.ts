import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData={
    username: '',
    password: '',
  }



  loginForm: FormGroup;

  //for password field toggle visibility
  hidePassword: boolean = true;

  constructor(private formBuilder: FormBuilder,private snack: MatSnackBar, private login:LoginService, private router: Router) { 
    
  }

  ngOnInit(): void {

    // Initialize the form group with validators
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  resetForm() {
    // Reset the form controls
    this.loginForm.reset();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  generateTokenAndLogin(){
    console.log("login button clicked");

      // Get the form values from the loginForm
      const formValues = this.loginForm.value;

    if(this.loginForm.valid){
      console.log("All fields valid");
      this.login.generateToken(formValues).subscribe(
        (data: any)=>{
          console.log("success");
          console.log(data);

          //login
          this.login.loginUser(data.token);

          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user);
              console.log(user);

              Swal.fire('Success', 'Login Successful', 'success');
              //Redirect to admin or normal user depending on the user role
              if(this.login.getUserRole()=="ADMIN"){
                //got to admini dashboard
                this.router.navigate(['/admin']);
                this.login.loginStatusSubject.next(true);
                
              }else if(this.login.getUserRole()=="NORMAL"){
                //go to normal user dashboard
                this.router.navigate(['/user-dashboard']);
                this.login.loginStatusSubject.next(true);
              }else{
                this.login.logout();
                //location.reload();
              }

            }
          );

        },
        (error)=>{
          console.log("Error occured");
          console.log(error); 
          
          this.snack.open('Invalid Credentials', 'OK', {
            duration: 3000,
          }); 
          
        }
      )

    }

  }

}
