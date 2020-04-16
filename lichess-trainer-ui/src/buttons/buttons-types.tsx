export const UPDATE_BOARD = 'UPDATE_BOARD'

interface UpdateBoardAction {
  type: typeof UPDATE_BOARD,
  board: any
}

export type ButtonActionTypes = UpdateBoardAction
