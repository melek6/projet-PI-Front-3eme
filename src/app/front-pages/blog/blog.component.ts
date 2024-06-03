import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from 'src/app/_services/blog/blog-post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogPostComponent implements OnInit {
  blogPosts: any[];
  showCommentForm: { [key: number]: boolean } = {};
  showReactForm: { [key: number]: boolean } = {};

  constructor(private blogPostService: BlogPostService, private router: Router) {}

  ngOnInit(): void {
    this.blogPostService.getAllBlogPosts().subscribe((data: any[]) => {
      this.blogPosts = data.map(post => ({
        ...post,
        commentaires: post.commentaires || [], // Initialiser commentaires s'il est undefined
        likes: 0,
        dislikes: 0
      }));

      this.blogPosts.forEach(post => {
        this.blogPostService.getLikesCount(post.id).subscribe(likes => post.likes = likes);
        this.blogPostService.getDislikesCount(post.id).subscribe(dislikes => post.dislikes = dislikes);
      });
    });
  }

  likePost(post: any): void {
    post.likes++;
    this.blogPostService.updateBlogPost(post.id, post).subscribe(() => {
      console.log('Post updated:', post);
    }, error => {
      console.error('Error updating post:', error);
    });
  }

  dislikePost(post: any): void {
    post.dislikes++;
    this.blogPostService.updateBlogPost(post.id, post).subscribe(() => {
      console.log('Post updated:', post);
    }, error => {
      console.error('Error updating post:', error);
    });
  }
  toggleCommentForm(post: any): void {
    this.showCommentForm[post.id] = !this.showCommentForm[post.id];
  }

  toggleReactForm(post: any): void {
    this.showReactForm[post.id] = !this.showReactForm[post.id];
  }

  onCommentAdded(comment: any): void {
    const post = this.blogPosts.find(p => p.id === comment.blogPost.id);
    if (post) {
      post.commentaires = post.commentaires || [];
      post.commentaires.push(comment);
    }
  }

  onReactAdded(react: any): void {
    const post = this.blogPosts.find(p => p.id === react.blogPost.id);
    if (post) {
      post.reacts = post.reacts || [];
      post.reacts.push(react);
    }
  }
  editPost(id: number): void {
    this.router.navigate(['/edit-blog-post', id]);
  }
  deletePost(id: number): void {
    this.blogPostService.deleteBlogPost(id).subscribe(() => {
      this.blogPosts = this.blogPosts.filter(post => post.id !== id);
    });
  }
}
