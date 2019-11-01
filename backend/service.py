import os
import json
from flask import Flask,request
from flask_cors import CORS
from databasecreate import db,Candidate,AlchemyEncoder,Education_Historys,Employment_History,Employer,Job
from werkzeug import secure_filename
from sqlalchemy import or_

UPLOAD_FOLDER = 'C:/Users/swapn/Documents/coder/CoderConnect/frontend/public/candidateImage'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app=Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/candidate/image/<string:ucand>',methods=['POST'])
def upload_file(ucand):
    print(request.files)
    if request.method=='POST':
        f=request.files['image']
        if f and allowed_file(f.filename):           
            f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(ucand+'.jpg')))
            return 'success'

@app.route('/api/candidate',methods=['POST'])
def candinsert():
    data=request.get_json()
    cand=Candidate(cand_uname=data['cand_UName'],cand_pwd=data['cand_pwd'],cand_fname=data['cand_FName'],cand_lname=data['cand_LName'],cand_email_id=data['cand_EMail_ID']
        ,cand_gender=data['cand_Gender'],cand_address=data['cand_Address'],sub_plan='123',image_file=data['cand_UName']+'.jpg',cand_contact_no=data['cand_Contact_No']
        ,resume=data['resume'])
    db.session.add(cand)
    db.session.commit()
    return str(cand.cand_id)

@app.route('/api/candidate/education',methods=['POST'])
def candeduinsert():
    data=request.get_json()
    for d in data:
        edu=Education_Historys(cand_id=int(d['cand_id']),institution_name=d['cand_institute'],level_of_study=d['cand_level'],from_date=d['cand_fromdate'],to_date=d['cand_todate'])
        db.session.add(edu)
        db.session.commit()
    return "success"

@app.route('/api/candidate/education/<string:edu_id>',methods=['PUT','DELETE'])
def updatedeletecandedu(edu_id):
    edu = db.session.query(Education_Historys).filter_by(edu_id=edu_id).first()
    if request.method=='DELETE':
        db.session.delete(edu)
        db.session.commit()
    elif request.method=='PUT':
        d = request.get_json()
        edu.institution_name=d['cand_institute']
        edu.level_of_study=d['cand_level']
        edu.from_date=d['cand_fromdate']
        edu.to_date=d['cand_todate']
        db.session.commit()
    return 'success'

@app.route('/api/candidate/employment',methods=['POST'])
def candempinsert():
    data=request.get_json()
    for d in data:
        emp=Employment_History(cand_id=d['cand_id'],company_name=d['employer'],designation=d['designation'],from_date=d['emp_fromdate'],to_date=d['emp_todate'])
        db.session.add(emp)
        db.session.commit()
    return "success"

@app.route('/api/candidate/employment/<string:eh_id>',methods=['PUT','DELETE'])
def updatedeletecandemp(eh_id):
    emp = db.session.query(Employment_History).filter_by(eh_id=eh_id).first()
    if request.method=='DELETE':
        db.session.delete(emp)
        db.session.commit()
    elif request.method=='PUT':
        d = request.get_json()
        emp.company_name=d['employer']
        emp.designation=d['designation']
        emp.from_date=d['emp_fromdate']
        emp.to_date=d['emp_todate']
        db.session.commit()
    return 'success'

@app.route('/api/candidate/<string:ucand>',methods=['GET'])
def canexist(ucand):
    cand=db.session.query(Candidate).filter_by(cand_uname=ucand).first()
    return  json.dumps(cand,cls=AlchemyEncoder)

@app.route('/api/candidate/<string:ucand>',methods=['PUT','DELETE'])
def updatedeletecand(ucand):
    cand = db.session.query(Candidate).filter_by(cand_uname=ucand).first()
    if request.method=='DELETE':
        db.session.query(Employment_History).filter_by(cand_id=cand.cand_id).delete()
        db.session.query(Education_Historys).filter_by(cand_id=cand.cand_id).delete()
        db.session.delete(cand)
        db.session.commit()
    elif request.method=='PUT':
        data = request.get_json()
        cand.cand_uname=data['cand_UName']
        cand.cand_pwd = data['cand_pwd']
        cand.cand_fname = data['cand_FName']
        cand.cand_lname = data['cand_LName']
        cand.cand_email_id = data['cand_EMail_ID']
        cand.cand_gender = data['cand_Gender']
        cand.cand_address = data['cand_Address']
        #cand.sub_plan = data['sub_plan']
        cand.sub_plan='123'
        cand.image_file = data['cand_UName']+'.jpg'
        cand.cand_contact_no = data['cand_Contact_No']
        cand.resume = data['resume']
        db.session.commit()
    return 'success'

