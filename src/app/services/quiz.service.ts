import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }


  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //add Quiz
  public addQuiz(quiz){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(qid){
    return this._http.delete(`${baseUrl}/quiz/${qid}`);
  }

  //get Quiz
  public getQuiz(qId)
  {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //Update quiz
  public updateQuiz(quiz){
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }
}
