from dotenv import load_dotenv
import os
import requests

load_dotenv()

def video_details(video_id):
    api_key=os.getenv('YOUTUBE_API_KEY')
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id={video_id}&key={api_key}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch data", "status_code": response.status_code}
    
    data = response.json()
    if "items" not in data or not data["items"]:
        return {"error": "Video not found"}
    
    video_data = data["items"][0]
    snippet = video_data["snippet"]    
    data={
        "title":snippet['title'],
        "url":"https://youtube.com/watch?v="+video_id,
        "by": snippet['channelTitle'],
        "by_url":"htps://youtube.com/channel/"+snippet['channelId'],
        "thumbnail_url":snippet['thumbnails']['high']['url']
    }
    return data

import os
import requests
import isodate
import google.generativeai as genai

def gemini_response(tags):
    genai.configure(api_key=G_API_KEY)

    # Select the model (e.g., gemini-pro)
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Define the prompt
    prompt = (f"Are these tags apt for a educational lecture which is of a length that some people might find it hard to watch in one sitting?, these are the tags:{tags}, just say true or false, no other response")

    # Generate the response
    response = model.generate_content(prompt)
    return response.text

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
        if duration_seconds < 1800:     #checking if the video is more than 30 minutes
            return False
    else:
        return False  # No duration found

    snippet = item["snippet"]
    title = snippet["title"].lower()
    description = snippet["description"].lower()
    tags = [tag.lower() for tag in snippet.get("tags", [])]  # Get tags safely

    if gemini_response(tags) == 'True':
        return True
    return False
