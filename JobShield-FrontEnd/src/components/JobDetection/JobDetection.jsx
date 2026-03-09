// JobDetection.jsx
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ResultSkeleton from "./ResultSkeleton";
import RiskBadge from "./RiskBadge";
import RiskGauge from "./RiskGauge";

// Import our externalized logic and test data
import {
  getVerdict,
  sampleFakeJob,
  sampleRealJob,
} from "../../utils/constants";

const JobDetection = () => {
  const initialFormState = {
    title: "",
    description: "",
    requirements: "",
    company_profile: "",
    location: "",
    salary_range: "",
    benefits: "",
    industry: "",
    employment_type: "",
  };

  const [form, setForm] = useState({ ...initialFormState });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm({ ...initialFormState });
    setResult(null);
    setError(null);
    setShowAdvanced(false);
  };

  const loadSample = (sample) => {
    setForm({ ...sample });
    setResult(null);
    setError(null);
    const hasAdvancedValues =
      sample.industry.trim() ||
      sample.employment_type.trim() ||
      sample.benefits.trim();
    setShowAdvanced(Boolean(hasAdvancedValues));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!form.title.trim() && !form.description.trim()) {
      setError("Please enter at least a Job Title or Job Description.");
      return;
    }

    setLoading(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      requirements: form.requirements.trim(),
      company_profile: form.company_profile.trim(),
      location: form.location.trim(),
      salary_range: form.salary_range.trim(),
      benefits: form.benefits.trim(),
      industry: form.industry.trim(),
      employment_type: form.employment_type.trim(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      setResult({
        verdict: getVerdict(data.prediction, data.final_score),
        score: data.final_score,
        model_probability: data.model_probability,
        rule_score: data.rule_score,
        triggered_rules: data.triggered_rules || [],
      });
    } catch (err) {
      setError(
        err.message.includes("Failed to fetch")
          ? "Could not connect to the server. Is the backend running on port 8000?"
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold font-serif text-center mb-4">
          Job Detection Scanner
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Analyze job listings to detect potential scams and fraudulent
          opportunities
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* FORM */}
          <div className="bg-white border border-black/30 shadow-[5px_5px_0px_0px_#6c6c6c] p-6 space-y-4">
            <h2 className="text-2xl font-semibold font-serif">Job Details</h2>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadSample(sampleFakeJob)}
                className="text-xs sm:text-sm px-3 py-1.5 border border-red-500 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-colors"
                disabled={loading}
              >
                Load Sample Fake Job
              </button>
              <button
                type="button"
                onClick={() => loadSample(sampleRealJob)}
                className="text-xs sm:text-sm px-3 py-1.5 border border-green-600 text-green-700 bg-green-50 hover:bg-green-700 hover:text-white transition-colors"
                disabled={loading}
              >
                Load Sample Real Job
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Job Title"
                className="w-full border border-black/30 px-4 py-3 focus:outline-none focus:border-black"
                onChange={handleChange}
                value={form.title}
                required
              />
              <textarea
                name="description"
                placeholder="Job Description"
                className="w-full border border-black/30 px-4 py-3 h-32 focus:outline-none focus:border-black"
                onChange={handleChange}
                value={form.description}
                required
              />
              <textarea
                name="requirements"
                placeholder="Requirements"
                className="w-full border border-black/30 px-4 py-3 h-24 focus:outline-none focus:border-black"
                onChange={handleChange}
                value={form.requirements}
              />
              <textarea
                name="company_profile"
                placeholder="Company Profile"
                className="w-full border border-black/30 px-4 py-3 h-24 focus:outline-none focus:border-black"
                onChange={handleChange}
                value={form.company_profile}
              />
              <input
                name="location"
                placeholder="Location"
                className="w-full border border-black/30 px-4 py-3 focus:outline-none focus:border-black"
                onChange={handleChange}
                value={form.location}
              />
              <input
                name="salary_range"
                placeholder="Salary Range"
                className="w-full border border-black/30 px-4 py-3 focus:outline-none focus:border-black"
                onChange={handleChange}
                value={form.salary_range}
              />

              <button
                type="button"
                className="w-full border border-black/30 px-4 py-3 font-medium flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setShowAdvanced((prev) => !prev)}
              >
                <span>Advanced Details (optional)</span>
                {showAdvanced ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {showAdvanced && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <input
                    name="industry"
                    placeholder="Industry"
                    className="w-full border border-black/30 px-4 py-3 focus:outline-none focus:border-black"
                    onChange={handleChange}
                    value={form.industry}
                  />
                  <input
                    name="employment_type"
                    placeholder="Employment Type"
                    className="w-full border border-black/30 px-4 py-3 focus:outline-none focus:border-black"
                    onChange={handleChange}
                    value={form.employment_type}
                  />
                  <textarea
                    name="benefits"
                    placeholder="Benefits"
                    className="w-full border border-black/30 px-4 py-3 h-24 focus:outline-none focus:border-black"
                    onChange={handleChange}
                    value={form.benefits}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="submit"
                  className={`w-full bg-black text-white py-3 font-semibold border border-black shadow-[5px_5px_0px_0px_#6c6c6c] hover:bg-white hover:text-black duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze Job"}
                </button>
                <button
                  type="button"
                  className="w-full bg-white text-black py-3 font-semibold border border-black shadow-[5px_5px_0px_0px_#6c6c6c] hover:bg-black hover:text-white duration-300"
                  onClick={handleClear}
                  disabled={loading}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* RESULT */}
          <div className="space-y-6">
            {loading && <ResultSkeleton />}

            {!loading && error && (
              <div className="border border-red-400 bg-red-50 p-4 text-red-600 text-sm flex items-start gap-2">
                <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {!loading && !result && !error && (
              <div className="border border-black/30 p-8 text-gray-500 bg-white text-center shadow-[5px_5px_0px_0px_#6c6c6c]">
                <p className="text-lg">
                  Enter job details to analyze fraud risk.
                </p>
              </div>
            )}

            {!loading && result && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <RiskBadge verdict={result.verdict} score={result.score} />

                <div className="bg-white border border-black/30 p-6 shadow-[5px_5px_0px_0px_#6c6c6c] space-y-2">
                  <h3 className="font-semibold font-serif text-xl mb-4">
                    Score Breakdown
                  </h3>
                  <RiskGauge score={result.score} />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model Probability:</span>
                      <span className="font-semibold">
                        {(result.model_probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rule-Based Penalty:</span>
                      <span className="font-semibold text-red-500">
                        +{(result.rule_score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-black/10 pt-2 mt-2">
                      <span className="text-gray-800 font-semibold">
                        Final Weighted Score:
                      </span>
                      <span className="font-bold text-lg">
                        {(result.score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-black/30 p-6 shadow-[5px_5px_0px_0px_#6c6c6c]">
                  <h3 className="font-semibold font-serif text-xl mb-4">
                    Why this result?
                  </h3>
                  {result.triggered_rules &&
                  result.triggered_rules.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        We detected the following suspicious patterns in the
                        text:
                      </p>
                      <ul className="list-disc list-inside text-sm text-red-600 space-y-1 font-medium">
                        {result.triggered_rules.map((r, i) => (
                          <li key={i} className="capitalize">
                            {r.replace(/_/g, " ")}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No hardcoded rule triggers detected. The verdict is based
                      on the AI model&apos;s analysis of the text patterns.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetection;
