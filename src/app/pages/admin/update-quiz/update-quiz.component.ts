import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _quiz : QuizService, private _cat:CategoryService, private snack:MatSnackBar,private _router:Router) { }

  qId = 0;
  quiz;
  categories;

  ngOnInit(): void {

    this.qId = this._route.snapshot.params.qid;
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz = data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );

    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;
    },(error)=>{
      this.snack.open('Could not fetch categories','ok',{duration:3000});
    })

  }


  //Update form submit
  public updateData(){
    //Validate data

    this._quiz.updateQuiz(this.quiz).subscribe((data)=>{
      Swal.fire("Quiz Updated !!",'quiz updated', 'success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });
    },(error)=>{
      Swal.fire('Error', 'error in updating quiz', 'error');
      console.log(error);
    })
  }

}
