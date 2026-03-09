// src/utils/constants.js

// Derives a human-readable verdict from the API's prediction + final_score
export const getVerdict = (prediction, score) => {
  if (prediction === "FAKE") return "FAKE JOB";
  if (score >= 0.35) return "SUSPICIOUS JOB";
  return "REAL JOB";
};

export const sampleFakeJob = {
  title: "Work from Home Data Entry",
  description: "Earn 5000 per day. Registration fee required.",
  requirements: "Basic typing skills",
  company_profile: "",
  location: "",
  salary_range: "",
  benefits: "",
  industry: "",
  employment_type: "",
};

export const sampleRealJob = {
  title: "Frontend React Developer",
  description:
    "We are hiring a frontend developer to build and maintain production React applications with cross-functional teams.",
  requirements:
    "3+ years with React, JavaScript, REST APIs, Git, and strong debugging skills.",
  company_profile:
    "Established SaaS company serving enterprise clients with a distributed engineering team.",
  location: "Bangalore, India",
  salary_range: "12-18 LPA",
  benefits:
    "Health insurance, paid leave, learning budget, flexible work hours",
  industry: "Software",
  employment_type: "Full-time",
};

export const TestimonialData = [
  {
    id: 1,
    name: "John Doe",
    designation: "Designer",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROchnAt5phJLErvsH-iztoEHUotE5VM_vuPw&s",
    text: "I almost paid a ₹2,500 'onboarding fee' for a remote data entry job I found on Telegram. I plugged the text into JobShield and the gauge instantly hit the red 'High Risk' zone because it caught the hidden payment request. It literally saved my money! Thank you for building this.",
    delay: 0.2,
  },
  {
    id: 2,
    name: "Alex",
    designation: "Developer",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZvHgD9uQ6HWOCUVrzXk8sYoHkqXI-Qxz8iQ&s",
    text: "The UX is incredibly smooth. I tested it with a legitimate startup job that didn't have a lot of info filled out. Instead of blindly calling it a scam, it accurately labeled it 'Suspicious' and advised caution. The machine learning model is tuned really well.",
    delay: 0.4,
  },
  {
    id: 3,
    name: "George",
    designation: "Manager",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6KyYjmQeFFxAhRikCf2-BJsZOFOe5UMJxHw&s",
    text: "As a recruiter, it breaks my heart seeing freshers get scammed by fake agencies using our company's name. I tested JobShield with some of the scam emails candidates have forwarded to us, and the AI caught every single one of them. This is an essential tool for any job hunter today.",
    delay: 0.6,
  },
];
