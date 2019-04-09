from flask import Blueprint, jsonify, request, render_template
import pandas as pd

from ..util import cache, clean_dataframe, CATEGORICAL_MAPPING

bp = Blueprint('prediction', __name__, url_prefix='/prediction')


@bp.route('/', methods=['GET'])
def get_stats():
    ''' Does the prediction '''
    model_df = cache.get('df')
    if model_df is None:
        return "Dataframe has not been loaded", 404

    model = cache.get('model')
    if model is None:
        return "Prediction model has not been loaded", 404

    attributes = [
        'age', 'sex', 'cp', 'trestbps',
        'chol', 'fbs', 'restecg', 'thalach',
        'exang', 'oldpeak', 'slope', 'ca', 'thal'
        ]
    if len(request.args) == 0:
        return render_template('prediction.html', attributes=attributes, categories=CATEGORICAL_MAPPING)
    # Example: http://localhost:5000/stats/prediction?age=25&sex=1.0&cp=1&trestbps=3.0&chol=5&fbs=0&restecg=0&thalach=8&exang=1&oldpeak=0.1&slope=1.0&ca=12&thal=3.0&target=14
    df_dict = {}
    try:
        for i in attributes:
            df_dict[i] = [float(request.args[i])]
    except (KeyError, ValueError):
        return 'Not ok', 500

    for k, v in df_dict.items():
        if k in CATEGORICAL_MAPPING and v[0] not in CATEGORICAL_MAPPING[k]:
            return 'BAAAADDDDD'


    df = pd.DataFrame.from_dict(df_dict)
    df = clean_dataframe(df, False)
    df = pd.concat([model_df, df], join='inner', ignore_index=True)
    df = pd.get_dummies(df)

    prediction = model.predict(df.tail(1))

    return jsonify({'target': int(prediction[0])})
