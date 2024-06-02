import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogPostService } from 'src/app/_services/blog/blog-post.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() blogPost: any;
  @Output() commentAdded = new EventEmitter<any>();
  content: string = '';

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const newComment: any = {
      id: 0,
      content: this.content,
      date: new Date(),
      blogPost: this.blogPost,
      user: { id: 1, username: 'currentUser' } // Utilisateur actuel, doit être remplacé par le véritable utilisateur
    };
    this.blogPostService.addCommentToBlogPost(this.blogPost.id, newComment).subscribe(comment => {
      this.commentAdded.emit(comment);
      this.content = '';
    });
  }

}
