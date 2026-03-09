# 🛡️ JobShield — AI-Powered Job Scam Detection Platform

![Python](https://img.shields.io/badge/Python-3.10-blue)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![License](https://img.shields.io/badge/License-MIT-green)

**JobShield** is a full-stack web application designed to **analyze job postings and detect potential scams or fraudulent listings**.

The platform uses a **hybrid risk scoring engine** that combines:

* 🤖 **Machine Learning predictions**
* 🔍 **Regex-based security rules**
* 📊 **Transparent scoring logic**

to produce a **clear and reliable risk score** for each job posting.

---

# 📌 Features

* 🧠 **Machine Learning Scam Detection**
* 🔍 **Pattern & Regex Security Checks**
* 📊 **Transparent Risk Score Output**
* ⚡ **Fast API backend using FastAPI**
* 🎨 **Modern React UI with TailwindCSS**
* 🧾 **Explainable detection results**

---

# 🏗️ Tech Stack

### Frontend

* **React (Vite)**
* **TailwindCSS**
* **Lucide Icons**

### Backend

* **Python**
* **FastAPI**
* **Uvicorn**
* **Pydantic**

### Machine Learning

* **XGBoost Classifier**
* **Scikit-learn (TF-IDF Vectorizer)**
* **SpaCy NLP (`en_core_web_sm`)**
* **Pandas**

---

# 📂 Project Structure

```
JobShield
│
├── AnalysisModel
│   ├── app.py
│   ├── model/
│   ├── data/
│   ├── requirements.txt
│
├── JobShield-FrontEnd
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

# 🚀 Getting Started

Because **Python virtual environments and Node modules are OS-specific**, they must be installed locally.

## Prerequisites

Make sure the following are installed:

* **Node.js (v18 or higher)**
* **Python 3.10**
* **Git**

Python 3.10 is recommended to avoid compatibility issues with **SpaCy and Pydantic**.

---

# 📥 1. Clone the Repository

```bash
git clone https://github.com/theDragon278/JobShield.git
cd JobShield
```

---

# ⚙️ 2. Backend Setup (FastAPI)

//ADD THE DATASET IN /AnalysisModel/data/.csv

Navigate to the ML backend folder:

```bash
cd AnalysisModel
```

### Create a virtual environment

```bash
python -m venv .venv
```

### Activate the environment

**Windows (Command Prompt)**

```
.venv\Scripts\activate.bat
```

**Windows (PowerShell)**

```
.venv\Scripts\Activate.ps1
```

### Install dependencies

```bash
pip install -r requirements.txt
pip install fastapi uvicorn pydantic
```

### Download SpaCy model

```bash
python -m spacy download en_core_web_sm
```

### Start the backend server

```bash
uvicorn app:app --reload
```

The backend will run at:

```
http://localhost:8000
```

---

# 🎨 3. Frontend Setup (React + Vite)

Navigate to the frontend folder:

```bash
cd JobShield-FrontEnd
```

### Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a file named **`.env`** inside the frontend root folder.

```
VITE_API_URL=http://localhost:8000
```

---

# ▶️ Run the Frontend

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

# 🧠 How the Detection Works

JobShield combines **two detection approaches**:

### 1️⃣ Machine Learning Model

The ML model analyzes job descriptions using:

* TF-IDF text vectorization
* XGBoost classification

to detect suspicious patterns.

### 2️⃣ Rule-Based Detection

Additional **regex security rules** detect:

* Suspicious payment requests
* Fake recruiter language
* Scam-like patterns

### Final Output

Both systems contribute to a **combined risk score** that classifies the job posting as:

* 🟢 Safe
* 🟡 Suspicious
* 🔴 Potential Scam

---

# 📌 Future Improvements

* Browser extension for scam detection
* Chrome job-site integration
* Improved ML model accuracy
* More explainable AI features
* Public dataset integration

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Ambarish Behera**

MERN Developer • Machine Learning Enthusiast
GitHub: https://github.com/theDragon278
