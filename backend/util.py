import pandas as pd
import numpy as np

CATEGORICAL_MAPPING = {
    'sex': {
        0: 'M',
        1: 'F'
    },
    'cp': {
        1: 'typical anigma',
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
        0: '< 120mg/ml',
        1: '> 120mg/ml'
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

        # TODO: Clean this up to use the mapping above
        df['sex'][df['sex'] == 0] = 'F'
        df['sex'][df['sex'] == 1.0] = 'M'
        df['sex'].astype(object)

        df['cp'][df['cp'] == 1] = 'typical angina'
        df['cp'][df['cp'] == 2] = 'atypical angina'
        df['cp'][df['cp'] == 3] = 'non-anginal pain'
        df['cp'][df['cp'] == 4] = 'asymptomatic'
        df['cp'].astype(object)

        df['thal'][df['thal'] == 3] = 'normal'
        df['thal'][df['thal'] == 6] = 'fixed defect'
        df['thal'][df['thal'] == 7] = 'reversable defect'
        df['thal'].astype(object)

        df['fbs'][df['fbs'] == 0] = '< 120mg/ml'
        df['fbs'][df['fbs'] == 1] = '> 120mg/ml'

        df['exang'][df['exang'] == 0] = 'no'
        df['exang'][df['exang'] == 1] = 'yes'

        if include_target:
            df['target'] = df['target'].replace([2,3,4],1)
            df['target'] = df['target'].astype(int)

        df['slope'][df['slope'] == 1.0] = 'up'
        df['slope'][df['slope'] == 2.0] = 'flat'
        df['slope'][df['slope'] == 3.0] = 'down'
        df['slope'].astype(object)

        df['restecg'][df['restecg'] == 0] = 'normal'
        df['restecg'][df['restecg'] == 1] = 'ST-T wave abnormality'
        df['restecg'][df['restecg'] == 2] = 'left ventricular hypertrophy'
        df['restecg'].astype(object)
    return df
