import os

import pandas as pd
import numpy as np
import requests

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

app = Flask(__name__)

@app.route("/")
def index():
    #"""Return the homepage."""
    return render_template("golaunch.html")


@app.route("/upcomings")
def names():
  #"""Return a list of upcoming launches."""
  #set up url
    url="https://spacelaunchnow.me/api/3.3.0/launch/upcoming/?limit=10&ordering=net"
    upcoming = requests.get(url,verify=False)
    upcoming_json =upcoming.json()
    upcomings=upcoming_json['results']
    
    upcoming_l=[]


    for i in range(len(upcomings)):
        upcoming_d={}      
        upcoming_d['name']=upcomings[i]['name']
        upcoming_d['net']=upcomings[i]['net']
        upcoming_d['provider']=upcomings[i]['rocket']['configuration']['launch_service_provider']
        upcoming_l.append(upcoming_d)


    # Return a list of dictionaries of the upcoming launches
    return jsonify(upcoming_l)


@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    if request.method == "GET":
        return render_template("data.html")
    else:
        return render_template("golaunch.html")

@app.route("/funfact", methods=["GET", "POST"])
def funfact():
    if request.method == "GET":
        return render_template("funfact.html")
    else:
        return render_template("golaunch.html")

@app.route("/game", methods=["GET", "POST"])
def game():
    if request.method == "GET":
        return render_template("game.html")
    else:
        return render_template("golaunch.html")

@app.route("/send")
def send():
    if request.method == "POST":
        print('app')
    else:
        return render_template("golaunch.html")
        
if __name__ == "__main__":
    app.run()
