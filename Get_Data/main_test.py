import get_lichess
import lichess.api
import chess
import chess.pgn
import sys
import io


def main():
    print("hello world")

    user = lichess.api.user('kostaaa')

    example_games = get_lichess.get_lichess_games("kostaaa", 10)

    for temp_game in example_games:
        pgn_moves = temp_game['moves']
        pgn = io.StringIO(pgn_moves)
        game = chess.pgn.read_game(pgn)
        print(dir(game))
        #print(game.board())

if __name__=="__main__":
    main()

