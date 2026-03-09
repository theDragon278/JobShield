import xgboost as xgb

def build_xgb_model():
    """
    Returns an untrained, configured XGBoost Classifier model.
    """
    return xgb.XGBClassifier(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=6,
        scale_pos_weight=15, # Approximating class imbalance
        random_state=42,
        n_jobs=-1
    )
