import { Card } from "@/components/ui/card";
import RevenueChart from "@/components/dashboard/revenue-chart";
import { members } from "@/lib/mock-data";
export default function Attendance(){return <div className="space-y-4"><h1 className="text-2xl font-bold">Attendance</h1><div className="grid gap-4 lg:grid-cols-3"><Card><p>Today's Attendance</p><p className="text-3xl font-bold">216</p><button className="mt-3 rounded-xl bg-primary/20 p-2">Manual Check-in</button></Card><Card className="lg:col-span-2"><h3>Attendance Trend</h3><RevenueChart/></Card></div><Card><h3 className="mb-2">Daily Check-ins</h3>{members.map(m=><div className="mb-2 rounded-lg bg-bg p-2" key={m.id}>{m.name} - 07:4{m.id.slice(1)} AM</div>)}</Card></div>}
