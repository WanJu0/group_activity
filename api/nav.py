from flask import*
import json
router_page_nav = Blueprint("router_page_nav", __name__, template_folder="templates")

@router_page_nav.route("/api/nav")
def navData():
    # data= openJson("activity")
    with open('data/activity.json', 'r') as f:
        data = json.load(f)
    return data