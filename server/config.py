from flask import Flask
from flask_cors import CORS
import pickle
import numpy as np
import nltk
from nltk.stem.porter import PorterStemmer

ps = PorterStemmer()

app = Flask(__name__)

# To allow cross origin resource sharing.
# To allow our server to accept requests from other origins.
CORS(app)

dataset = pickle.load(open('../model/dataset.pkl', 'rb'))
similarity = pickle.load(open('../model/model.pkl', 'rb'))
vectorizer = pickle.load(open('../model/vectorizer.pkl', 'rb'))
p_dataset = pickle.load(open('../model/p_dataset.pkl', 'rb'))
rating_predictor = pickle.load(open('../model/rating_predicting_model.pkl', 'rb'))

problems = list(map(lambda x: {
        "id": x[0],
        "name": x[1],
        "description": x[2],
        "is_premium": x[3],
        "difficulty": x[4],
        "acceptance_rate": x[6],
        "url": x[8],
        "accepted": x[10],
        "submissions": x[11],
        "companies": x[12].split(',') if isinstance(x[12], str) else [],
        "related_topics": x[13].split(',') if isinstance(x[13], str) else [],
        "likes": x[14],
        "dislikes": x[15],
        "asked_by_faang": x[17],
    },  dataset.values.tolist()))
