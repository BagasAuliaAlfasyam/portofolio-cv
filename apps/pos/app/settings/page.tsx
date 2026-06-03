import {
  LockKeyhole,
  Percent,
  ReceiptText,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { PosPageShell, PosPanel } from "../../components/feature-component";

const settings: Array<{
  description: string;
  icon: LucideIcon;
  title: string;
}> = [
  {
    description: "Logo, footer copy, tax number, and print layout.",
    icon: ReceiptText,
    title: "Receipt template",
  },
  {
    description:
      "Enable QRIS, cash, card, split payment, and settlement rules.",
    icon: WalletCards,
    title: "Payment methods",
  },
  {
    description: "Configure VAT, service fee, rounding, and discount approval.",
    icon: Percent,
    title: "Tax and service charge",
  },
  {
    description: "Control void, refund, discount, and drawer access.",
    icon: LockKeyhole,
    title: "Cashier permissions",
  },
];

export default function SettingsPage() {
  return (
    <PosPageShell eyebrow="Settings" title="Store and cashier configuration">
      <PosPanel title="Operational setup">
        <div className="grid gap-4 md:grid-cols-2">
          {settings.map(({ description, icon: Icon, title }) => (
            <div
              className="rounded-xl border border-white/[0.08] bg-surface-50 p-5"
              key={title}
            >
              <Icon className="h-5 w-5 text-emerald-300" />
              <h2 className="mt-4 text-lg font-black text-white">{title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </PosPanel>
    </PosPageShell>
  );
}
