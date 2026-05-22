"use client";
import Link from "next/link";
import { Bell, Dumbbell, LayoutDashboard, Users, CreditCard, Calendar, Settings, MessageCircle, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
const nav = [{href:"/dashboard",label:"Dashboard",icon:LayoutDashboard},{href:"/members",label:"Members",icon:Users},{href:"/plans",label:"Plans",icon:CreditCard},{href:"/attendance",label:"Attendance",icon:Calendar},{href:"/notifications",label:"Notifications",icon:MessageCircle},{href:"/settings",label:"Settings",icon:Settings}];
export function Shell({children}:{children:React.ReactNode}){
const p=usePathname();
const [drawerOpen,setDrawerOpen]=useState(false);
const navLinks = <>{nav.map(n=><Link onClick={()=>setDrawerOpen(false)} key={n.href} href={n.href} className={`mb-2 flex items-center gap-2 rounded-xl px-3 py-2 ${p===n.href?"bg-primary/20 text-primary":"text-secondaryText hover:bg-white/5"}`}><n.icon size={16}/>{n.label}</Link>)}</>;
return <div className="min-h-screen lg:flex">
  {drawerOpen && <button aria-label="Close menu overlay" onClick={()=>setDrawerOpen(false)} className="fixed inset-0 z-40 bg-black/60 lg:hidden" />}
  <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-white/10 bg-card/90 p-4 backdrop-blur lg:block"><div className="mb-6 flex items-center gap-2 text-primary"><Dumbbell/> <span className="font-bold">Zoom Gym</span></div>{navLinks}</aside>
  <aside className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-white/10 bg-card/95 p-4 backdrop-blur transition-transform duration-200 lg:hidden ${drawerOpen?"translate-x-0":"-translate-x-full"}`}><div className="mb-6 flex items-center justify-between gap-2 text-primary"><div className="flex items-center gap-2"><Dumbbell/> <span className="font-bold">Zoom Gym</span></div><button onClick={()=>setDrawerOpen(false)} className="rounded-lg p-1 text-secondaryText hover:bg-white/10"><X size={18}/></button></div>{navLinks}</aside>
  <main className="w-full flex-1 p-3 sm:p-4 lg:ml-64 lg:p-8"><div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-card p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"><div className="flex items-center gap-2 sm:flex-1"><button onClick={()=>setDrawerOpen(true)} className="rounded-lg p-2 hover:bg-white/10 lg:hidden"><Menu className="text-secondaryText"/></button><input placeholder="Search members, plans..." className="w-full rounded-lg bg-bg px-3 py-2 text-sm sm:max-w-md"/></div><div className="flex shrink-0 items-center justify-end gap-3"><Bell className="text-secondaryText"/><div className="h-9 w-9 rounded-full bg-primary/30"/></div></div>{children}</main></div>}
