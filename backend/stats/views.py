from flask import Blueprint


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