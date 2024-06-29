import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from 'src/app/_services/blog/blog-post.service';

@Component({
  selector: 'app-blog-post-form',
  templateUrl: './blog-post-form.component.html',
  styleUrls: ['./blog-post-form.component.css']
})
export class BlogPostFormComponent implements OnInit {

  blogPost: any = { id: 0, title: '', content: '', publishDate: new Date(), user: { id: 1, username: 'currentUser', email: '', firstName: '', lastName: '' }, commentaires: [], reacts: [] };
  isEdit = false;

  constructor(
    private blogPostService: BlogPostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.isEdit)
    const id = this.route.snapshot.paramMap.get('id');
   /* if (id) {
      this.isEdit = true;
      this.blogPostService.getBlogPostById(+id).subscribe((data: any) => {
        this.blogPost = data;
      });
    }*/
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.blogPostService.updateBlogPost(this.blogPost.id, this.blogPost).subscribe(() => {
        this.router.navigate(['/blog']);
      });
    } else {
      this.blogPostService.createBlogPost(this.blogPost).subscribe(() => {
        this.router.navigate(['/blog']);
      });
    }
  }
}
