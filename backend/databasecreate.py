from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from datetime import datetime
import json

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///site.db'
db=SQLAlchemy(app)

from sqlalchemy.ext.declarative import DeclarativeMeta

class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)

class Candidate(db.Model):
    cand_id = db.Column(db.Integer,primary_key=True)
    cand_uname = db.Column(db.String(20), unique=True,nullable=False)
    cand_pwd = db.Column(db.String(60),nullable=False)
    cand_fname = db.Column(db.String(20), nullable=False)
    cand_lname = db.Column(db.String(20), nullable=False)
    cand_email_id = db.Column(db.String(30), nullable=False, unique=True)
    cand_gender = db.Column(db.String(1), nullable=True)
    cand_address = db.Column(db.String(500), nullable=True)
    cand_contact_no = db.Column(db.String(13), nullable=False, unique=True)
    resume = db.Column(db.Text, nullable=True)
    sub_plan = db.Column(db.Integer,nullable=False)
    image_file = db.Column(db.String(20), nullable=False,default='default.jpg')

class Employer(db.Model):
    emp_id = db.Column(db.Integer,primary_key=True)
    emp_pwd = db.Column(db.String(60),nullable=False)
    emp_fname = db.Column(db.String(20), nullable=False)
    emp_lname = db.Column(db.String(20), nullable=False)
    emp_email_id = db.Column(db.String(30), nullable=False, unique=True)
    emp_address = db.Column(db.String(500), nullable=True)
    emp_contact_no = db.Column(db.String(13), nullable=False, unique=True)
    emp_sub_plan = db.Column(db.Integer,nullable=False)
    
class Application(db.Model):
    app_id = db.Column(db.Integer,primary_key=True)
    cand_id = db.Column(db.Integer,db.ForeignKey('candidate.cand_id'),nullable=False)
    job_id = db.Column(db.Integer,db.ForeignKey('job.job_id'),nullable=False)

class Education_Historys(db.Model):
    edu_id = db.Column(db.Integer,primary_key=True)
    cand_id = db.Column(db.Integer,db.ForeignKey('candidate.cand_id'),nullable=False)
    institution_name = db.Column(db.String(20), nullable=False)
    level_of_study = db.Column(db.String(10), nullable=False)
    from_date = db.Column(db.String(20), nullable=False)
    to_date = db.Column(db.String(20), nullable=False)
    
class Employment_History(db.Model):
    eh_id = db.Column(db.Integer,primary_key=True)
    cand_id = db.Column(db.Integer,db.ForeignKey('candidate.cand_id'),nullable=False)
    company_name = db.Column(db.String(20), nullable=False)
    designation = db.Column(db.String(20), nullable=False)
    from_date = db.Column(db.String(20), nullable=False)
    to_date = db.Column(db.String(20), nullable=False)

class Subscription(db.Model):
    sub_id = db.Column(db.Integer,primary_key=True)
    sub_plan_name = db.Column(db.String(20), nullable=False)
    sub_details = db.Column(db.String(20), nullable=False)

class Job(db.Model):
    __tablename__ = 'job'
    __searchable__ = ['designation', 'job_title', 'short_description']
    job_id = db.Column(db.Integer,primary_key=True)
    job_title = db.Column(db.String(30), nullable=False)
    designation = db.Column(db.String(20), nullable=False)
    date_created = db.Column(db.String(20), nullable=False, default=datetime.utcnow)
    expiry_date = db.Column(db.String(20), nullable=False, default=datetime.utcnow)
    e_id = db.Column(db.Integer,db.ForeignKey('employer.emp_id'),nullable=False)
    short_description = db.Column(db.String(20))

db.create_all()
db.session.commit()