import { useEffect, useState } from "react";
import { API_BASE } from "../config";

type SummaryItem = {
  id: number;
  name: string;
  balance: number;
};

const SUMMARY_API = `${API_BASE}/api/summary`;

export default function SummaryView() {
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch(SUMMARY_API);
      const data = await res.json();
      setSummary(data);
      setLoading(false);
    };
    fetchSummary();
  }, []);

  if (loading) return <div>Loading summary...</div>;

  return (
    <div>
      <h2>Summary</h2>
      <ul>
        {summary.map((item) => (
          <li key={item.id}>
            {item.name}:{" "}
            <span style={{ color: item.balance < 0 ? "#e53935" : "#43a047" }}>
              {item.balance < 0 ? "owes" : "is owed"} €{Math.abs(item.balance).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}