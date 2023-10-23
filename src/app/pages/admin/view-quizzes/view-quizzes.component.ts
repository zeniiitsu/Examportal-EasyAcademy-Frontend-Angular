import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    // {
    //   qid:23,
    //   title:'Basic Java Quiz',
    //   description:'Java is a popular programming language. Java is used to develop mobile apps, web apps, desktop apps, games and much more',
    //   maxMarks:'50',
    //   numberOfQuestions:'20',
    //   active:'',
    //   category:{
    //     title:'Programming',
    //   }
    // },
    // {
    //   qid:23,
    //   title:'Basic Java Quiz',
    //   description:'Java is a popular programming language. Java is used to develop mobile apps, web apps, desktop apps, games and much more',
    //   maxMarks:'50',
    //   numberOfQuestions:'20',
    //   active:'',
    //   category:{
    //     title:'Programming',
    //   }
    // },
  ]

  constructor(private _quiz:QuizService, private snack:MatSnackBar) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
    },
    (error)=>{
      console.log(error);
      this.snack.open('Could not fetch quizzes', 'OK', {
        duration: 3000,
      })
    })
  }


  deleteQuiz(qid){


    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete this quiz?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      //Delete
  if(result.isConfirmed){
    this._quiz.deleteQuiz(qid).subscribe(
      (data)=>{
        this.quizzes = this.quizzes.filter((quiz)=> quiz.qid != qid);
        Swal.fire('Success', 'Quiz deleted', 'success');
      },
      (error) => {
        Swal.fire('Error','Error in deleting quiz','error');
      }
    );
  }
      
  });

    // this._quiz.deleteQuiz(qid).subscribe((data:any)=>{
    //   console.log(data);
    //   this.quizzes=this.quizzes.filter((quiz)=>quiz.qid != qid);
    //   Swal.fire("Success","Quiz deleted","success");
    // },(error)=>{
    //   console.log(error);
    //   this.snack.open('Error While deleting quiz', 'OK', {
    //     duration: 3000,
    //   })

    // });
    

  }

}
