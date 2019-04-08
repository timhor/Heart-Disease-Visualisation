import pandas as pd
import numpy as np
from werkzeug.contrib.cache import SimpleCache

cache = SimpleCache(default_timeout=0)

CATEGORICAL_MAPPING = {
    'sex': {
        0: 'F',
        1: 'M'
    },
    'cp': {
        1: 'typical angina',
        2: 'atypical angina',
        3: 'non-anginal pain',
        4: 'asymptomatic'
    },
    'thal': {
        3: 'normal',
        6: 'fixed defect',
        7: 'reversable defect'
    },
    'fbs': {
        0: '<= 120mg/dl',
        1: '> 120mg/dl'
    },
    'exang': {
        0: 'no',
        1: 'yes'
    },
    'slope': {
        1: 'up',
        2: 'flat',
        3: 'down'
    },
    'restecg': {
        0: 'normal',
        1: 'ST-T wave abnormality',
        2: 'left ventricular hypertrophy'
    }
}


def clean_dataframe(df, include_target=True):
    with pd.option_context('mode.chained_assignment', None):
        df = df.replace('?', np.nan)
        df = df.dropna()

        df['ca'] = pd.to_numeric(df['ca']).astype(int)
        df['chol'] = pd.to_numeric(df['chol']).astype(int)
        df['age'] = pd.to_numeric(df['age']).astype(int)
        df['thalach'] = pd.to_numeric(df['thalach']).astype(int)
        df['trestbps'] = pd.to_numeric(df['trestbps']).astype(int)
        df['oldpeak'] = pd.to_numeric(df['oldpeak']).astype(float)
        df['thal'] = pd.to_numeric(df['thal']).astype(int)

        for cat, mapping in CATEGORICAL_MAPPING.items():
            for key, text in mapping.items():
                df[cat][df[cat] == key] = text
            df[cat].astype(object)

        if include_target:
            df['target'] = df['target'].replace([2,3,4],1)
            df['target'] = df['target'].astype(int)

    return df
