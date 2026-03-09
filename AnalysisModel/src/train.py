# src/train.py

import os
import json
import joblib
from sklearn.metrics import classification_report, confusion_matrix

from config import MODEL_PATH, REPORT_DIR
from preprocess import prepare_training_data
from model import build_xgb_model

# 1. DATA PIPELINE
# Hand over all preprocessing, vectorizing, and splitting to the Data Transformer
X_train_vec, X_test_vec, y_train, y_test, vectorizer = prepare_training_data()

# 2. TRAIN MODEL
print("Training XGBoost Classifier...")
xgb_model = build_xgb_model()
xgb_model.fit(X_train_vec, y_train)

# 3. EVALUATION
print("Evaluating model...")
y_pred = xgb_model.predict(X_test_vec)
report = classification_report(y_test, y_pred, output_dict=True)

print(classification_report(y_test, y_pred))

with open(os.path.join(REPORT_DIR, "metrics.json"), "w") as f:
    json.dump(report, f, indent=2)
    
# 4. EXPLAINABLE AI (Feature Importances)
print("Extracting top feature importances...")
feature_names = vectorizer.get_feature_names_out().tolist()
importances = xgb_model.feature_importances_

feat_imp = dict(zip(feature_names, importances))
sorted_feat_imp = {k: float(v) for k, v in sorted(feat_imp.items(), key=lambda item: item[1], reverse=True)[:50]}

with open(os.path.join(REPORT_DIR, "top_features.json"), "w") as f:
    json.dump(sorted_feat_imp, f, indent=2)

# 5. SAVE MODEL
print("Saving trained model...")
joblib.dump(xgb_model, MODEL_PATH)
print("Training complete.")
