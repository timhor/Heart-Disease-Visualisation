# COMP9321 ASS 3 Backend

- [Get started](#get-started)
- [Run the application locally](#run-the-application-locally)
- [Current Routes](#current-routes)


## Get started
Install the requirements in a virtual environment using the `requirements.txt` in the root folder of the project (`..`).

```bash
$ virtualenv --python=`which python3` venv
$ source ./venv/bin/activate
$ pip install -r requirements.txt
```

## Run the application locally

```bash
$ export FLASK_DEBUG=1
$ export FLASK_APP=app.py
$ flask run
```

Or more simply, `bash run.sh`.

## Current Routes

Base route: /

To get all stats: /stats/

To get a specific stat: /stats/{stat}

To do a prediction: /prediction
The following are **ALL** required GET parameters:
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

The expected values are akin to what is expected in the [UCI Heart Disease Archive](https://archive.ics.uci.edu/ml/datasets/heart+Disease)
