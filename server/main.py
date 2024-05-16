#     localhost:5000      /get_questions
# ---- domain name ----  ---- end point ----

from flask import request, jsonify
from config import app, dataset, similarity, problems

# THIS IS KNOWN AS A DECORATOR
# Decorators start with @
# they take another function as input and extend the functionality of the function written beneath it without making changes to the code. 
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
        "recommended_problems": response
    }), 200  
    
if __name__ == "__main__":
    # code inside this if block will
    # start to execute if we run this file.
    # In python if we import something from some file, then the file from which we import is run first.
    # hence this if block prevents this code to be executed again and again in each import.
    app.run(debug = True)