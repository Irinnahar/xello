import { createReducer, on } from '@ngrx/store';
import { tooltipActive } from './tooltip.actions';
 
export const initialState = { tooltipId: 0 };
 
const _tooltipReducer = createReducer(
  initialState,
  on(tooltipActive, (state, { tooltipId }) => ({ ...state, tooltipId: tooltipId }))
);
 
export function tooltipReducer(state, action) {
  return _tooltipReducer(state, action);
}