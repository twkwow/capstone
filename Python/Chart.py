import os
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from flask import Flask, render_template
import numpy as np 
import pandas as pd 
import plotly.express as px

def generate_chart():
    data = {
        "Date": [1, 1, 2, 3, 4, 5, 6],
        "User Count": [0, 2, 4, 5, 5.5, 7, 9]
    }
    df = pd.DataFrame(data)
    fig = px.scatter(df, x="Date", y="User Count")
    fig.write_html("chart.html")
    print("chart.html updated")

# Watcher class to monitor changes to chart.py
class MyHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith('.py'):
            print(f'Changes detected in {event.src_path}')
            generate_chart()

if __name__ == "__main__":
    # Initialize file watcher
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()