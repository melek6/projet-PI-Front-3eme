import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/_services/blog/blog-post.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogPostComponent implements OnInit {
  blogPosts: any[] = [];
  showCommentForm: { [key: number]: boolean } = {};
  showReactForm: { [key: number]: boolean } = {};
  editFormVisible: { [key: number]: boolean } = {};
  editCommentFormVisible: { [key: number]: boolean } = {};
  showReplyForm: { [key: number]: boolean } = {};
  replyContent: { [key: number]: string } = {};
  createFormVisible: boolean = false;
  newPost: any = { title: '', content: '' };

  constructor(private blogPostService: BlogPostService , private storageService:StorageService) {}

  ngOnInit(): void {
    this.blogPostService.getAllBlogPosts().subscribe((data: any[]) => {
      this.blogPosts = data.map(post => ({
        ...post,
        commentaires: post.commentaires || [],
        likes: 0,
        dislikes: 0,
        userReact: null
      }));

      this.blogPosts.forEach(post => {
        //this.blogPostService.getLikesCount(post.id).subscribe(likes => post.likes = likes);
       // this.blogPostService.getDislikesCount(post.id).subscribe(dislikes => post.dislikes = dislikes);
        //this.blogPostService.getUserReact(post.id).subscribe(react => post.userReact = react);
        this.blogPostService.getCommentsForBlogPost(post.id).subscribe(comments => post.commentaires = comments);
      });
    });
  }

  likePost(post: any): void {
    if (post.userReact && post.userReact.type === 'like') {
      post.userReact = null;
      post.likes--;
    } else {
      if (post.userReact && post.userReact.type === 'dislike') {
        post.dislikes--;
      }
      post.userReact = { type: 'like' };
      post.likes++;
    }
    this.blogPostService.addReactToBlogPost(post.id, post.userReact).subscribe(() => {
      console.log('Post liked/disliked:', post);
    }, error => {
      console.error('Error updating post reaction:', error);
    });
  }

  dislikePost(post: any): void {
    if (post.userReact && post.userReact.type === 'dislike') {
      post.userReact = null;
      post.dislikes--;
    } else {
      if (post.userReact && post.userReact.type === 'like') {
        post.likes--;
      }
      post.userReact = { type: 'dislike' };
      post.dislikes++;
    }
    this.blogPostService.addReactToBlogPost(post.id, post.userReact).subscribe(() => {
      console.log('Post liked/disliked:', post);
    }, error => {
      console.error('Error updating post reaction:', error);
    });
  }

  toggleCommentForm(post: any): void {
    this.showCommentForm[post.id] = !this.showCommentForm[post.id];
  }

  onCommentAdded(comment: any): void {
    const post = this.blogPosts.find(p => p.id === comment?.blogPost?.id);
    if (post) {
      post.commentaires = post.commentaires || [];
      post.commentaires.push(comment);
    }
  }

  toggleEditForm(postId: number): void {
    this.editFormVisible[postId] = !this.editFormVisible[postId];
  }

  updatePost(post: any): void {
    this.blogPostService.updateBlogPost(post.id, post).subscribe(() => {
      console.log('Post updated:', post);
      this.editFormVisible[post.id] = false;
    }, error => {
      console.error('Error updating post:', error);
    });
  }

  toggleCreateForm(): void {
    this.createFormVisible = !this.createFormVisible;
  }

  createPost(): void {
    this.blogPostService.createBlogPost(this.newPost).subscribe((createdPost: any) => {
      this.blogPosts.push(createdPost);
      this.newPost = { title: '', content: '' };
      this.createFormVisible = false;
    }, error => {
      console.error('Error creating post:', error);
    });
  }

  deletePost(id: number): void {
    this.blogPostService.deleteBlogPost(id).subscribe(() => {
      this.blogPosts = this.blogPosts.filter(post => post.id !== id);
    });
  }

  deleteComment(commentId: number): void {
    this.blogPostService.deleteComment(commentId).subscribe(() => {
      this.blogPosts.forEach(post => {
        post.commentaires = post.commentaires.filter((comment: any) => comment.id !== commentId);
        post.commentaires.forEach((comment: any) => {
          comment.replies = comment.replies.filter((reply: any) => reply.id !== commentId);
        });
      });
    });
  }

  toggleEditCommentForm(commentId: number): void {
    this.editCommentFormVisible[commentId] = !this.editCommentFormVisible[commentId];
  }

  updateComment(commentId: number, content: string): void {
    this.blogPostService.updateComment(commentId, content).subscribe(updatedComment => {
      this.blogPosts.forEach(post => {
        post.commentaires = post.commentaires.map((comment: any) => comment.id === commentId ? updatedComment : comment);
        post.commentaires.forEach((comment: any) => {
          comment.replies = comment.replies?.map((reply: any) => reply.id === commentId ? updatedComment : reply);
        });
      });
      this.editCommentFormVisible[commentId] = false;
    });
  }

  toggleReplyForm(commentId: number): void {
    this.showReplyForm[commentId] = !this.showReplyForm[commentId];
  }

  addReply(parentId: number, content: string): void {
    this.blogPostService.addReplyToComment(parentId, content).subscribe(reply => {
      this.blogPosts.forEach(post => {
        post.commentaires.forEach((comment: any) => {
          if (comment.id === parentId) {
            comment.replies = comment.replies || [];
            comment.replies.push(reply);
          }
        });
      });
      this.replyContent[parentId] = '';
      this.showReplyForm[parentId] = false;
    });
  }
  rephraseContent(): void {
    this.blogPostService.rephrase(this.newPost.content).subscribe((rephrasedContent: any) => {
      this.newPost.content = rephrasedContent[0].generated_text;
    }, error => {
      console.error('Error rephrasing content:', error);
    });
  }
  userIsOwner(userId: number): boolean {
    return this.storageService.getUser().id === userId;
  }

}
