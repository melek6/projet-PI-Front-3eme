import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question/question.service';



describe('QuestionserviceService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
