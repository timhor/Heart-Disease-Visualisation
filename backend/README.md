# Backend

## Getting started

Install the requirements in a virtual environment using the `requirements.txt` in the root folder of the project (`..`).

```bash
$ virtualenv --python=`which python3` venv
$ source ./venv/bin/activate
$ pip install -r requirements.txt
```

## Running the application locally

```bash
$ export FLASK_DEBUG=1
$ export FLASK_APP=app.py
$ flask run
```

Or more simply, within the virtual environment, type `bash run.sh`.

## Current routes

- Base route: `/`
- To get all stats: `/stats`
- To get a specific stat: `/stats/{tat}`
- To do a prediction: `/prediction`

## Making a prediction

The following are **all** required `GET` parameters:

- age
- sex
- cp
- trestbps
- chol
- fbs
- restecg
- thalacb
- exang
- oldpeak
- slope
- ca
- thal

The expected values are akin to what is expected in the [UCI Heart Disease Archive](https://archive.ics.uci.edu/ml/datasets/heart+Disease).
