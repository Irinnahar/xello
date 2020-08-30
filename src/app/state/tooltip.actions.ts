import { createAction,  props } from '@ngrx/store';

export const tooltipActive = createAction(
  'TooltipActive',
  props<{ tooltipId: string | number }>()
);