# src/predict.py

import joblib
import numpy as np
import re # <-- Added back for our regex fix
from config import MODEL_PATH, VECTORIZER_PATH, TEXT_COLS, RULES, RULE_WEIGHTS, PREDICTION_THRESHOLD
from preprocess import preprocess_text

# Load once when module is imported
xgb_model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

def keyword_risks(text: str):
    """
    Applies custom rule-based scoring based on explicit scam keywords defined in config.py
    """
    lower = text.lower()
    score = 0.0
    triggered = []

    for rule_name, keywords in RULES.items():
        for kw in keywords:
            # OUR FIX: Regex word boundaries to prevent substring matching
            pattern = rf"\b{re.escape(kw)}\b" 
            if re.search(pattern, lower):
                score += RULE_WEIGHTS[rule_name]
                triggered.append(rule_name)
                break

    return min(score, 1.0), triggered

def predict_job(job_dict: dict, threshold: float = PREDICTION_THRESHOLD):
    """
    Predicts whether a job is FAKE or REAL based on the trained XGBoost model and rules.
    """
    # 1. Prepare raw text
    raw_text = " ".join(str(job_dict.get(col, "")) for col in TEXT_COLS)

    # 2. Text preprocessing and TF-IDF vectorization
    cleaned_text = preprocess_text(raw_text)
    text_vec = vectorizer.transform([cleaned_text])

    # 3. Predict
    try:
        model_prob = xgb_model.predict_proba(text_vec)[0][1]
    except Exception as e:
        print(f"Warning: XGBoost prediction failed: {e}")
        model_prob = 0.0
        
    rule_score, triggered = keyword_risks(cleaned_text)

    # 5. Hybrid Scoring
    # OUR FIX: Direct additive penalty instead of weighted average
    final_score = min(float(model_prob + rule_score), 1.0) 
    label = "FAKE" if final_score > threshold else "REAL"

    return {
        "model_probability": round(float(model_prob), 4),
        "rule_score": round(float(rule_score), 4),
        "final_score": round(float(final_score), 4),
        "prediction": label,
        "triggered_rules": triggered
   }