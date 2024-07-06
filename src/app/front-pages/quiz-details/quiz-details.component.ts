import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/_services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quizId: number;
  questions: any[];
  currentQuestionIndex: number = 0;
  userAnswer: string = '';
  score: number = 0;
  timeLeft: number = 30; // Initial time in seconds
  timer: any;
  showScore: boolean = false; // Variable to show score
  correctAnswer: string = 'test'; // Fixed correct answer for testing
  badWordsList: string[] = ['testbadword', 'mot2', 'mot3'];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('quizId');
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.getQuestionsByQuizId(this.quizId).subscribe(
      (data) => {
        this.questions = data;
        this.startTimer(); // Start the timer once questions are loaded
      },
      (error) => {
        console.error('Failed to fetch questions', error);
      }
    );
  }

  submitAnswer(): void {
    // Vérifier si la réponse contient un mot interdit
    if (this.userAnswer) {
      const lowerCaseAnswer = this.userAnswer.toLowerCase().trim();
      if (this.badWordsList.some(badWord => lowerCaseAnswer.includes(badWord))) {
        alert("Il ne faut pas entrer des badword!");
        return;
      }
    }
  
    // Enregistrer la réponse de l'utilisateur
    this.questions[this.currentQuestionIndex].userAnswer = this.userAnswer;
    clearInterval(this.timer); // Arrêter le timer lors de la soumission de la réponse
  
    // Vérifier s'il reste des questions ou afficher le score final
    if (this.currentQuestionIndex < this.questions.length - 1) {
      // Passer à la prochaine question
      this.currentQuestionIndex++;
      this.userAnswer = ''; // Réinitialiser la réponse de l'utilisateur
      this.resetTimer(); // Réinitialiser le timer pour la prochaine question
    } else {
      // Calculer le score final
      this.calculateScore();
      this.showScore = true; // Afficher le score
    }
  }
  

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        this.timeLeft = 30; // Reset the timer for the next question
        this.submitAnswer(); // Automatically move to the next question when time runs out
      }
    }, 1000); // Update the timer every second
  }

  resetTimer(): void {
    clearInterval(this.timer);
    this.timeLeft = 30; // Reset the timer
    this.startTimer(); // Restart the timer for the current question
  }

  calculateScore(): void {
    this.score = 0;
    this.questions.forEach(question => {
      const userAnswer = question.userAnswer?.toLowerCase().trim() || '';

      if (this.correctAnswer === userAnswer) {
        this.score++;
      }
    });
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }
}
