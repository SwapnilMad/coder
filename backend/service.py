import os
import json
from flask import Flask,request
from flask_cors import CORS
from databasecreate import db,Candidate,AlchemyEncoder
from werkzeug import secure_filename

UPLOAD_FOLDER = 'C:/Users/swapn/Documents/coder/CoderConnect/frontend/src/resource/candidateImage'
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
    return "success"

@app.route('/api/candidate/<string:ucand>',methods=['GET'])
def canexist(ucand):
    cand=db.session.query(Candidate).filter_by(cand_uname=ucand).first()
    return  json.dumps(cand,cls=AlchemyEncoder)

@app.route('/api/candidate/<string:ucand>',methods=['PUT','DELETE'])
def updatedeletecand(ucand):
    cand = db.session.query(Candidate).filter_by(cand_uname=ucand).first()
    if request.method=='DELETE':
        print(cand)
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
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
