# COMP9321 ASS 3 Backend

- [Get started](#get-started)
- [Run the application locally](#run-the-application-locally)
- [Current Routes](#current-routes)


## Get started

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

## Current Routes

Base route: /

To get all stats: /stats/

To get a specific stat: /stats/{stat}

#TODO other routes