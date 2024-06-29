import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private apiUrl = 'http://localhost:8081/api/blogposts';

  constructor(private http: HttpClient) {}

  getAllBlogPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBlogPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
z
  createBlogPost(blogPost: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, blogPost, httpOptions);
  }

  updateBlogPost(id: number, blogPost: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, blogPost, httpOptions);
  }

  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addCommentToBlogPost(blogPostId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${blogPostId}/comments`, comment, httpOptions);
  }

  addReactToBlogPost(blogPostId: number, react: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${blogPostId}/reacts`, react,httpOptions);
  }

  getLikesCount(blogPostId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogPostId}/likes`);
  }

  getDislikesCount(blogPostId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogPostId}/dislikes`);
  }

  getUserReact(blogPostId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${blogPostId}/reacts/user`);
  }
  getCommentsForBlogPost(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}/comments`);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteComments/${commentId}`, httpOptions);
  }

  updateComment(commentId: number, content: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/comments/${commentId}`, { content }, httpOptions);
  }

  addReplyToComment(parentId: number, content: string): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}/comments/${parentId}/reply`, { content }, httpOptions);
  }
  rephrase(content: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/rephrase`, { content }, httpOptions);
  }
}
