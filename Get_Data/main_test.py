import get_lichess
import lichess.api
import chess
import chess.pgn
import sys
import io
import tkinter as tk
import functions
from Gui_Board import GameBoard
import time
import chess.engine
import asyncio


def main():
    print("hello world")

    engine = chess.engine.SimpleEngine.popen_uci('C:/Users/kosta/Documents/chess/stockfish-10-win/stockfish-10-win/Windows/stockfish_10_x64.exe')

    root = tk.Tk()
    gui_board = GameBoard(root)
        
    gui_board.pack(side="top", fill="both", expand="true", padx=4, pady=4)

    user = lichess.api.user('kostaaa')

    example_games = get_lichess.get_lichess_games("kostaaa", 10)

    gui_board.set_up_pieces_images()

    i = 0
    for temp_game in example_games:
        if(i < 5):
            pgn_moves = temp_game['moves']
            pgn = io.StringIO(pgn_moves)
            game = chess.pgn.read_game(pgn)

            all_scores = []
            max_change = 0
            board = game.board()
            counter2 = 0

            for move in game.mainline_moves():
                #result = engine.play(board, chess.engine.Limit(time=1))
                board.push(move)
                info = engine.analyse(board, chess.engine.Limit(depth=21))
                the_score = (float)((str)((info["score"]).white()))
                print(the_score)
                
                all_scores.append(the_score)
                if(counter2 > 0 and (all_scores[counter2] - all_scores[counter2-1]) > max_change):
                    print("MAX SCORE CHANGE HERE")
                    max_change = all_scores[counter2] - all_scores[counter2-1]
                    all_images = functions.set_gui_board(board, gui_board, root)
                    time.sleep(4)

                #board.push(move)
                else:
                    all_images = functions.set_gui_board(board, gui_board, root)
                #gui_board.pack(side="top", fill="both", expand="true", padx=4, pady=4)
                #gui_board.refresh()

                time.sleep(0.5)
                counter2 = counter2+1
                
        i = i+1

    print("Done")
    engine.quit()
    root.mainloop()

if __name__=="__main__":
    main()

#asyncio.set_event_loop_policy(chess.engine.EventLoopPolicy())
#asyncio.run(main())