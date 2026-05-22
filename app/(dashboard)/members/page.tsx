"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  X,
  CheckCircle2,
  Search,
  Wallet,
  UserCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { members as initialMembers } from "@/lib/mock-data";

type Member = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gender: string;
  dob?: string;
  address?: string;
  plan: string;
  start: string;
  end: string;
  amount: string;
  paymentMode: "Cash" | "Waafi" | "Carte";
  emergencyContact?: string;
  notes?: string;
  status: string;
};

const defaultForm = {
  name: "",
  phone: "",
  email: "",
  gender: "",
  dob: "",
  address: "",
  plan: "",
  start: "",
  end: "",
  amount: "",
  paymentMode: "Cash" as "Cash" | "Waafi" | "Carte",
  emergencyContact: "",
  notes: "",
};

export default function Members() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [localMembers, setLocalMembers] = useState<Member[]>(
    initialMembers.map((m) => ({
      ...m,
      gender: "Non défini",
      amount: "0",
      paymentMode: "Cash",
    }))
  );

  const filtered = useMemo(
    () =>
      localMembers.filter((m) =>
        `${m.name} ${m.phone} ${m.plan}`
          .toLowerCase()
          .includes(query.toLowerCase().trim())
      ),
    [localMembers, query]
  );

  const saveMember = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.gender ||
      !form.plan ||
      !form.start ||
      !form.end ||
      !form.amount
    ) {
      return;
    }

    const nextMember: Member = {
      id: `m${Date.now()}`,
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      gender: form.gender,
      dob: form.dob || undefined,
      address: form.address || undefined,
      plan: form.plan,
      start: form.start,
      end: form.end,
      amount: form.amount,
      paymentMode: form.paymentMode,
      emergencyContact: form.emergencyContact || undefined,
      notes: form.notes || undefined,
      status: "Active",
    };

    setLocalMembers((prev) => [nextMember, ...prev]);
    setOpen(false);
    setForm(defaultForm);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-[#123126] px-4 py-3 text-sm text-primary shadow-soft"
          >
            <CheckCircle2 className="h-4 w-4" /> Abonné ajouté avec succès
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Members</h1>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-black transition hover:opacity-90"
          >
            <UserPlus className="h-4 w-4" /> Ajouter un abonné
          </button>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-bg px-3 py-2">
          <Search className="h-4 w-4 text-secondaryText" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Search members"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-secondaryText">
              <tr>
                {["Profile", "Name", "Phone", "Plan", "Start", "End", "Status", "Actions"].map((h) => (
                  <th key={h} className="p-2 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-t border-white/10">
                  <td className="p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <UserCircle2 className="h-5 w-5 text-primary" />
                    </div>
                  </td>
                  <td className="p-2">{m.name}</td>
                  <td>{m.phone}</td>
                  <td>{m.plan}</td>
                  <td>{m.start}</td>
                  <td>{m.end}</td>
                  <td>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{m.status}</span>
                  </td>
                  <td className="space-x-2">
                    <Link href={`/members/${m.id}`}>View</Link>
                    <button>Renew</button>
                    <button>SMS</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="z-50 w-full max-w-3xl rounded-2xl border border-white/10 bg-card p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Nouvel abonné</h2>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-white/10">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["Nom complet", "name", true],
                  ["Téléphone WhatsApp", "phone", true],
                  ["Email", "email", false],
                  ["Sexe", "gender", true],
                  ["Date de naissance", "dob", false],
                  ["Adresse", "address", false],
                  ["Type d’abonnement", "plan", true],
                  ["Date de début", "start", true],
                  ["Date de fin", "end", true],
                  ["Montant payé", "amount", true],
                  ["Contact d’urgence", "emergencyContact", false],
                ].map(([label, key, required]) => (
                  <label key={key} className="space-y-1 text-sm">
                    <span className="text-secondaryText">{label}{required ? " *" : ""}</span>
                    <input
                      type={key.toString().includes("date") || key === "dob" || key === "start" || key === "end" ? "date" : key === "amount" ? "number" : "text"}
                      value={(form as any)[key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-bg px-3 py-2 outline-none focus:border-primary/40"
                    />
                  </label>
                ))}

                <label className="space-y-1 text-sm">
                  <span className="text-secondaryText">Mode de paiement *</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Cash", "Waafi", "Carte"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, paymentMode: mode }))}
                        className={`rounded-xl border px-3 py-2 text-sm ${
                          form.paymentMode === mode
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-white/10 bg-bg"
                        }`}
                      >
                        <Wallet className="mr-1 inline h-4 w-4" /> {mode}
                      </button>
                    ))}
                  </div>
                </label>

                <label className="space-y-1 text-sm md:col-span-2">
                  <span className="text-secondaryText">Notes</span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    className="h-24 w-full rounded-xl border border-white/10 bg-bg px-3 py-2 outline-none"
                  />
                </label>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={saveMember}
                  className="rounded-xl bg-primary px-4 py-2 font-medium text-black"
                >
                  Enregistrer l’abonné
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
