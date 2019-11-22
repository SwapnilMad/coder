import requests
from pprint import pprint
import sys

sys.path.append("../")
from databasecreate import db, Job, Employer
import random


def random_phone_number():
    n = "0000000000"
    while "9" in n[3:6] or n[3:6] == "000" or n[6] == n[7] == n[8] == n[9]:
        n = str(random.randint(10 ** 9, 10 ** 10 - 1))
    return n[:3] + "-" + n[3:6] + "-" + n[6:]


def add_job(db, data, emp_id):
    exists = (
        db.session.query(Job).filter_by(e_id=emp_id, job_title=data["job_title"]).scalar()
        is not None
    )
    #print(data["job_title"])
    # input()

    if not exists:
        job = Job(
            job_title=data["job_title"],
            designation=data["job_title"],
            date_created=data["publish_date"],
            expiry_date=None,
            e_id=emp_id,
            short_description=data["description"],
        )
        db.session.add(job)
        db.session.commit()
        print("Adding job {}".format(data["job_title"]))
    else:
        print({"Job Already Exists"})


def add_employer(db, data):
    email = "admin@" + data["company_name"].lower().replace(" ", "_") + ".com"
    print(email)
    exists = db.session.query(Employer).filter_by(emp_email_id=email).scalar() is not None
    if not exists:
        if "location" in data:
            address = data["location"]
        else:
            address = "N/A"

        emp = Employer(
            emp_pwd=data["company_name"],
            emp_fname=data["company_name"],
            emp_lname=data["company_name"],
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
    endpoint = "https://careers.google.com/api/jobs/jobs-v1/search/?company=Google&company=Google%20Fiber&company=Loon&company=Verily%20Life%20Sciences&company=Waymo&company=Wing&company=X&company=YouTube&employment_type=FULL_TIME&hl=en_US&jlo=en_US&page={page}&q={search_term}&sort_by=relevance".format(
        search_term=search_terms, page=page
    )
    res = requests.get(endpoint)
    return res.json()


def handle_data(job):

    emp_id = add_employer(db, job)
    print(emp_id)
    if emp_id is None:
        print("Adding Employee {}".format(emp_id))
    add_job(db, job, emp_id)


for page in range(0, 100):
    print("Page {}".format(page))
    jobs = get_jobs("assembly", page)
    # print(jobs)
    # input()
    for job in jobs["jobs"]:
        # pprint(job)
        handle_data(job)
