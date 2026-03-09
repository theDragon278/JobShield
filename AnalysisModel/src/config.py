import os

# PATH CONFIGURATION 
DATA_DIR = "data"
MODEL_DIR = "models"
REPORT_DIR = "reports"

DATA_PATH = os.path.join(DATA_DIR, "real_or_fake_jobs.csv")
CLEAN_PATH = os.path.join(DATA_DIR, "cleaned_jobs.csv")

VECTORIZER_PATH = os.path.join(MODEL_DIR, "vectorizer.joblib")
MODEL_PATH = os.path.join(MODEL_DIR, "xgb_model.joblib")

X_TRAIN_VEC_PATH = os.path.join(DATA_DIR,"X_train_vec.joblib")
X_TEST_VEC_PATH = os.path.join(DATA_DIR,"X_test_vec.joblib")
Y_TRAIN_PATH = os.path.join(DATA_DIR,"y_train.joblib")
Y_TEST_PATH = os.path.join(DATA_DIR,"y_test.joblib")

# FEATURE CONFIGURATION
TEXT_COLS = [
    "title", "description", "requirements",
    "company_profile", "benefits",
    "industry", "employment_type",
    "location", "salary_range"
]


# PREDICTION RULES
RULES = {
    "payment_request": ["registration fee", "training fee", "pay upfront"],
    "whatsapp_only": ["whatsapp only"],
    "personal_info": ["aadhaar", "pan", "bank account", "credit card"],
    "urgency": ["urgent hiring", "limited slots", "act now"]
}

RULE_WEIGHTS = {
    "payment_request": 0.4,
    "whatsapp_only": 0.3,
    "personal_info": 0.5,
    "urgency": 0.2
}

PREDICTION_THRESHOLD = 0.6
