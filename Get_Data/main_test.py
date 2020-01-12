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
from chess_objects import chess_mistake
from copy import deepcopy

def main():
    print("hello world")

    colors_str = ["WHITE", "BLACK"]
    the_colors = [chess.WHITE, chess.BLACK]

    username="kostaaa"
    engine = chess.engine.SimpleEngine.popen_uci('C:/Users/kosta/Documents/chess/stockfish-10-win/stockfish-10-win/Windows/stockfish_10_x64.exe')

    my_color = ""
    my_turn= None

    root = tk.Tk()
    gui_board = GameBoard(root)
    gui_board.pack(side="top", fill="both", expand="true", padx=4, pady=4)
    gui_board.set_up_pieces_images()

    user = lichess.api.user(username)
    max_num_games = 1
    example_games = get_lichess.get_lichess_games(username, max_num_games)

    max_moves_threshold = 10

    all_mistakes = []

    i = 0
    for temp_game in example_games:
        #print(temp_game)
        white_player = (str)(temp_game['players']['white']['user']['name'])
        black_player = (str)(temp_game['players']['black']['user']['name'])
        

        if(white_player == username):
            my_color = "WHITE"
        else:
            my_color = "BLACK"


        total_mistakes = []

        print(i)
        pgn_moves = temp_game['moves']
        pgn = io.StringIO(pgn_moves)
        game = chess.pgn.read_game(pgn)

        all_scores = []
        max_change = 0
        board = game.board()
        counter2 = 0

        num_moves = 0

        last_board = None
        temp_mistake =None

        for move in game.mainline_moves():
            last_board = deepcopy(board)
            if(num_moves > max_moves_threshold):
                break
            #result = engine.play(board, chess.engine.Limit(time=1))
            if(colors_str[the_colors.index(board.turn)] == my_color):
                my_turn=True
            else:
                my_turn=False

            board.push(move)

            info = engine.analyse(board, chess.engine.Limit(depth=20))
            if(my_color == "white"):
                str_the_score = ((str)((info["score"]).white()))
                try:
                    the_score = (float)(str_the_score)
                except:
                    if(str_the_score.count("-") > 0):
                        the_score = -100000
                    else:
                        the_score = 100000
            else:
                str_the_score = ((str)((info["score"]).black()))
                try:
                    the_score = (float)(str_the_score)
                except:
                    if(str_the_score.count("-") > 0):
                        the_score = -100000
                    else:
                        the_score = 100000

            #print(the_score)
            
            all_scores.append(the_score)
            if(counter2 > 0 and (all_scores[counter2] - all_scores[counter2-1]) > max_change and my_turn==True):
                score_change = (all_scores[counter2] - all_scores[counter2-1])
                #print("MAX SCORE CHANGE HERE")
                max_change = all_scores[counter2] - all_scores[counter2-1]
                #all_images = functions.set_gui_board(board, gui_board, root)
                temp_mistake = chess_mistake(deepcopy(board),deepcopy(last_board), score_change)
            #else:
                #all_images = functions.set_gui_board(board, gui_board, root)
                

            #time.sleep(0.1)
            counter2 = counter2+1

            num_moves = num_moves+1

        if(temp_mistake is not None):
            all_mistakes.append(temp_mistake)
                
        i = i+1

    all_mistakes.sort(key=lambda x: x.score_change, reverse=True)
    for x in all_mistakes:
        temp_board = x.board
        last_board = x.last_board
        print("SCORE CHANGE", x.score_change)
        all_images = functions.set_gui_board(last_board, gui_board, root)
        info = engine.analyse(last_board, chess.engine.Limit(depth=20))
        str_the_score = ((str)((info["score"]).white()))
        print("FROM: ", str_the_score)
        time.sleep(5)
        all_images = functions.set_gui_board(temp_board, gui_board, root)
        info = engine.analyse(temp_board, chess.engine.Limit(depth=20))
        str_the_score = ((str)((info["score"]).white()))
        print("TO: ", str_the_score)
        #time.sleep(10)
        result = engine.play(last_board, chess.engine.Limit(depth=25))
        new_temp_board = deepcopy(last_board)
        new_temp_board.push(result.move)
        print("CORRECT MOVE:")
        print(result.move)
        all_images = functions.set_gui_board(new_temp_board, gui_board, root)

        time.sleep(10)

    print("Done")
    engine.quit()
    root.mainloop()

if __name__=="__main__":
    main()

#asyncio.set_event_loop_policy(chess.engine.EventLoopPolicy())
#asyncio.run(main())