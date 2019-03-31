import os
import pandas as pd
import numpy as np

from flask import Flask
from .stats import views as stats_views
from .views import base
from .config import DATA_FILE

dataframe = None

# TODO
def clean_dataframe():
    global dataframe
    print(dataframe)
    pass

def load_data():
    global dataframe
    if not dataframe:
        print("Loading data")
        dataframe = pd.read_csv(DATA_FILE)
        clean_dataframe()
        

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # NOTE: Blueprints allow our flask app to be modular
    # rather than having all routes in one file. By registering
    # a blueprint we can have flask find all routes in the file
    # that is using the blueprint

    # Base route at / 
    app.register_blueprint(base.bp)

    # TODO register other blueprints here if needed

    # Blueprint for our /stats route
    app.register_blueprint(stats_views.bp)

    app.before_first_request(load_data)
    
    return app

application = create_app()
