import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/_services/quiz/quiz.service';
import { StorageService } from 'src/app/_services/storage.service'; 

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizzes: any[] = [];
  currentUser: any;
  qaList = [
    { question: "Comment puis-je commencer le quiz?", answer: "Cliquez sur le bouton 'Démarrer le quiz' pour commencer." },
    { question: "Combien de temps dure chaque question?", answer: "Chaque question a une durée de 30 secondes." },
    { question: "Puis-je sauter une question?", answer: "Non, chaque question doit être répondue avant de passer à la suivante." },
  ];
  chatMessages: { message: string, from: string }[] = [];
  isChatbotVisible = false;

  constructor(private router: Router, private quizService: QuizService , private auth : StorageService) {}

  ngOnInit(): void {
    this.loadQuizzes();
   this.currentUser = this.auth.getUser();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Failed to fetch quizzes', error);
      }
    );
  }

  participate(quiz: any): void {
    this.router.navigate(['/quiz-details', quiz.id]);
  }
  /*participate(quiz: any): void {
    this.quizService.checkUserAttempt(quiz.id, this.currentUser.id).subscribe(
      (response) => {
        if (response.canParticipate) {
          this.router.navigate(['/quiz-details', quiz.id]);
        } else {
          alert('Vous avez déjà tenté ce quiz.');
        }
      },
      (error) => {
        console.error('Failed to check user attempt', error);
        alert(`Erreur: ${error.message || 'Unknown error'}`);
      }
    );
  }
*/

  sendMessage(userInput: string): void {
    let botResponse = "Désolé, je ne connais pas la réponse à cette question.";

    for (let qa of this.qaList) {
      if (userInput.toLowerCase().includes(qa.question.toLowerCase())) {
        botResponse = qa.answer;
        break;
      }
    }

    this.chatMessages.push({ message: userInput, from: 'user' });
    this.chatMessages.push({ message: botResponse, from: 'bot' });
  }

  toggleChatbot(): void {
    this.isChatbotVisible = !this.isChatbotVisible;
  }
}
