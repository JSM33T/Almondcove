import { Directive, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAddBlogProp]',
  standalone: true, 
})
export class AddBlogPropDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
setTimeout(() => {
  this.setProps();

}, 4000);
   

  }

  setProps(){
    
  }

}
