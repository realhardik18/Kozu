import youtube_dl
def get_video_info(url):
    with youtube_dl.YoutubeDL() as ydl:
        info = ydl.extract_info(url, download=False)
        data = {
            "title": info.get("title"),
            "channel": info.get("uploader"),
            "length": info.get("duration")
        }
    return data
print(get_video_info('https://www.youtube.com/watch?v=Aem7zote38Q'))