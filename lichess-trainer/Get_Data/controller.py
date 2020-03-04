from flask import Flask, request

import json
import pandas
app = Flask(__name__)
@app.route('/get_data', methods=['POST', 'GET'])


def receive_board():

    try:
        the_data = (str)((request.data)).replace("\n", "")
        the_data = the_data.replace("'", "")
        the_data = the_data.replace("\\r\\n", "")
        some_list = the_data.split(",")
        print(some_list)
    except:
        return 'FAIL'
        
    return 'Received !' #Response to request

print("Finished")