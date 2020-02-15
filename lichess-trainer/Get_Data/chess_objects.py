import chess


class chess_mistake:
    
    board = None
    score_change = None
    last_board = None

    def __init__(self, board, last_board, score_change):
        self.board = board
        self.score_change = score_change
        self.last_board = last_board