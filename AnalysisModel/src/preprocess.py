# src/preprocess.py

import os
import re
import nltk
import spacy
import joblib
import pandas as pd
from scipy.sparse import hstack
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from config import *

nlp = spacy.load("en_core_web_sm")

try:
    STOP = set(stopwords.words('english'))
except:
    nltk.download('stopwords')
    STOP = set(stopwords.words('english'))

# Regular Expressions convert large texts into simpler words like: url, email, money 
def clean_text(text: str) -> str:
    text = text or ""
    text = re.sub(r"http\S+|www\.\S+", " url ", text)
    text = re.sub(r"\S+@\S+", " email ", text)
    text = re.sub(r"\$?\d+(?:,\d{3})*(?:\.\d+)?", " money ", text)
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip().lower()
    return text

# SpaCy performs: Tokenization, POS tagging, Lemmatization, Stopword detection, Punctuation detection
def lemmatize(text: str) -> str:
    doc = nlp(text)
    tokens = []
    for t in doc:
        if t.is_stop or t.is_punct or t.like_num:
            continue
        lemma = t.lemma_.strip()
        if lemma and lemma not in STOP:
            tokens.append(lemma)
    return " ".join(tokens)


def preprocess_text(text: str) -> str:
    return lemmatize(clean_text(text))

def prepare_training_data():
    """
    Acts as the complete Data Transformation Pipeline.
    Loads raw data, cleans it, extracts meta-features, vectorizes it, and saves cache.
    Returns the final mathematical matrices ready for XGBoost.
    """
    os.makedirs(MODEL_DIR, exist_ok=True)
    os.makedirs(REPORT_DIR, exist_ok=True)
    os.makedirs(DATA_DIR, exist_ok=True)

    if os.path.exists(CLEAN_PATH):
        print("Loading cached preprocessed dataset...")
        df = pd.read_csv(CLEAN_PATH)
    else:
        print("Preprocessing dataset with spaCy (runs only once)...")
        df = pd.read_csv(DATA_PATH)
        df[TEXT_COLS] = df[TEXT_COLS].fillna("")
        df["text_raw"] = df[TEXT_COLS].agg(" ".join, axis=1)
        df["text"] = df["text_raw"]

        df["text"] = df["text"].apply(preprocess_text)

        df.to_csv(CLEAN_PATH, index=False)
        print("Saved cleaned dataset.")


    X = df["text"]
    y = df["fraudulent"]

    if os.path.exists(X_TRAIN_VEC_PATH) and os.path.exists(VECTORIZER_PATH):
        print("Loading cached vectorized data...")
        X_train_vec = joblib.load(X_TRAIN_VEC_PATH)
        X_test_vec = joblib.load(X_TEST_VEC_PATH)
        y_train = joblib.load(Y_TRAIN_PATH)
        y_test = joblib.load(Y_TEST_PATH)
        vectorizer = joblib.load(VECTORIZER_PATH)
    else:
        print("Splitting dataset (70-30)...")
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.3, stratify=y, random_state=42
        )

        print("Vectorizing text...")
        vectorizer = TfidfVectorizer(max_features=20000, ngram_range=(1, 2), sublinear_tf=True)
        X_train_vec = vectorizer.fit_transform(X_train)
        X_test_vec = vectorizer.transform(X_test)

        print("Saving vectorized data...")
        joblib.dump(X_train_vec, X_TRAIN_VEC_PATH)
        joblib.dump(X_test_vec, X_TEST_VEC_PATH)
        joblib.dump(y_train, Y_TRAIN_PATH)
        joblib.dump(y_test, Y_TEST_PATH)
        joblib.dump(vectorizer, VECTORIZER_PATH)

    return X_train_vec, X_test_vec, y_train, y_test, vectorizer
