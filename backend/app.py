import os
import pickle
import pandas as pd
import numpy as np

from flask import Flask, g
from flask_cors import CORS
from .stats import views as stats_views
from .views import base
from .config import DATA_FILE, TRAINED_MODEL
from .util import clean_dataframe


def load_data():
    print("Loading data")
    df = pd.read_csv(DATA_FILE)
    df = clean_dataframe(df)
    g.df = df

    with open(TRAINED_MODEL, 'rb') as file:
        g.model = pickle.load(file)


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

    # Loads the data for every request
    # TODO can we figure out a better way to load only once?
    # before_first_request didn't work well with flask.g
    app.before_request(load_data)

    return app

application = create_app()
CORS(application)
