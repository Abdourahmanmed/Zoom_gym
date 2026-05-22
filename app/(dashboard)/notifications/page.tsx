"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MessageCircle, BellRing, CheckCheck } from "lucide-react";

type AlertItem = {
  id: string;
  title: string;
  message: string;
  status: "Pending" | "Sent" | "Resolved";
};

export default function Notifications() {
  const [toast, setToast] = useState(false);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "a1",
      title: "Membership expiring soon",
      message:
        "Hello Ahmed Hassan, your Zoom Gym membership expires in 3 days. Please renew to continue your sessions. Monthly plan renewal: 5,000 DJF.",
      status: "Pending",
    },
    {
      id: "a2",
      title: "Membership expired",
      message:
        "Hello Fatouma Ali, your Zoom Gym membership has expired. Please visit reception to renew. 3 Months plan: 13,500 DJF.",
      status: "Pending",
    },
    {
      id: "a3",
      title: "Owner notification",
      message: "Ahmed Hassan expires in 3 days. Phone: +253 77 XX XX XX. Suggested renewal: 5,000 DJF.",
      status: "Pending",
    },
  ]);

  const sendWhatsApp = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Sent" } : a)));
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-[#123126] px-4 py-3 text-sm text-primary shadow-soft">
            <CheckCircle2 className="h-4 w-4" /> Simulated WhatsApp notification sent
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><h2 className="font-semibold">Expiring Memberships</h2><p className="text-secondaryText">43 members expiring within 7 days.</p></Card>
        <Card><h2 className="font-semibold">Unpaid Memberships</h2><p className="text-secondaryText">12 pending payments.</p></Card>
        <Card><h2 className="font-semibold">WhatsApp Reminders Queue</h2><p className="text-secondaryText">18 reminders queued.</p></Card>
        <Card><h2 className="font-semibold">Sent History</h2><p className="text-secondaryText">Last sent: Today at 9:30 AM.</p></Card>
      </div>

      <Card className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <BellRing className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Automatic WhatsApp Alerts</h2>
        </div>
        <div className="grid gap-3">
          {alerts.map((alert) => (
            <motion.div key={alert.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-white/10 bg-bg p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="font-medium">{alert.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs">{alert.status}</span>
              </div>
              <p className="mb-4 text-sm text-secondaryText">{alert.message}</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => sendWhatsApp(alert.id)} className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-black"><MessageCircle className="mr-1 inline h-4 w-4" /> Send WhatsApp</button>
                <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"><BellRing className="mr-1 inline h-4 w-4" /> Schedule reminder</button>
                <button onClick={() => setAlerts((prev) => prev.map((a) => (a.id === alert.id ? { ...a, status: "Resolved" } : a)))} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"><CheckCheck className="mr-1 inline h-4 w-4" /> Mark as resolved</button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
