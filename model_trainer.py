import warnings
import pickle

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier #for the model
from sklearn.metrics import accuracy_score, roc_curve, auc

from backend.util import clean_dataframe


if __name__ == '__main__':
    df = pd.read_csv('backend/resources/processed.cleveland.data')
    df = clean_dataframe(df)

    # Split categorical data
    df = pd.get_dummies(df)

    # Split Training & Test Set 80-20
    X_train, X_test, y_train, y_test = train_test_split(df.drop('target', 1), df['target'], test_size = .2, random_state=10)

    rf = RandomForestClassifier(max_depth=4,n_estimators=100)
    rf.fit(X_train, y_train)

    # Why max_depth = 4 is best
    warnings.filterwarnings("ignore", category=FutureWarning)
    max_depths = np.linspace(1, 15, 15, endpoint=True)
    train_results = []
    test_results = []
    for max_depth in max_depths:
        rf = RandomForestClassifier(max_depth=max_depth, n_jobs=-1)
        rf.fit(X_train, y_train)
        x_pred = rf.predict(X_train)
        false_positive_rate, true_positive_rate, thresholds = roc_curve(y_train, x_pred)
        roc_auc = auc(false_positive_rate, true_positive_rate)
        train_results.append(roc_auc)
        y_pred = rf.predict(X_test)
        false_positive_rate, true_positive_rate, thresholds = roc_curve(y_test, y_pred)
        roc_auc = auc(false_positive_rate, true_positive_rate)
        test_results.append(roc_auc)

    print("Train: {}".format(accuracy_score(y_train, x_pred)))
    print("Test: {}".format(accuracy_score(y_test, y_pred)))

    with open('rf_model.pkl', 'wb') as file:
        pickle.dump(rf, file)