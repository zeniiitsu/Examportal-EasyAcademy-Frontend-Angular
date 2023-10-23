import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories=[
    // {
    //   cid:23,
    //   title:"Programming",
    //   description:"This is testing category",
    // },
    // {
    //   cid:23,
    //   title:"gk",
    //   description:"This is testing category",
    // },
    // {
    //   cid:23,
    //   title:"practice",
    //   description:"This is testing category",
    // },
  ]

  constructor(private _category:CategoryService, private snack: MatSnackBar) { }

  ngOnInit(): void {

    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log("Something went wrong while fetching categories");
      this.snack.open('Could not fetch categories', 'OK', {
        duration: 3000,
      }); 

    });

  }

}
