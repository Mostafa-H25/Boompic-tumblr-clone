import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appClickedOutside]',
})
export class ClickedOutsideDirective {
  constructor(private element: ElementRef) {}

  @Output() public clickedOutside = new EventEmitter<void>();

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.element.nativeElement.contains(target))
      this.clickedOutside.emit();
  }
}
