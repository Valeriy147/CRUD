import { trigger, transition, useAnimation } from '@angular/animations';
import { pulse, fadeIn, slideInLeft, slideInRight } from 'ng-animate';

export const fade = [
  trigger('fade', [transition(':enter', useAnimation(fadeIn))])
]
