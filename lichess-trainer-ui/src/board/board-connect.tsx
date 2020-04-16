import { connect } from 'react-redux'
// import { updateBoard } from './buttons-action'
// import { Buttons } from './buttons-component';

export interface BoardState {
  board: string[]
}

const mapState = (state: BoardState) => ({
  board: state.board
})

const mapDispatch = (dispatch: any) => {
  return {
    // updateBoard: () => {
    //   console.log('connect')
    //   dispatch(updateBoard())
    // }
  }
}

export const connector = connect(mapState, mapDispatch)