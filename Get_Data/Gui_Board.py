'''
Created on 2019 M03 29

@author: kale3370
'''

#Code Taken from Github


import tkinter as tk
class GameBoard(tk.Frame):
    def __init__(self, parent, rows=8, columns=8, size=72, color1="white", color2="brown"):
        '''size is the size of a square, in pixels'''

        self.rows = rows
        self.columns = columns
        self.size = size
        self.color1 = color1
        self.color2 = color2
        self.pieces = {}

        canvas_width = columns * size
        canvas_height = rows * size

        tk.Frame.__init__(self, parent)
        self.canvas = tk.Canvas(self, borderwidth=0, highlightthickness=0,
                                width=canvas_width, height=canvas_height, background="bisque")
        self.canvas.pack(side="top", fill="both", expand=True, padx=2, pady=2)

        # this binding will cause a refresh if the user interactively
        # changes the window size
        self.canvas.bind("<Configure>", self.refresh)

    def addpiece(self, name, image, row=0, column=0):
        '''Add a piece to the playing board'''
        #print("Adding piece "+ name)
        self.canvas.create_image(0,0, image=image, tags=(name, "piece"), anchor="c")
        self.placepiece(name, row, column)

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

    def refresh(self, event):
        '''Redraw the board, possibly in response to window being resized'''
        xsize = int((event.width-1) / self.columns)
        ysize = int((event.height-1) / self.rows)
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

        
        


# image comes from the silk icon set which is under a Creative Commons
# license. For more information see http://www.famfamfam.com/lab/icons/silk/
