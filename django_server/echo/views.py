from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from nltk.stem.porter import PorterStemmer
from tensorflow.keras.models import load_model
from nltk.stem.porter import PorterStemmer
import numpy as np
import pickle
import requests
from sklearn.metrics.pairwise import cosine_similarity
from django.views.decorators.csrf import csrf_exempt
import json

ps = PorterStemmer()

with open('../model/dataset_ver_2.pkl', 'rb') as f:
    dataset = pickle.load(f)

with open('../model/model_ver_2.pkl', 'rb') as f:
    similarity = pickle.load(f)

with open('../model/vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('../model/p_dataset_ver_3.pkl', 'rb') as f:
    p_dataset = pickle.load(f)

with open('../model/rating_predicting_model_new.pkl', 'rb') as f:
    rating_predictor = pickle.load(f)

with open('../model/codeforces_dataset.pkl', 'rb') as f:
    cf_dataset = pickle.load(f)

with open('../model/features.pkl', 'rb') as f:
    features = pickle.load(f)

prediction_model = load_model('../model/prediction_model.h5')

problems = list(map(lambda x: {
        "id": x[0],
        "is_premium": x[2],
        "title": x[3],
        "problem_description": x[4],
        "topic_tags": x[5].split() if isinstance(x[5], list) else [],
        "difficulty": x[6],
        "similar_questions": x[7][1:-1].split(',') if isinstance(x[7], str) else [],
        "solution": x[12],
        "likes": x[14],
        "dislikes": x[15],
        "problem_URL": x[16],
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
            "is_premium": bool(x.iloc[2]),
            "title": x.iloc[3],
            "problem_description": x.iloc[4],
            "difficulty": x.iloc[6],
            "solution": int(x.iloc[12]) if isinstance(x.iloc[12], int) else 0,
            "likes": int(x.iloc[14]) if isinstance(x.iloc[14], int) else 0,
            "dislikes": int(x.iloc[15]) if isinstance(x.iloc[15], int) else 0,
            "problem_URL": x.iloc[16],
        })   
    return JsonResponse(response, safe=False)

def rating(request, handle_name):
    url = f"https://codeforces.com/api/user.rating?handle={handle_name}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        contests = data.get('result')
        if len(contests) < 9:
            return JsonResponse({
                'message': 'data insufficient',
                'forecasted_ratings': []
            })
        contests = contests[-9:]
        ratings = []
        for contest in contests:
            ratings.append(contest['newRating'])
            
        response = []
        ratings = np.array(ratings).reshape(1, 9, 1)  
        
        for _ in range(5):  
            prediction = prediction_model.predict(ratings)
            response.append(float(prediction[0][0]))  
            ratings = np.append(ratings[0][1:], [[prediction[0][0]]], axis=0).reshape(1, 9, 1)
        
        return JsonResponse({
            'message': 'data sufficient',
            'forecasted_ratings': response
        })
    except:
        return JsonResponse({
                'message': 'something went wrong',
                'forecasted_ratings': []
            })

@csrf_exempt   
def recommendFromText(request):
    tags = json.loads(request.body).get('tags')
    filtered_tags = []
    
    for tag in tags:
        tag = tag.lower()
        filtered_tags.append(ps.stem(tag))

    new_df = p_dataset.copy(deep = True)
    
    new_df.loc[len(p_dataset.index)] = [-1, 'unknown', " ".join(filtered_tags)]
    
    vectors = vectorizer.fit_transform(new_df['tags']).toarray()
    simi = cosine_similarity(vectors)
    
    problem_inds = sorted(list(enumerate(simi[len(p_dataset.index)])), key = lambda x : x[1], reverse = True)[1 : 6]
    
    response = []
    
    for prob_ind in problem_inds:
        x = dataset.loc[prob_ind[0]]
        response.append({
            "id": int(x.iloc[0]),
            "is_premium": bool(x.iloc[2]),
            "title": x.iloc[3],
            "problem_description": x.iloc[4],
            "difficulty": x.iloc[6],
            "solution": int(x.iloc[12]) if isinstance(x.iloc[12], int) else 0,
            "likes": int(x.iloc[14]) if isinstance(x.iloc[14], int) else 0,
            "dislikes": int(x.iloc[15]) if isinstance(x.iloc[15], int) else 0,
            "problem_URL": x.iloc[16],
            "similarity": float(prob_ind[1])
        })   
        
    return JsonResponse(response, safe = False)

@csrf_exempt
def tagsPredictor(request):
    tags = json.loads(request.body).get('tags')
    filtered_tags = []
    
    for tag in tags.split(' '):
        tag = tag.lower()
        filtered_tags.append(ps.stem(tag))

    new_df = p_dataset.copy(deep = True)
    
    new_df.loc[len(p_dataset.index)] = [-1, 'unknown', " ".join(filtered_tags)]
    
    vectors = vectorizer.fit_transform(new_df['tags']).toarray()
    simi = cosine_similarity(vectors)
    
    problem_inds = sorted(list(enumerate(simi[len(p_dataset.index)])), key = lambda x : x[1], reverse = True)[1 : 6]
    
    response = {}
    
    for prob_ind in problem_inds:
        x = dataset.loc[prob_ind[0]]
        response[prob_ind[0]] = {
            'certainty': prob_ind[1],
            'tags': x[5]
        }  
        
    return JsonResponse(response)

def predict_my_rating(request, handle_name):
    def fetch_user_data(handle_name):
        url = "https://leetcode.com/graphql"
        query = """
        query {
            userContestRanking(username: "%s") {
                attendedContestsCount
                rating
                globalRanking
                totalParticipants
                topPercentage    
            }
            userContestRankingHistory(username: "%s") {
                attended
                trendDirection
                problemsSolved
                totalProblems
                finishTimeInSeconds
                rating
                ranking
                contest {
                    title
                    startTime
                }
            }
        }
        """ % (handle_name, handle_name)
        
        response = requests.post(url, json={'query': query})
        data = response.json()
        return data
    
    data = fetch_user_data(handle_name)
    try:
        contests = data['data']['userContestRankingHistory']
        ratings = []
        for contest in contests:
            if contest['attended'] == True:
                ratings.append(contest['rating'])
    
        if(len(ratings) < 5):
            return JsonResponse({'status': '400', 'message': 'Please participate in atleast 5 contests.'})
    
        ratings = ratings[-5:]

        forecast = []
        for i in range(0, 5, 1):
            next_rating = rating_predictor.predict([ratings])
            forecast.append(next_rating[0][0])
            ratings.pop(0)
            ratings.append(next_rating[0][0])

        return JsonResponse({
            'status': 200,
            'forecast': forecast,
            'user': data
        })
    except:
        return JsonResponse({'status': '400', 'message': 'User doesn\'t exist'})