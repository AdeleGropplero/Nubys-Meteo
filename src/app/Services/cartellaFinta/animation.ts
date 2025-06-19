import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideDownSearch = trigger('slideDownSearch', [
  transition(':enter', [
    animate(
      '800ms ease-out',
      keyframes([
        style({
          transform: 'translateX(-50%) translateY(-100%) scale(1)',
          opacity: 0,
          offset: 0,
        }),
        style({
          transform: 'translateX(-50%) translateY(0) scale(1)',
          opacity: 1,
          offset: 0.7,
        }),
        style({
          transform: 'translateX(-50%) translateY(0) scale(1)',
          opacity: 1,
          offset: 0.8,
        }),
        style({
          transform: 'translateX(-50%) translateY(0) scale(1.02)',
          opacity: 1,
          offset: 1,
        }),
      ])
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in',
      style({
        transform: 'translateY(-100%) translateX(-50%)',
        opacity: 0,
      })
    ),
  ]),
]);

/* import { animate, style, transition, trigger } from '@angular/animations';

export const slideDownSearch = trigger('slideDownSearch', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)', opacity: 0 }),
    animate(
      '400ms ease-out',
      style({
        transform: 'translateX(-50%) translateY(0)',
        opacity: 1,
        scale: 1.02,
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in',
      style({ transform: 'translateY(-100%)', opacity: 0 })
    ),
  ]),
]);
 */
