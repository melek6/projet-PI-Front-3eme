import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Evaluation {
  id: number;
  score: number; 
  comments: string;
}

@Component({
  selector: 'app-evaluationf',
  templateUrl: './evaluationf.component.html',
  styleUrls: ['./evaluationf.component.css']
})
export class EvaluationfComponent implements OnInit {

  evaluation: Evaluation = {
    id: 0,
    score: 0, 
    comments: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submitEvaluation(): void {
    this.http.post<Evaluation>('http://localhost:8080/api/evalformation', this.evaluation)
      .subscribe(response => {
        console.log(response); 
        this.resetForm();
      }, error => {
        console.error(error); 
      });
  }

  resetForm(): void {
    this.evaluation = {
      id: 0,
      score: 0,
      comments: ''
    };
  }

}
