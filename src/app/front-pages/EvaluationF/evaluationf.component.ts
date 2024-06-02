import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluationf',
  templateUrl: './evaluationf.component.html',
  styleUrls: ['./evaluationf.component.css']
})
export class EvaluationfComponent implements OnInit {

  evaluation = {
    trainingProject: '',
    category: '',
    trainingTitle: '',
    dates: '',
    location: '',
    trainer: '',
    participant: '',
    courseContent: 3,
    theoryPractice: 3,
    duration: 3,
    pace: 3,
    materialSupport: 3,
    logistics: 3,
    courseClarity: 3,
    subjectMastery: 3,
    availability: 3,
    teachingMethod: 3,
    workUtility: 3,
    personalDevelopment: 3,
    overallRating: 3,
    comments: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  submitEvaluation(): void {
    console.log(this.evaluation);
  }

}
