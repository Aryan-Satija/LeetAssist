from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from nltk.stem.porter import PorterStemmer
import pickle

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

def recommend(request, problem_id):
    try:
        problem_id = int(problem_id)
    except:
        return HttpResponse("Invalid problem id")
    ind = dataset[dataset['id'] == problem_id].index[0]
    recommended_indices = sorted(list(enumerate(similarity[ind])), key = lambda x : x[1], reverse = True)[1: 6]
    response = []
    for prob_ind in recommended_indices:
        x = dataset.loc[prob_ind[0]]
        response.append({
            "id": int(x.iloc[0]),
            "name": x.iloc[1],
            "description": x.iloc[2],
            "is_premium": int(x.iloc[3]),
            "difficulty": x.iloc[4],
            "acceptance_rate": float(x.iloc[6]),
            "url": x.iloc[8],
            "accepted": x.iloc[10],
            "submissions": x.iloc[11],
            "companies": x.iloc[12].split(',') if isinstance(x.iloc[12], str) else [],
            "related_topics": x.iloc[13].split(',') if isinstance(x.iloc[13], str) else [],
            "likes": int(x.iloc[14]),
            "dislikes": int(x.iloc[15]),
            "asked_by_faang": int(x.iloc[17]),
        })   
    return JsonResponse(response, safe=False)