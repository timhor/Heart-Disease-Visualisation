import os

from flask import Flask
from .stats import views as stats_views
from .views import base

def load_data():
    # TODO
    print("Loading data")

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

    app.before_request(load_data)
    
    return app

application = create_app()
