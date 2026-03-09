// components/RiskBadge.jsx
import { AlertTriangle, ShieldCheck, XCircle } from "lucide-react";
import PropTypes from "prop-types";

export default function RiskBadge({ verdict, score }) {
  let color = "text-green-600";
  let bgColor = "bg-green-50";
  let borderColor = "border-green-600";
  let Icon = ShieldCheck;

  if (verdict === "SUSPICIOUS JOB") {
    color = "text-yellow-600";
    bgColor = "bg-yellow-50";
    borderColor = "border-yellow-600";
    Icon = AlertTriangle;
  }

  if (verdict === "FAKE JOB") {
    color = "text-red-600";
    bgColor = "bg-red-50";
    borderColor = "border-red-600";
    Icon = XCircle;
  }

  return (
    <div
      className={`border ${borderColor} ${bgColor} p-6 text-center shadow-[5px_5px_0px_0px_#6c6c6c]`}
    >
      <div
        className={`text-2xl font-semibold font-serif flex items-center justify-center gap-2 ${color}`}
      >
        <Icon /> {verdict}
      </div>
      <p className="text-gray-500 mt-2">
        Risk Score: {(score * 100).toFixed(1)}%
      </p>
    </div>
  );
}

RiskBadge.propTypes = {
  verdict: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
