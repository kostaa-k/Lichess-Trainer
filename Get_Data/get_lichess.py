import requests
import lichess.api
from lichess.format import SINGLE_PGN
from lichess.format import PGN
from lichess.format import JSON
import chess
import json

start_point = "https://lichess.org/api"

def get_lichess_games(username, num_games=10):

    pgn = lichess.api.user_games(username, max=num_games, format=JSON)
    
    return pgn