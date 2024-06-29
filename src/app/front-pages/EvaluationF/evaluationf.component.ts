import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Evaluation {
  id: number;
  trainingTitle: string;
  date: string; // J'ai modifié le type de date en string pour correspondre au type attendu par le formulaire HTML
  location: string;
  trainer: string;
  participant: string;
  score: number; // Ajout de la propriété score
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
    trainingTitle: '',
    date: '', // Initialisation avec une chaîne vide
    location: '',
    trainer: '',
    participant: '',
    score: 0, // Initialisation avec 0
    comments: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submitEvaluation(): void {
    this.http.post<Evaluation>('http://localhost:8080/api/evaluations', this.evaluation)
      .subscribe(response => {
        console.log(response); // Log the response from the backend
        // Reset the form if needed
        this.resetForm();
      }, error => {
        console.error(error); // Log any errors
        // Handle error if needed
      });
  }

  resetForm(): void {
    // Reset all evaluation properties
    this.evaluation = {
      id: 0,
      trainingTitle: '',
      date: '',
      location: '',
      trainer: '',
      participant: '',
      score: 0,
      comments: ''
    };
  }

}