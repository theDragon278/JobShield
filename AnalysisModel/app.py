import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# --- THE FIX ---
# Add the 'src' folder to Python's system path so the ML scripts 
# can find each other (config, preprocess, features, etc.)
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))

# Now we can safely import the prediction logic
from src.predict import predict_job

app = FastAPI(title="JobShield API")

print("--- JobShield API is initializing ---")

# Configure CORS to allow requests from your React (Vite) frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected JSON payload from React
class JobData(BaseModel):
    title: str = ""
    description: str = ""
    requirements: str = ""
    company_profile: str = ""
    location: str = ""
    salary_range: str = ""
    benefits: str = ""
    industry: str = ""
    employment_type: str = ""

@app.get("/")
def read_root():
    return {"status": "online", "message": "JobShield API is running"}

@app.post("/predict")
def predict_fraud(job: JobData):
    # Convert the received JSON data into a Python dictionary
    job_dict = job.model_dump()
    
    # Pass the dictionary to the ML model's prediction function
    result = predict_job(job_dict)
    
    return result

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)