#Code Taken from Github
import chess


import tkinter as tk
class GameBoard(tk.Frame):

    the_height = 0
    the_width = 0
    piece_images = {}

    current_board = None

    def __init__(self, parent, rows=8, columns=8, size=72, color1="white", color2="brown"):
        '''size is the size of a square, in pixels'''

        self.rows = rows
        self.columns = columns
        self.size = size
        self.color1 = color1
        self.color2 = color2
        self.pieces = {}

        canvas_width = columns * size
        self.the_width=canvas_width
        canvas_height = rows * size
        self.the_height=canvas_height

        tk.Frame.__init__(self, parent)
        self.canvas = tk.Canvas(self, borderwidth=0, highlightthickness=0,
                                width=canvas_width, height=canvas_height, background="bisque")
        self.canvas.pack(side="left", fill="both", expand=True, padx=2, pady=2)

        # this binding will cause a refresh if the user interactively
        # changes the window size
        self.canvas.bind("<Configure>", self.refresh)

        self.buttons_canvas = tk.Canvas(self, height=200, width=400)
        self.buttons_canvas.pack(side="right", expand = True, padx=1, pady=2)
        self.create_buttons()

    def redraw_canvas(self, rows=8, columns=8, size=72, color1="white", color2="brown"):
        self.rows = rows
        self.columns = columns
        self.size = size
        self.color1 = color1
        self.color2 = color2
        canvas_width = columns * size
        canvas_height = rows * size

        #self.canvas = tk.Canvas(self, borderwidth=0, highlightthickness=0, width=canvas_width, height=canvas_height, background="bisque")
        self.canvas.configure(borderwidth=0, highlightthickness=0, width=canvas_width, height=canvas_height, background="bisque")
        self.canvas.pack(side="left", fill="both", expand=True, padx=2, pady=2)
        self.canvas.bind("<Configure>", self.refresh)

        self.canvas.delete("square")
        color = self.color2
        for row in range(self.rows):
            color = self.color1 if color == self.color2 else self.color2
            for col in range(self.columns):
                x1 = (col * self.size)
                y1 = (row * self.size)
                x2 = x1 + self.size
                y2 = y1 + self.size
                self.canvas.create_rectangle(x1, y1, x2, y2, outline="black", fill=color, tags="square")
                color = self.color1 if color == self.color2 else self.color2
        for name in self.pieces:
            self.placepiece(name, self.pieces[name][0], self.pieces[name][1])
        self.canvas.tag_raise("piece")
        self.canvas.tag_lower("square")


    def addpiece(self, name, row=0, column=0):
        '''Add a piece to the playing board'''
        #print("Adding piece "+ name)
        #print(image)
        row = 7-row
        #column = 7-column
        x0 = (column * self.size) + int(self.size/2)
        y0 = (row * self.size) + int(self.size/2)

        img_name = ((str)(name.split("__")[0])).lower()
        image = self.piece_images[img_name]

        

        self.canvas.create_image(x0,y0, image=image, tags=(name, "piece"), anchor="c")
        #self.placepiece(name, row, column)
        #self.piece_images.append(image)


    def add_piece_image(self, piece_name, image):
        self[piece_name] = image

    def set_up_pieces_images(self):

        piece_names = {}
        piece_names[1] = "PAWN"
        piece_names[2] = "KNIGHT"
        piece_names[3] = "BISHOP"
        piece_names[4] = "ROOK"
        piece_names[5] = "QUEEN"
        piece_names[6] = "KING"

        colors_str = ["WHITE", "BLACK"]
        the_colors = [chess.WHITE, chess.BLACK]

        for i in range(0, 2):
            temp_color = the_colors[i]
            color_str = colors_str[i]

            for piece_num in range(1, 7):
                piece_name = piece_names[piece_num]
                temp_name = color_str+"_"+piece_name

                filepath_name = "Pieces/"+temp_name.lower()+".png"
                #print(filepath_name)
                tk_image = tk.PhotoImage(file=filepath_name)
                #print(temp_name.lower())
                self.piece_images[temp_name.lower()] = tk_image


    def placepiece(self, name, row, column):
        '''Place a piece at the given row/column'''
        self.pieces[name] = (row, column)
        #print(name)
        x0 = (column * self.size) + int(self.size/2)
        y0 = (row * self.size) + int(self.size/2)


        self.canvas.coords(name, x0, y0)
        
    def movepiece(self, name, to_row, to_column):
        self.pieces[name] = (to_row, to_column)
        #print(name)
        x0 = (to_column * self.size) + int(self.size/2)
        y0 = (to_row * self.size) + int(self.size/2)
        self.canvas.coords(name, x0, y0)

    def move_a_piece(self, the_piece, pos_x, pos_y, brd):

        if(brd[pos_x][pos_y].name != ""):
            temp_name = brd[pos_x][pos_y].total_name
            self.movepiece(temp_name, 60, 60)

        new_x = pos_x
        new_y = 7-pos_y

        #Get gui piece name
        the_piece_name = the_piece.total_name

        #Move the piece
        self.movepiece(the_piece_name, new_y, new_x)

    def refresh(self, event=None):
        if(event != None):
            xsize = int((event.width-1) / self.columns)
            ysize = int((event.height-1) / self.rows)
        else:
            xsize = int((self.the_width) / self.columns)
            ysize = int((self.the_height) / self.rows)
        '''Redraw the board, possibly in response to window being resized'''
        self.size = min(xsize, ysize)
        self.canvas.delete("square")
        color = self.color2
        for row in range(self.rows):
            color = self.color1 if color == self.color2 else self.color2
            for col in range(self.columns):
                x1 = (col * self.size)
                y1 = (row * self.size)
                x2 = x1 + self.size
                y2 = y1 + self.size
                self.canvas.create_rectangle(x1, y1, x2, y2, outline="black", fill=color, tags="square")
                color = self.color1 if color == self.color2 else self.color2
        for name in self.pieces:
            self.placepiece(name, self.pieces[name][0], self.pieces[name][1])
        self.canvas.tag_raise("piece")
        self.canvas.tag_lower("square")
        
        
    def destroy_some_frame(self):
        self.some_frame.destroy()
        self.some_frame = None


    def create_buttons(self):
        print("Packing Buttons")

        self.my_move_button = tk.Button(self.buttons_canvas, width=20, bg="light blue", text="My Move", command=self.make_my_move)
        self.my_move_button.grid(column=1, row=2)

        self.engine_move_button = tk.Button(self.buttons_canvas, width=15, bg="light blue", text="Engine Move", command=self.make_engine_move)
        self.engine_move_button.grid(column=1, row=3)

        self.database_move_button = tk.Button(self.buttons_canvas, width=15, bg="light blue", text="DataBase Move", command=self.make_database_move)
        self.database_move_button.grid(column=1, row=4)

    def make_my_move(self):
        print("making my move")
        move = self.current_board

    def make_engine_move(self):
        print("making engine move")

    def make_database_move(self):
        print("Making database move")



    def make_a_move(self, move):
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

        self.pieces.clear()
        self.canvas.delete("all")
        self.redraw_canvas()
        self.current_board = board

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
                filepath_name = "../Pieces/"+temp_name.lower()+".png"
                tk_image = tk.PhotoImage(file=filepath_name)
                #all_images.append(tk_image)
                piece_counting=0
                for temp_piece in list(these_pieces):
                    x_pos = temp_piece%8
                    y_pos = (temp_piece//8)
                    #print(x_pos, y_pos, end= "")
                    #print("  ", end="")
                    unique_piece_id = temp_name+"__"+(str)(piece_counting)
                    self.addpiece(unique_piece_id, y_pos, x_pos)
                    root.update()
                    #time.sleep(0.1)
                    piece_counting = piece_counting+1

        return 0

        
        


# image comes from the silk icon set which is under a Creative Commons
# license. For more information see http://www.famfamfam.com/lab/icons/silk/
