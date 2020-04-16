import { ButtonActionTypes, UPDATE_BOARD } from './buttons-types'
import { getCurrentLineup } from '../components/ChessBoard'

export function updateBoard(): ButtonActionTypes {
  console.log('action');
  return {
    type: UPDATE_BOARD,
    board: getCurrentLineup(),
  }
}