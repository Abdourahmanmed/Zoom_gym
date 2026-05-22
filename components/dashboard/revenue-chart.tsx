"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueData } from "@/lib/mock-data";

const hasValidRevenueData = revenueData.length > 0 && revenueData.every((point) => point.month && typeof point.revenue === "number");

export default function RevenueChart() {
  if (!hasValidRevenueData) {
    return (
      <div className="h-[280px] w-full rounded-xl bg-bg p-4">
        <div className="mb-3 text-sm text-secondaryText">Revenue Trend (Fallback)</div>
        <div className="flex h-[220px] items-end gap-2">
          {[11200, 12800, 14100, 16700, 18640].map((value, index, arr) => (
            <div key={index} className="flex-1 rounded-t-md bg-primary/30" style={{ height: `${(value / Math.max(...arr)) * 100}%` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={revenueData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="month" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
