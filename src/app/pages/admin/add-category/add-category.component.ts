import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description:'',
  }

  constructor(private _category:CategoryService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
      if(this.category.title.trim()=='' || this.category.title==null){
        this.snack.open('Title is required', 'OK', {
          duration: 3000,
        });
        return;
      }

      //All checked and done
      this._category.addCategory(this.category).subscribe(
        (data:any)=>{
          this.category.description='';
          this.category.title="";
          Swal.fire('Success', 'Category Added Successfully', 'success');
          console.log("Category added", data);
        },(error)=>{
          console.log(error);
          this.snack.open('Something went wrong while adding category. contact administrator', 'OK', {
            duration: 5000,
          });
        }
      )
  }

}
