import os
import pickle
import pandas as pd
import numpy as np

from flask import Flask, g
from .stats import views as stats_views
from .views import base
from .config import DATA_FILE, TRAINED_MODEL


def clean_dataframe(df):
    with pd.option_context('mode.chained_assignment', None):
        df = df.replace('?', np.nan)
        df = df.dropna()

        df['ca'] = pd.to_numeric(df['ca']).astype(int)
        df['chol'] = pd.to_numeric(df['chol']).astype(int)
        df['age'] = pd.to_numeric(df['age']).astype(int)
        df['thalach'] = pd.to_numeric(df['thalach']).astype(int)
        df['trestbps'] = pd.to_numeric(df['trestbps']).astype(int)

        df['sex'][df['sex'] == 0] = 'F'
        df['sex'][df['sex'] == 1.0] = 'M'
        df['sex'].astype(object)

        df['cp'][df['cp'] == 1] = 'typical angina'
        df['cp'][df['cp'] == 2] = 'atypical angina'
        df['cp'][df['cp'] == 3] = 'non-anginal pain'
        df['cp'][df['cp'] == 4] = 'asymptomatic'
        df['cp'].astype(object)

        df['thal'][df['thal'] == '3.0'] = 'normal'
        df['thal'][df['thal'] == '6.0'] = 'fixed defect'
        df['thal'][df['thal'] == '7.0'] = 'reversable defect'
        df['thal'].astype(object)

        df['fbs'][df['fbs'] == 0] = '< 120mg/ml'
        df['fbs'][df['fbs'] == 1] = '> 120mg/ml'

        df['exang'][df['exang'] == 0] = 'no'
        df['exang'][df['exang'] == 1] = 'yes'

        df['target'] = df['target'].replace([2,3,4],1)
        df['target'] = df['target'].astype(int)

        df['slope'][df['slope'] == 1.0] = 'up'
        df['slope'][df['slope'] == 2.0] = 'flat'
        df['slope'][df['slope'] == 3.0] = 'down'
        df['slope'].astype(object)

        df['restecg'][df['restecg'] == 0] = 'normal'
        df['restecg'][df['restecg'] == 1] = 'ST-T wave abnormality'
        df['restecg'][df['restecg'] == 2] = 'left ventricular hypertrophy'
        df['restecg'].astype(object)
    return df


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

    app.before_first_request(load_data)

    return app

application = create_app()
