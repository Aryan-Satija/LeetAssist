#     localhost:5000      /get_questions
# ---- domain name ----  ---- end point ----

from flask import request, jsonify
from config import app
from config import app, rating_predictor, p_dataset, vectorizer, dataset, similarity, problems, features, cf_dataset
from config import ps
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import requests

vectors = []

# THIS IS KNOWN AS A DECORATOR
# Decorators start with @
# they take another function as input and extend the functionality of the function written beneath it without making changes to the code. 
@app.route("/", methods=['GET'])
def home():
    return jsonify({
        "message" : "Server is running"    
    }), 200
    
@app.route("/problems", methods=['GET'])
def get_problems():
    return jsonify({
        "problems": problems
    }), 200
    

@app.route("/recommend/<int:problem_id>", methods=["GET"])
def recommend(problem_id):
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
    return jsonify({
        "recommended_problems": response,
    }), 200  
   
@app.route("/recommendX",methods=["POST"])
def recommendX():
    tags = request.json.get("tags")
    
    filtered_tags = []
    for tag in tags:
        if ps.stem(tag) not in filtered_tags:
            filtered_tags.append(ps.stem(tag))

    new_df = p_dataset.copy(deep = True)
    
    new_df.loc[len(p_dataset.index)] = [-1, 'unknown', " ".join(filtered_tags)]
    
    vectors = vectorizer.fit_transform(new_df['tags']).toarray()
    simi = cosine_similarity(vectors)
    
    problem_inds = sorted(list(enumerate(simi[1825])), key = lambda x : x[1], reverse = True)[1 : 6]
    
    response = []
    
    for prob_ind in problem_inds:
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
        
    return jsonify({
        "recommended_problems": response
    }), 200  


@app.route('/predict_my_rating/<string:username>', methods=["GET"])
def predict_my_rating(username):
    def fetch_user_data(username):
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
        """ % (username, username)
        
        response = requests.post(url, json={'query': query})
        data = response.json()
        return data
    
    data = fetch_user_data(username)
    contests = data['data']['userContestRankingHistory']
    ratings = []
    for contest in contests:
        if contest['attended'] == True:
            ratings.append(contest['rating'])
    
    if(len(ratings) < 10):
        return jsonify({'message': 'Please participate in atleast 10 contests.'}), 401
    
    ratings = ratings[-10:]

    forecast = []
    for i in range(0, 5, 1):
        next_rating = rating_predictor.predict([ratings])
        forecast.append(next_rating[0][0])
        ratings.pop(0)
        ratings.append(next_rating[0][0])
    
    return jsonify({
        'user': data,
        'forecast': forecast
    }), 200

@app.route("/getTags",methods=["POST"]) 
def getTags():
    problem_statement = request.json.get("problem")
    
    freq = {}
    for word in problem_statement.split():
        word = ps.stem(word.lower())
        if word in freq:
            freq[word] += 1
        else:
            freq[word] = 1
    vector = []
    for feature in features:
        if feature in freq:
            vector.append(freq[feature])
        else:
            vector.append(0)
    
    print(vectors)
    
    similarity = []
    for original_vector in vectors:
        similarity.append(cosine_similarity([vector, original_vector])[0][1])
        
    recommended_index, simi = 0, similarity[0]

    id = 0
    for val in similarity: 
        if val > simi:
            simi = val
            recommended_index = id
        id += 1
    
    topics = []
    for col, val in cf_dataset.iloc[recommended_index].items():
        if col != 'contest' and col != 'problem_statement' and val == 1:
            topics.append(col)
    
    return jsonify({
        'topics': topics,
        'certainty': simi*100 
    }), 200
if __name__ == "__main__":
    # code inside this if block will
    # start to execute if we run this file.
    # In python if we import something from some file, then the file from which we import is run first.
    # hence this if block prevents this code to be executed again and again in each import.
    vectors = vectorizer.fit_transform(cf_dataset['problem_statement']).toarray()
    app.run(debug = True)
