"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { metrics,members } from "@/lib/mock-data";
import RevenueChart from "@/components/dashboard/revenue-chart";
export default function Dashboard(){return <div className="space-y-6 overflow-x-hidden"><h1 className="text-2xl font-bold sm:text-3xl">Gym Overview</h1><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{metrics.map((m,i)=><motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}} key={m.label}><Card><p className="text-sm text-secondaryText">{m.label}</p><p className="text-2xl font-bold">{m.value}</p><p className={`text-sm ${m.tone}`}>{m.change}</p></Card></motion.div>)}</div><div className="grid grid-cols-1 gap-4 lg:grid-cols-3"><Card className="min-h-[320px] lg:col-span-2"><h2 className="mb-3 font-semibold">Revenue Trend</h2><RevenueChart/></Card><Card><h2 className="mb-3 font-semibold">Recent Activity</h2><div className="space-y-3">{members.slice(0,5).map(m=><div key={m.id} className="rounded-xl bg-bg p-3 text-sm">{m.name} checked in</div>)}</div></Card></div></div>}
