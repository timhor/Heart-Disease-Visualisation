import os
from backend.app import application

# Literally here because Michael is lazy
os.chdir('backend')
application.run(debug=True)