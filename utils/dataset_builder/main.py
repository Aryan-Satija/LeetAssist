import requests
import openpyxl
import random

# Function to fetch data from LeetCode API
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

# Function to update Excel sheet
def update_excel(data, filename='user_data.xlsx'):
    try:
        workbook = openpyxl.load_workbook(filename)
        sheet = workbook.active
    except FileNotFoundError:
        workbook = openpyxl.Workbook()
        sheet = workbook.active
    headers = [
        "Username",
    ]
    for i in range(1, 7, 1):
        headers.append(f"contest-{i}")
        
    sheet.append(headers)
    
    for user, user_data in data.items():
        contests = user_data['data']['userContestRankingHistory']
        user_contests = []
        try:    
            threshold = 6        
            for contest in contests:
                if contest['attended'] == True:
                    user_contests.append(contest['rating'])
                if len(user_contests) >= threshold:
                    row = [user] + user_contests[-6: ]
                    threshold += 1 
                    sheet.append(row)
        except:
            print(user, user_data)
    workbook.save(filename)

# Main function to fetch data for random users and update Excel
def main():
    usernames = ["__ARYAN1__", "chitraksh24", "dianazhai", "xil899", "MenheraCapoo", "gongyue", "harshit_99", "adityaGarg83", "sichern", "fake_name", "yutingpang", "flyingosprey", "avinash_barnwal", "PravinGlitch02", "manii15", "Wolfester", "jerksundertaker", "sankarkalla4", "yhw99go", "vijayjain", "ankitjainb27", "paru0100", "ayushkumarsinha2000", "jishenli1227", "Kuldeep_Meena", "mrf92", "ruts", "zhengfu23", "nguyenducloc", "neal_wu", "milind0110", "rajatgoyal376", "blisses", "lagaHuaHuBro", "01110001", "rajatjc", "NDR0216", "BearForever", "de_coding_life", "redhair_rs", "thunder_strike", "amitbansal13", "LC_Yun"]  
    user_data = {}

    for username in usernames:
        print(f"Fetching data for {username}...")
        user_data[username] = fetch_user_data(username)
    # print(user_data)
    update_excel(user_data)

if __name__ == "__main__":
    main()
