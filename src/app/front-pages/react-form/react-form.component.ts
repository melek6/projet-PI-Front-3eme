import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogPostService } from 'src/app/_services/blog/blog-post.service';

@Component({
  selector: 'app-react-form',
  templateUrl: './react-form.component.html',
  styleUrls: ['./react-form.component.css']
})
export class ReactFormComponent implements OnInit {

  @Input() blogPost: any;
  @Output() reactAdded = new EventEmitter<any>();
  type: string = 'like';

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const newReact: any = {
      id: 0,
      type: this.type,
      blogPost: this.blogPost
    };
    this.blogPostService.addReactToBlogPost(this.blogPost.id, newReact).subscribe(react => {
      this.reactAdded.emit(react);
    });
  }
}
