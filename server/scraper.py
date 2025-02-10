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
        "by_url":"htpps://youtube.com/channel/"+snippet['channelId'],
        "thumbnail_url":snippet['thumbnails']['high']['url']
    }
    return data

#print(video_details('pt2ZHmnDWVw'))