import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/_services/quiz/quiz.service';
import { QuestionService } from 'src/app/_services/question/question.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  quizId: number;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  userAnswer: string = '';
  score: number = 0;
  timeLeft: number = 30; // Initial time in seconds
  timer: any;
  showScore: boolean = false; // Variable to show score
  badWordsList: string[] = ['testbadword', 'mot2', 'mot3'];
  currentUser: any;
  correctAnswers: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private questionService: QuestionService,
    private auth: StorageService
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('quizId');
    this.loadQuestions();
    this.currentUser = this.auth.getUser();
    console.log("userConnected", this.currentUser);
  }

  loadQuestions(): void {
    this.quizService.getQuestionsByQuizId(this.quizId).subscribe(
      (data) => {
        this.questions = data;
        this.loadCorrectAnswers(this.questions[this.currentQuestionIndex].id); // Load correct answers for the first question
        this.startTimer(); // Start the timer once questions are loaded
      },
      (error) => {
        console.error('Failed to fetch questions', error);
      }
    );
  }

  loadCorrectAnswers(questionId: number): void {
    this.questionService.getReponsesByQuestionId(questionId).subscribe(
      (responses) => {
        this.correctAnswers = responses;
      },
      (error) => {
        console.error('Failed to fetch responses', error);
      }
    );
  }

  submitAnswer(): void {
    if (this.userAnswer) {
      const lowerCaseAnswer = this.userAnswer.toLowerCase().trim();
      if (this.badWordsList.some(badWord => lowerCaseAnswer.includes(badWord))) {
        alert("Il ne faut pas entrer des badwords!");
        return;
      }
    }

    // Enregistrer la réponse de l'utilisateur
    this.questions[this.currentQuestionIndex].userAnswer = this.userAnswer;
    clearInterval(this.timer); // Arrêter le timer lors de la soumission de la réponse

    // Comparer la réponse de l'utilisateur avec les réponses correctes
    if (this.correctAnswers.includes(this.userAnswer.toLowerCase().trim())) {
      this.score++;
    }

    // Vérifier s'il reste des questions ou afficher le score final
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.userAnswer = ''; // Réinitialiser la réponse de l'utilisateur
      this.loadCorrectAnswers(this.questions[this.currentQuestionIndex].id); // Charger les réponses correctes pour la prochaine question
      this.resetTimer(); // Réinitialiser le timer pour la prochaine question
    } else {
      this.showScore = true; // Afficher le score
      this.questionService.sendEmailValidationToUser(this.currentUser?.id, this.score, this.quizId).subscribe((res: any) => {
        console.log("Response Ok", res);
      });
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

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }
}
