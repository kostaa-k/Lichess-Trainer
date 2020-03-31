from flask import Flask, request

import json
import pandas
from lichess.format import SINGLE_PGN
from lichess.format import PGN
from lichess.format import JSON
import chess

app = Flask(__name__)
@app.route('/get_data', methods=['POST', 'GET'])


# def receive_board():

#     #print(request.data)
#     try:
#         the_data = (str)((request.data)).replace("\n", "")
#         the_data = the_data.replace("'", "")
#         the_data = the_data.replace("\\r\\n", "")
#         some_list = the_data.split(",")
#         #print(some_list)
#         list_to_board(some_list)
#         print("worked")
#     except:
#         print("Failed")
#         return 'FAIL'
        
#     return 'Received !' #Response to request


def receive_move():
    print(request.data)
    try:
        the_data = (str)((request.data)).replace("\n", "")
        the_data = the_data.replace("b'", "")
        the_data = the_data.replace("'", "")
        the_data = the_data.lower()
        print(the_data)
        the_move = chess.Move.from_uci(the_data)
        #print("Success")
        #print(the_move.uci())
    except:
        print("Failed")
        return 'FAIL'

    return 'SUCCESS'

def list_to_board(the_list):
    for x in the_list:
        print(x)

# def post_board(board_array):
#     try:
        

if __name__ == '__main__':
    app.run(use_reloader=True)