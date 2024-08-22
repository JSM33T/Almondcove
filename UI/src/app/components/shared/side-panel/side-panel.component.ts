import { Component } from '@angular/core';
import { disableAOS } from '../../../library/invokers/animate-on-scroll';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {


  disableAnimations()
  {
    disableAOS();
  }
}
