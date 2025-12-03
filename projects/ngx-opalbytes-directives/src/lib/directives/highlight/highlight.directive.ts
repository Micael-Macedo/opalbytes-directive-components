import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[libHighlight]'
})
export class HighlightDirective {

  @Input() libHighlight = 'yellow';
  @Input() defaultColor = '';
  private el = inject(ElementRef)

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.libHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultColor || '');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}