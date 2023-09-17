import os

from flask import Flask, flash, redirect, render_template, url_for, session
from flask_login import login_user, login_required, LoginManager, current_user, UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo


basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, template_folder='./templates')
app.config['SECRET_KEY'] = 'my_secret_key'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(80), unique = True, nullable = False)
  email = db.Column(db.String(120), unique = True, nullable = False)
  password = db.Column(db.String(120), nullable = False)

  def set_password(self, password):
    self.password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)


class Event():
  def __init__(self, date="2024-01-01", time="00:00", coordinator="Me", cost="Free", 
               contact="123-456-7890", location="Unspecified", rsvpBy="None", invitees=[], tags=None):
    self.date = date
    self.time = time
    self.coordinator = coordinator
    self.cost = cost
    self.contact = contact
    self.location = location
    self.rsvpBy = rsvpBy
    if invitees == None:
       self.invitees = []
    else:
      self.invitees = invitees
    if tags == None:
      self.tags = []
    else:
       self.tags = tags
    self.tags = tags


class SignUpForm(FlaskForm):
  username = StringField('Username', validators=[DataRequired()])
  email = StringField('Email', validators=[DataRequired(), Email()])
  password = PasswordField('Password', validators=[DataRequired()])
  confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
  submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
  

@app.route("/")
def home():
   session.get('user_id')
   return render_template("home.html")


@app.route("/dashboard")
@login_required
def dashboard():
  return render_template("dashboard.html")


@app.route("/signup", methods = ['GET','POST'])
def signup():
  form = SignUpForm()
  if form.validate_on_submit():
    user = User(username=form.username.data, email=form.email.data)
    user.set_password(form.password.data)
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return redirect(url_for('login'))
  return render_template('signup.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
      user = User.query.filter_by(email=form.email.data).first()
      if user and user.check_password(form.password.data):
        login_user(user)

        session['user_name'] = user.username
        session['user_email'] = user.email

        return redirect(url_for('dashboard'))
      flash('Invalid email or password', 'danger')
    return render_template('login.html', form=form)

@app.route('/new-event', methods=['GET'])
def new_event():
   return render_template("newevent.html")


@app.route('/about')
def about():
   return render_template('about.html')


@app.route('/profile')
def profile():
   return render_template('profile.html')


@app.route('/logout')
def logout():
    # Clear the session data
    session.clear()  # or session['user_id'] = None, etc.
    return redirect(url_for('home'))


@app.route('/friends')
def friends():
   return render_template('user-friends.html')


if __name__ == "__main__":
  app.run() 