# Contents

## Backend
The folder with the backend module. Uses Flask. See the README inside the folder for more information.

## Frontend
The folder with the frontend module. Uses React. See the README inside the folder for more information.

## Other Files
- **EDA.ipynb**: Exploratory Data Analysis Notebook which explores the machine learning process to reach the final model.
- **model_trainer.py**: The final model generator. Running the file will reproduce a file called `rf_model.pkl` which is the model produced by the script, as well as output the testing and evaluation.
- **requirements.txt**: The requirements used in both the files mentioned above as well as the backend. Install requirements by the command `pip install -r requirements.txt`.

# Model Evaluation
The model is produced using a Random Forest Classifier with the following hyperparameters:
- Max Depth: 4
- \# of Estimators: 100

The choice of the each hyperparameter was determined through experimentation, with any depth greater than 4 did not provide any additional benefit, while the number of estimators was chosen as 100 as it adds in sufficient smoothing without underfitting overall.
