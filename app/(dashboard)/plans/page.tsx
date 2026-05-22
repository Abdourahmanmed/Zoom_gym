import { Card } from "@/components/ui/card";

const plans = [
  ["Monthly", "5,000 DJF", "1 Month", 324],
  ["3 Months", "13,500 DJF", "3 Months", 412],
  ["6 Months", "25,000 DJF", "6 Months", 289],
  ["Annual", "48,000 DJF", "12 Months", 259],
];

export default function Plans() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Membership Plans</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <Card key={p[0]}>
            <h3 className="text-lg font-semibold">{p[0]}</h3>
            <p className="text-3xl font-bold text-primary">{p[1]}</p>
            <p className="text-secondaryText">{p[2]}</p>
            <p className="mt-3 text-sm">Active subscribers: {p[3]}</p>
            <ul className="my-3 text-sm text-secondaryText">
              <li>Gym Access</li>
              <li>Locker Included</li>
              <li>Coach Support</li>
            </ul>
            <button className="rounded-xl bg-white/10 px-3 py-2">Edit Plan</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
