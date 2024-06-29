import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogPostService } from 'src/app/_services/blog/blog-post.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() blogPost: any;
  @Output() commentAdded = new EventEmitter<any>();
  content: string = '';
  user:any
  constructor(private blogPostService: BlogPostService, private StorageService :StorageService) {}

  ngOnInit(): void {
    this.user=this.StorageService.getUser()
  }

  onSubmit(): void {
    const newComment: any = {
      id: 0,
      content: this.content,
      date: new Date(),
      blogPost: this.blogPost,
      user: { id:this.user.id , username: this.user.username } // Utilisateur actuel, doit être remplacé par le véritable utilisateur
    };
   this.blogPostService.addCommentToBlogPost(this.blogPost.id, newComment).subscribe(comment => {
      this.commentAdded.emit(comment);
      this.content = '';
    });
  }

}
