import requests
from pprint import pprint
import sys

sys.path.append("../")
from databasecreate import db, Job, Employer
import random

API_KEY = "520fdb5420675de590b1802cfba5bac3"
BASE_URL = "https://authenticjobs.com/api/?api_key={}&format=json".format(API_KEY)


def random_phone_number():
    n = "0000000000"
    while "9" in n[3:6] or n[3:6] == "000" or n[6] == n[7] == n[8] == n[9]:
        n = str(random.randint(10 ** 9, 10 ** 10 - 1))
    return n[:3] + "-" + n[3:6] + "-" + n[6:]


def add_job(db, data, emp_id):
    exists = (
        db.session.query(Job).filter_by(e_id=emp_id, job_title=data["title"]).scalar()
        is not None
    )

    if not exists:
        job = Job(
            job_title=data["title"],
            designation=data["title"],
            date_created=data["created_at"],
            expiry_date=None,
            e_id=emp_id,
            short_description=data["description"],
        )
        db.session.add(job)
        db.session.commit()
        print("Adding job {}".format(data["title"]))
    else:
        print({"Job Already Exists"})


def add_employer(db, data):
    email = "admin@" + data["company"].lower().replace(" ", "_") + ".com"
    print(email)
    exists = db.session.query(Employer).filter_by(emp_email_id=email).scalar() is not None
    if not exists:
        if "location" in data:
            address = data["location"]
        else:
            address = "N/A"

        emp = Employer(
            emp_pwd=data["company"],
            emp_fname=data["company"],
            emp_lname=data["company"],
            emp_email_id=email,
            emp_address=address,
            emp_contact_no=random_phone_number(),
            emp_sub_plan=123,
        )
        db.session.add(emp)
        db.session.commit()
        return emp.emp_id
    else:
        emp = Employer.query.filter_by(emp_email_id=email).first()
        return emp.emp_id


def get_jobs(search_terms, page_no):
    endpoint = "https://jobs.github.com/positions.json?page={page_no}&search={search_terms}".format(
        search_terms=search_terms, page_no=page_no
    )
    res = requests.get(endpoint)
    return res.json()


def handle_data(job):
   
    emp_id = add_employer(db, job)
    print(emp_id)
    if emp_id is None:
        print("Adding Employee {}".format(emp_id))
    add_job(db, job, emp_id)


for page in range(0,100):
    print("Page {}".format(page))
    jobs = get_jobs("", page)
    #print(jobs)
    #input()
    for job in jobs:
        #pprint(job)
        handle_data(job)
