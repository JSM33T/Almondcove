import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appBlogContainer]'
})
export class BlogContainerDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.addTargetBlankToAnchors();
    }, 1000);
    
  }

  private addTargetBlankToAnchors() {
    const anchors = this.el.nativeElement.querySelectorAll('a');
    anchors.forEach((anchor: HTMLAnchorElement) => {
      this.renderer.setAttribute(anchor, 'target', '_blank');
    });
  }
}
