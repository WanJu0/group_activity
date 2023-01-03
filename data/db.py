from flask import *

def openJson(district):

  with open(f"./data/{district}.json") as f:
    data = json.load(f)

  return data

  