@app.route('/api/candidate',methods=['GET'])
def showall():
    cand=db.session.query(Candidate).all()
    return json.dumps(cand,cls=AlchemyEncoder)

@app.route('/api/candidatelike/<string:cand>',methods=['GET'])
def showalllike(cand):
    cand=db.session.query(Candidate).filter(or_(Candidate.cand_fname.like(cand+'%'),Candidate.cand_lname.like(cand+'%'))).all()
    return json.dumps(cand,cls=AlchemyEncoder)

@app.route('/api/candidate/education',methods=['GET'])
def showallcandedu():
    edu=db.session.query(Education_Historys).all()
    return json.dumps(edu,cls=AlchemyEncoder)

@app.route('/api/candidate/education/<string:cid>',methods=['GET'])
def showcandedu(cid):
    edu=db.session.query(Education_Historys).filter_by(cand_id=cid).all()
    return json.dumps(edu,cls=AlchemyEncoder)

@app.route('/api/candidate/employment',methods=['GET'])
def showallcandemp():
    emp=db.session.query(Employment_History).all()
    return json.dumps(emp,cls=AlchemyEncoder)    

@app.route('/api/candidate/employment/<string:cid>',methods=['GET'])
def showcandemp(cid):
    emp=db.session.query(Employment_History).filter_by(cand_id=cid).all()
    return json.dumps(emp,cls=AlchemyEncoder)


@app.route('/api/employer',methods=['GET'])
def showallemployer():
    empr=db.session.query(Employer).all()
    return json.dumps(empr, cls=AlchemyEncoder)

@app.route('/api/employer',methods=['POST'])
def emprinsert():
    data=request.get_json()
    empr=Employer(emp_pwd=data['emp_pwd'],emp_fname=data['emp_name'],emp_lname=data['emp_full_name'],
        emp_email_id=data['emp_email_id'],emp_address=data['emp_address'],emp_sub_plan='123',emp_contact_no=data['emp_contact_no'])
    db.session.add(empr)
    db.session.commit()
    return str(empr.emp_id)

@app.route('/api/employer/<string:empr>',methods=['PUT','DELETE'])
def updatedeleteempr(empr):
    emp = db.session.query(Employer).filter_by(emp_email_id=empr).first()
    if request.method=='DELETE':
        db.session.delete(emp)
        db.session.commit()
    elif request.method=='PUT':
        data = request.get_json()
        emp.emp_pwd = data['emp_pwd']
        emp.emp_fname = data['emp_name']
        emp.emp_lname = data['emp_full_name']
        emp.emp_email_id = data['emp_email_id']
        emp.emp_address = data['emp_address']
        emp.emp_sub_plan = '123'
        emp.emp_contact_no = data['emp_contact_no']
        db.session.commit()
    return 'success'

@app.route('/api/employer/<string:email_id>',methods=['GET'])
def empremailexist(email_id):
    empr=db.session.query(Employer).filter_by(emp_email_id=email_id).first()
    return  json.dumps(empr,cls=AlchemyEncoder)

@app.route('/api/employer/id/<string:e_id>',methods=['GET'])
def getempbyid(e_id):
    empr=db.session.query(Employer).filter_by(emp_id=e_id).first()
    return  json.dumps(empr,cls=AlchemyEncoder)

#Jobs
@app.route('/api/jobs',methods=['POST'])
def postjobs():
    data=request.get_json()
    job=Job(job_title=data['title'],designation=data['designation'],date_created=data['date_created'],expiry_date=data['expiry_date'],e_id=data['e_id'],short_description=data['description'])
    db.session.add(job)
    db.session.commit()
    return "success"

@app.route('/api/jobs/<string:cid>',methods=['GET'])
def showalljobs(cid):
    job=db.session.query(Job).filter_by(e_id=cid).all()
    return json.dumps(job,cls=AlchemyEncoder)

@app.route('/api/jobs/<string:jid>',methods=['PUT','DELETE'])
def updatedeletejobs(jid):
    job = db.session.query(Job).filter_by(job_id=jid).first()
    if request.method=='DELETE':
        db.session.delete(job)
        db.session.commit()
    elif request.method=='PUT':
        data = request.get_json()
        job.job_title=data['title']
        job.designation=data['designation']
        job.expiry_date=data['expiry_date']
        job.short_description=data['description']        
        db.session.commit()
    return 'success'

@app.route('/api/jobs',methods=['GET'])
def showjobs():
    job=db.session.query(Job).all()
    return json.dumps(job,cls=AlchemyEncoder)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
