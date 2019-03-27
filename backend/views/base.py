from flask import Blueprint


bp = Blueprint('base', __name__, url_prefix='/')


@bp.route('/', methods=['GET'])
def index():
    return "HELLO WORLD"