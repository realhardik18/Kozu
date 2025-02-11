from dotenv import load_dotenv
import os
import requests
import isodate
import math
import google.generativeai as genai
import json
from datetime import datetime

load_dotenv()

def video_details(video_id):
    api_key=os.getenv('YOUTUBE_API_KEY')
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id={video_id}&key={api_key}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch data", "status_code": response.status_code}
    
    data = response.json()
    if "items" not in data or not data["items"]:
        return {"error": "Video not found"}
    
    video_data = data["items"][0]
    snippet = video_data["snippet"]  
    content_details=video_data['contentDetails']  
    total_duration=isodate.parse_duration(content_details['duration']).total_seconds()
    duration_hours=int(total_duration//3600)
    duration_mins=math.floor((total_duration%3600)/60)
    duration_seconds=math.floor(total_duration%60)
    if str(duration_hours)==1:
        duration_hours='0'+str(duration_hours)
    if str(duration_mins)==1:
        duration_mins='0'+str(duration_mins)        
    if str(duration_seconds)==1:
        duration_seconds='0'+str(duration_seconds)                
    duration=f'{duration_hours}:{duration_mins}:{duration_seconds}'
    data={
        "title":snippet['title'],
        "description":snippet['description'],
        "summarized_description":summarize_description(snippet['description']),
        "url":"https://youtube.com/watch?v="+video_id,
        "by": snippet['channelTitle'],
        "by_url":"htps://youtube.com/channel/"+snippet['channelId'],
        "thumbnail_url":snippet['thumbnails']['high']['url'],
        "duration":duration,
        "chapter_info":get_chapters(snippet['description'],f'"{duration}"')
    }   
    return data


sample_description='''On this week's episode of the podcast, freeCodeCamp founder Quincy Larson interviews Peggy Wang. She's used freeCodeCamp to learn how coding, worked in Big Tech as a robotics engineer, and she's cofounder and CTO of Ego AI, which builds human-like agents for video games.

We talk about:
- How she grew up a first generation immigrant and public school kid in Milwaukee
- How her love of robotics helped her get into Stanford
- How freeCodeCamp served as a key resource to build her developer chops
- The near future of humanoid robots, self-driving cars, and human-like AI agents in games

Links we talk about during our conversation:

- Peggy's GameDev company, Ego AI: https://www.egoai.com/

- Quincy's interview with hardware engineer Bruno Haid that he mentions toward the end of this episode: https://www.freecodecamp.org/news/podcast-hardware-engineering-bruno-haid/

Chapters

0:00:00 Teaser
0:00:00 Podcast Intro
0:00:00 Song - Passing Breeze
0:03:12 Introduction to AI and Robotics
0:06:21 Insights from CES 2023
0:09:06 The Future of Household Robots
0:12:13 The Evolution of Robotics and AI
0:15:12 The Importance of Humanoid Robots
0:18:14 Accessibility and Cost of Robotics
0:21:16 The Role of Software in Robotics
0:24:14 Peggy's Journey into Robotics
0:27:17 Experiences at Stanford University
0:37:43 Navigating the Path to Elite Education
0:43:31 The Evolution of Robotics and AI
0:51:05 The Intersection of Gaming and AI
0:58:52 Creating Infinite Games with AI
1:08:26 The Evolution of Virtual Characters
1:14:26 The Future of Self-Driving Cars
1:20:30 Advancements in AI and Robotics
1:22:03 The Quest for Immersive VR Experiences
1:30:11 Creating Personalized Gaming Worlds
1:37:15 The Evolution of Game Engines
1:41:07 The Future of Game Development Tools
1:43:46 The Path to Humanoid Robots
1:47:59 The Human Element in AI Decision Making
1:58:21 The Future of Robotics and Hardware Innovation'''
def get_chapters(description,lenght):
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(f"your job is the extract the chapters from a given youtube based of their description data. the data returned should be strcitly of JSON format with an array of objects. each object will have fields: chapter_name, start_time,end_time. if a give video does not have any chapters to extract return the text None.if a certain chapter has the same start time and end time , you must not add it. here is the data {description}. reply only with the json data or None and nothing else")
    if 'json' not in response.text:
        return False
    else:
        data=response.text[7:-3]
        data=data.replace('null',lenght)
        data=eval(data)        
        return data

def summarize_description(description):
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(f"your job is to summarize this description in less than 100 words {description}")
    return response.text
    
#print(get_chapters(sample_description,453))
def is_educational(video_id):        
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id={video_id}&key={API_KEY}"    
    response = requests.get(url)
    data = response.json()
    if "items" not in data or not data["items"]:
        return False  # Video not found
    item = data["items"][0]
    # Get duration and convert to seconds
    if "contentDetails" in item:
        iso_duration = item["contentDetails"]["duration"]
        duration_seconds = int(isodate.parse_duration(iso_duration).total_seconds())
        if duration_seconds < 1800:    
            return False
    else:
        return False  # No duration found

    snippet = item["snippet"]
    title = snippet["title"].lower()
    description = snippet["description"].lower()
    tags = [tag.lower() for tag in snippet.get("tags", [])]  # Get tags safely
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(f"Are these tags apt for a educational lecture which is of a length that some people might find it hard to watch in one sitting?, these are the tags:{tags}, just say true or false")
    return eval(response)            

def create_kosu(id,daily_commitments,day_preferences):
    with open('db.json','r') as file:
        data=file.read()
    data=eval(data)
    video_data=video_details(id)    
    new_data={
        "id":id,
        "start":datetime.now().strftime("%d-%m-%Y-%H:%M:%S"),
        "daily_commitments":daily_commitments,
        "day_preferences":day_preferences,
        "video_cursor":'00:00:00',
        "meta_data":{
            "by":video_data['by'],
            "by_url":video_data['by_url'],
            "chapter_info":video_data['chapter_info'],
            "duration":video_data['duration'],
            "summarized_description":video_data["summarized_description"],
            "thumbnail_url":video_data['thumbnail_url'],
            "title":video_data['title'],
            "url":video_data['url']                        
        },
        "track":len(video_data['chapter_info'])*[0]
    }    
    data['kosu'].append(new_data)
    print(data)
    with open('db.json','w') as file:
        json.dump(data,file,indent=4)

def get_with_id(id):
    with open('db.json','r') as file:
        obj=file.read()
        obj=eval(obj)
    i=[o['id'] for o in obj['kosu']].index(id)
    return obj['kosu'][i]

#print(search_with_id('rfscVS0vtbw'))






