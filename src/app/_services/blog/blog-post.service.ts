import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private apiUrl = 'http://localhost:8081/api/blogposts';

  constructor(private http: HttpClient) {}

  // Récupérer tous les articles de blog
  getAllBlogPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un article de blog par ID
  getBlogPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel article de blog
  createBlogPost(blogPost: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, blogPost, httpOptions);
  }

  // Mettre à jour un article de blog
  updateBlogPost(id: number, blogPost: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, blogPost, httpOptions);
  }

  // Supprimer un article de blog
  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un commentaire à un article de blog
  addCommentToBlogPost(blogPostId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${blogPostId}/comments`, comment, httpOptions);
  }

  // Ajouter une réaction à un article de blog
addReactToBlogPost(blogPostId: number, react: any): Observable<any> {
  const url = `${this.apiUrl}/${blogPostId}/reacts`;

  return this.http.post<any>(url, react, httpOptions).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400) {
        console.error('Bad Request:', error.error);
      }
      return throwError('Something went wrong; please try again later.');
    })
  );
}


  // Supprimer une réaction d'un article de blog
  removeReactFromBlogPost(blogPostId: number): Observable<void> {
    const url = `${this.apiUrl}/${blogPostId}/reacts`;

    return this.http.delete<void>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer le nombre de likes d'un article de blog
  getLikesCount(blogPostId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogPostId}/likes`);
  }

  // Récupérer le nombre de dislikes d'un article de blog
  getDislikesCount(blogPostId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogPostId}/dislikes`);
  }

  // Récupérer la réaction de l'utilisateur à un article de blog
  getUserReact(blogPostId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${blogPostId}/reacts/user`);
  }

  // Récupérer les commentaires pour un article de blog
  getCommentsForBlogPost(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}/comments`);
  }

  // Supprimer un commentaire
  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${commentId}`);
  }

  // Mettre à jour un commentaire
  updateComment(commentId: number, content: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/comments/${commentId}`, { content }, httpOptions);
  }

  // Ajouter une réponse à un commentaire
  addReplyToComment(parentId: number, content: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comments/${parentId}/reply`, { content }, httpOptions);
  }

  // Rephrase le contenu via l'API
  rephrase(content: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/rephrase`, { content }, httpOptions);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    return throwError('Something went wrong; please try again later.');
  }


  getCommentsCount(blogPostId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogPostId}/comments/counts`);
  }

  getLikesCounts(blogPostId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogPostId}/likes/counts`);
  }

  getDislikesCounts(blogPostId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${blogPostId}/dislikes/counts`);
  }
}
