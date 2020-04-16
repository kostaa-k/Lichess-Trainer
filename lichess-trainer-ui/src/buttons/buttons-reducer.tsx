import { UPDATE_BOARD, ButtonActionTypes } from './buttons-types';
import { ButtonState } from './buttons-connect';
import { getDefaultLineup } from '../components/ChessBoard';
  
  const initialState: ButtonState = {
    board: getDefaultLineup(),
  }
  
  export function buttonReducer(
    state = initialState,
    action: ButtonActionTypes
  ): ButtonState {
    console.log('reducer');
    switch (action.type) {
        case UPDATE_BOARD:
            return {
                board: [...state.board, action.board]
            }
        default:
            return state
    }
  }