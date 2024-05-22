from flask import jsonify
from config import problems

def get_problems():
    return jsonify({
        "problems": problems
    }), 200
    