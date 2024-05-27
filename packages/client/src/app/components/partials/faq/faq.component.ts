import { Component } from '@angular/core';
import { faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  public faqs = [
    { title: 'How do I place an order?', content: 'To place an order, simply browse our website, select the items you want to purchase, and proceed to checkout.', active: false },
    { title: 'Can I cancel or change my order?', content: "No, you can't cancel orders yet. However we could implement this feature in the future.", active: false },
    { title: 'What payment methods do you accept?', content: "For now, we only accept PayPal. Make sure to use the test login and password provided in the repository's README.", active: false },
    { title: 'How do I provide my address?', content: "We use Leaftlet for our order map. Simply click on 'Find my location' and let we do the rest.",  active: false }
  ];

  public faCarretDown = faCaretDown;
  public faCarretLeft = faCaretLeft;

  public toggleFaq(index: number): void {
    this.faqs[index].active = !this.faqs[index].active;

    this.faqs.forEach((faq, i) => {
      if (i !== index) {
        faq.active = false;
      }
    });
  }
}
