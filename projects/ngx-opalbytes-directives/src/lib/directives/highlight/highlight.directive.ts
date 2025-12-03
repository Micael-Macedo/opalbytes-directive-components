import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[libHighlight]',
  standalone: true
})
export class HighlightDirective {

  libHighlight = input('yellow');

  private el = inject(ElementRef)

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.libHighlight());
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}