"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MessageCircle, BellRing, CheckCheck } from "lucide-react";

type AlertItem = {
  id: string;
  title: string;
  message: string;
  status: "En attente" | "Envoyé" | "Traité";
};

export default function Notifications() {
  const [toast, setToast] = useState(false);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "a1",
      title: "Abonnement expire bientôt",
      message:
        "Bonjour Ahmed Hassan, votre abonnement Zoom Gym expire dans 3 jours. Merci de renouveler pour continuer vos séances.",
      status: "En attente",
    },
    {
      id: "a2",
      title: "Abonnement expiré",
      message:
        "Bonjour Fatouma Ali, votre abonnement Zoom Gym est expiré. Merci de passer à l’accueil pour renouveler.",
      status: "En attente",
    },
    {
      id: "a3",
      title: "Notification au propriétaire du gym",
      message: "Ahmed Hassan expire dans 3 jours. Téléphone : +253 77 XX XX XX.",
      status: "En attente",
    },
  ]);

  const sendWhatsApp = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Envoyé" } : a)));
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-[#123126] px-4 py-3 text-sm text-primary shadow-soft"
          >
            <CheckCircle2 className="h-4 w-4" /> Notification WhatsApp simulée envoyée
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 md:grid-cols-2">
        <Card><h2 className="font-semibold">Expiring Memberships</h2><p className="text-secondaryText">43 members expiring within 7 days.</p></Card>
        <Card><h2 className="font-semibold">Unpaid Memberships</h2><p className="text-secondaryText">12 pending payments.</p></Card>
        <Card><h2 className="font-semibold">SMS Reminders Queue</h2><p className="text-secondaryText">18 reminders queued.</p></Card>
        <Card><h2 className="font-semibold">Sent History</h2><p className="text-secondaryText">Last sent: Today at 9:30 AM.</p></Card>
      </div>

      <Card className="space-y-4">
        <div className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Alertes WhatsApp automatiques</h2>
        </div>
        <div className="grid gap-3">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/10 bg-bg p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="font-medium">{alert.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs">
                  {alert.status}
                </span>
              </div>
              <p className="mb-4 text-sm text-secondaryText">{alert.message}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => sendWhatsApp(alert.id)}
                  className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-black"
                >
                  <MessageCircle className="mr-1 inline h-4 w-4" /> Envoyer WhatsApp
                </button>
                <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <BellRing className="mr-1 inline h-4 w-4" /> Programmer rappel
                </button>
                <button
                  onClick={() =>
                    setAlerts((prev) =>
                      prev.map((a) => (a.id === alert.id ? { ...a, status: "Traité" } : a))
                    )
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  <CheckCheck className="mr-1 inline h-4 w-4" /> Marquer comme traité
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
