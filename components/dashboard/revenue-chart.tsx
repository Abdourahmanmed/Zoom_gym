"use client";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueData } from "@/lib/mock-data";
export default function RevenueChart(){return <div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={revenueData}><XAxis dataKey="m" stroke="#94A3B8"/><YAxis stroke="#94A3B8"/><Tooltip/><Line type="monotone" dataKey="r" stroke="#22C55E" strokeWidth={3}/></LineChart></ResponsiveContainer></div>}
