from flask import Blueprint, jsonify, g

bp = Blueprint('stats', __name__, url_prefix='/stats')


@bp.route('/', methods=['GET'])
def get_stats():
    '''Get all the stats'''
    if 'df' not in g:
        return "Dataframe has not been loaded", 404

    return jsonify(g.df.to_json(orient='records'))

@bp.route('/<stat>', methods=['GET'])
def get_stat(stat):
    '''Get a specific stat'''
    if 'df' not in g:
        return "Dataframe has not been loaded", 404
  
    if stat not in g.df:
        return f"Invalid stat {stat} specified", 400

    return jsonify(g.df[stat].to_json(orient='records'))

# TODO
# Route that accepts user input and does machine learning
@bp.route('/prediction', methods=['GET'])
def prediction():
    model = g.model

    return 'Some model magic'
