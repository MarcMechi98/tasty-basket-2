import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs = [
    { question: 'Question 1', answer: 'Answer to question 1' },
    { question: 'Question 2', answer: 'Answer to question 2' },
    { question: 'Question 3', answer: 'Answer to question 3' },
    { question: 'Question 4', answer: 'Answer to question 4' },
    { question: 'Question 5', answer: 'Answer to question 5' }
  ];

  activeIndex: any = null;

  toggleAnswer(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
