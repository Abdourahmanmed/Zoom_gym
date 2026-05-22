export const metrics = [
  { label: "Active Members", value: "1,284", change: "+12%", tone: "text-primary" },
  { label: "Expiring Memberships", value: "43", change: "Today", tone: "text-warning" },
  { label: "Revenue This Month", value: "$18,640", change: "+8.2%", tone: "text-primary" },
  { label: "New This Week", value: "37", change: "+6", tone: "text-primary" },
  { label: "Today's Attendance", value: "216", change: "Peak 6PM", tone: "text-secondaryText" }
];
export const members = ["Ahmed Hassan","Fatouma Ali","Youssouf Omar","Amina Ismail","Nimo Abdillahi","Abdi Warsame"].map((name,i)=>({id:`m${i+1}`,name,phone:`+253 77${100000+i}`,plan:["Monthly","3 Months","6 Months","Annual"][i%4],start:"2026-01-10",end:`2026-0${(i%6)+6}-15`,status:["Active","Expiring Soon","Expired"][i%3]}));
export const revenueData = [
  { month: "Jan", revenue: 11200 },
  { month: "Feb", revenue: 12800 },
  { month: "Mar", revenue: 14100 },
  { month: "Apr", revenue: 16700 },
  { month: "May", revenue: 18640 },
];
