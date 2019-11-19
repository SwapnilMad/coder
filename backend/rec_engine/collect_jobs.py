import requests
from pprint import pprint
from databasecreate import db, Job

BASE_URL = "https://jobs.github.com/"

def add_job(db, data):
    job = Job(
        job_title=data["title"],
        designation=data["designation"],
        date_created=data["date_created"],
        expiry_date=data["expiry_date"],
        e_id=data["e_id"],
        short_description=data["description"],
    )
    db.session.add(job)
    db.session.commit()


def search_github_jobs(search_terms, page=1):
    url = BASE_URL + "positions.json?markdown-false&description={}&full_time=true".format(search_terms)
    resp = requests.get(url)
    # print(resp.content)
    return resp.json()


jobs = search_github_jobs("")
for job in jobs:
    print(job)
    
    