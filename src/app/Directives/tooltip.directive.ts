import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { tooltipActive } from '../state/tooltip.actions';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnInit {
  @Input('data-tooltip') private content: string;
  @Input('active') private active: boolean;
  private tooltipElem: any;

  constructor(
    private _el: ElementRef,
    private renderer: Renderer2,
    private store: Store<{ tooltip: number }>
  ) {}

  ngOnInit() {
    this.tooltipElem = this.renderer.createElement('p');
    this.tooltipElem.classList.add('tooltip-style');
    this.tooltipElem.style.visibility = 'hidden';
    this.tooltipElem.innerHTML = this.content;

    if (this.active) {
      this.tooltipElem.style.visibility = 'visible';
    }

    this.renderer.appendChild(this._el.nativeElement, this.tooltipElem);
  }

  // show tooltip when click on the button
  @HostListener('click', ['$event']) onClick(event) {
    // Dispatch ngrx event
    let tooltipId = event.target.dataset.tooltipId;
    if (tooltipId) {
      this.store.dispatch(tooltipActive({ tooltipId: tooltipId }));
    }

    //set tooltip position
    const coordinate = event.target.getBoundingClientRect();

    let left =
      coordinate.left +
      (event.target.offsetWidth - this.tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; // don't cross the left window edge

    let top = coordinate.top - this.tooltipElem.offsetHeight - 5;
    if (top < 0) {
      // if crossing the top window edge, show below instead
      top = coordinate.top + event.target.offsetHeight + 5;
    }

    this.tooltipElem.style.left = left + 'px';
    this.tooltipElem.style.top = top + 'px';
  }

  // hide the tooltip when click outside the button
  @HostListener('document:click', ['$event.target']) close(targetElement) {
    let clickedInside: boolean = this._el.nativeElement.contains(targetElement);

    if (this.active && clickedInside) {
      this.tooltipElem.style.visibility = 'visible';
    } else {
      this.tooltipElem.style.visibility = 'hidden';
    }
  }

  // hide the tooltip when press on ESC key
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.keyCode === 27) {
      this.tooltipElem.style.visibility = 'hidden';
    }
  }
}
