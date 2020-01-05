import Gui_Board
from Gui_Board import GameBoard
import tkinter as tk
import chess
import time



def set_gui_board(board, gui_board, root):
    #print(board.pieces)
    the_str = (board.pieces(chess.PAWN, chess.WHITE))
    #print(board.xboard)

    piece_names = {}
    piece_names[1] = "PAWN"
    piece_names[2] = "KNIGHT"
    piece_names[3] = "BISHOP"
    piece_names[4] = "ROOK"
    piece_names[5] = "QUEEN"
    piece_names[6] = "KING"

    #all_images = []
    #gui_board.destroy_some_frame()
    #gui_board.piece_images = []
    gui_board.pieces.clear()
    gui_board.canvas.delete("all")
    gui_board.redraw_canvas()
    #gui_board = GameBoard(root)
    #gui_board.pack(side="top", fill="both", expand="true", padx=4, pady=4)

    colors_str = ["WHITE", "BLACK"]
    the_colors = [chess.WHITE, chess.BLACK]
    for i in range(0, 2):
        temp_color = the_colors[i]
        color_str = colors_str[i]

        for piece_num in range(1, 7):
            piece_name = piece_names[piece_num]
            these_pieces = board.pieces(piece_num, temp_color)
            temp_name = color_str+"_"+piece_name
            #print(list(these_pieces))
            filepath_name = "Pieces/"+temp_name.lower()+".png"
            tk_image = tk.PhotoImage(file=filepath_name)
            #all_images.append(tk_image)
            piece_counting=0
            for temp_piece in list(these_pieces):
                x_pos = temp_piece%8
                y_pos = (temp_piece//8)
                #print(x_pos, y_pos, end= "")
                #print("  ", end="")
                unique_piece_id = temp_name+"__"+(str)(piece_counting)
                gui_board.addpiece(unique_piece_id, y_pos, x_pos)
                root.update()
                #time.sleep(0.1)
                piece_counting = piece_counting+1

    return 0
