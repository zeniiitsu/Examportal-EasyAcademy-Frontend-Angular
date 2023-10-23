import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
    // {
    //   cid:23,
    //   title:'Programming'
    // },
    // {
    //   cid:24,
    //   title:'Programming'
    // },
  ];



  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  };

  constructor(private _cat:CategoryService, private snack:MatSnackBar, private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
      //Categories load
      this.categories=data;
      console.log(this.categories)
    },
    (error)=>{
      console.log(error);
      this.snack.open('Could not fetch categories','ok',{duration:3000});
    })
  }


    // Add a reset method
    resetForm() {
      this.quizData = {
        title: '',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: true,
        category:{
          cid:'',
        },
      };
    }


    //Add quiz
    addQuiz(){
      console.log(this.quizData);
      //Validation
      if(this.quizData.title.trim()=='' || this.quizData.title==null){
        this.snack.open('Title required!','ok',{duration:3000});
        return;
      }

      //Call Server
      this._quiz.addQuiz(this.quizData).subscribe((data:any)=>{
        Swal.fire('Success','Quiz is added', 'success');
        this.resetForm();
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Something went wrong while adding quiz", 'error')
      })

      
    }
  

}
