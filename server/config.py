from flask import Flask
from flask_cors import CORS
from nltk.stem.porter import PorterStemmer
import pickle

ps = PorterStemmer()

app = Flask(__name__)

# To allow cross origin resource sharing.
# To allow our server to accept requests from other origins.
CORS(app)

with open('../model/dataset.pkl', 'rb') as f:
    dataset = pickle.load(f)

with open('../model/model.pkl', 'rb') as f:
    similarity = pickle.load(f)

with open('../model/vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('../model/p_dataset.pkl', 'rb') as f:
    p_dataset = pickle.load(f)

with open('../model/rating_predicting_model.pkl', 'rb') as f:
    rating_predictor = pickle.load(f)

with open('../model/codeforces_dataset.pkl', 'rb') as f:
    cf_dataset = pickle.load(f)

with open('../model/features.pkl', 'rb') as f:
    features = pickle.load(f)

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
