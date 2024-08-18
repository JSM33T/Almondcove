import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComingSoonComponent } from '../../shared/coming-soon/coming-soon.component';
import initAOS, { cleanAOS, disableAOS } from '../../../library/invokers/animate-on-scroll';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ComingSoonComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit, OnDestroy {
ngOnDestroy(): void {
  cleanAOS();
}
ngOnInit(): void {
  initAOS();
}
}
