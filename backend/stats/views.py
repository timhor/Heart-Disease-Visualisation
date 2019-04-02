from flask import Blueprint, jsonify, g, request
import pandas as pd

from ..util import clean_dataframe

bp = Blueprint('stats', __name__, url_prefix='/stats')


@bp.route('/', methods=['GET'])
def get_stats():
    '''Get all the stats'''
    # TODO
    return "GET ALL STATS"

@bp.route('/<stat>', methods=['GET'])
def get_stat(stat):
    '''Get a specific stat'''
    # TODO
    return "GET STAT " + stat

# TODO
# Route that accepts user input and does machine learning
@bp.route('/prediction', methods=['GET'])
def prediction():
    # Example: http://localhost:5000/stats/prediction?age=25&sex=1.0&cp=1&trestbps=3.0&chol=5&fbs=0&restecg=0&thalach=8&exang=1&oldpeak=0.1&slope=1.0&ca=12&thal=3.0&target=14
    df_dict = {}
    try:
        attributes = [
            'age', 'sex', 'cp', 'trestbps',
            'chol', 'fbs', 'restecg', 'thalach',
            'exang', 'oldpeak', 'slope', 'ca', 'thal'
            ]
        for i in attributes:
            df_dict[i] = [float(request.args[i])]
    except KeyError:
        return 'Not ok', 500

    df = pd.DataFrame.from_dict(df_dict)
    df = clean_dataframe(df, False)
    df = pd.concat([g.df, df], join='inner', ignore_index=True)
    df = pd.get_dummies(df)

    model = g.model
    prediction = model.predict(df.tail(1))

    return jsonify({'target': int(prediction[0])})
