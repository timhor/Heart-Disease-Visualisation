from flask import Blueprint

from ..util import cache

bp = Blueprint('stats', __name__, url_prefix='/stats')


@bp.route('/', methods=['GET'])
def get_stats():
    '''Get all the stats'''
    df = cache.get('df')
    if df is None:
        return "Dataframe has not been loaded", 404

    return df.to_json(orient='records')

@bp.route('/<stat>', methods=['GET'])
def get_stat(stat):
    '''Get a specific stat'''
    df = cache.get('df')
    if df is None:
        return "Dataframe has not been loaded", 404

    if stat == 'corr':
        return df.corr().to_json(orient='split')

    if stat not in df:
        return f"Invalid stat {stat} specified", 400

    return df[stat].to_json(orient='records')
