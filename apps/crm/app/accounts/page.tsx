import Link from "next/link";

const accounts = [
  ["PT Patra Drilling Contractor", "Energy", "Negotiation"],
  ["RS Prima Inti Medika", "Healthcare", "Proposal"],
  ["Universitas Malikussaleh", "Education", "Proposal"],
  ["CV Mandiri Retailindo", "Retail", "Lead"],
];

export default function AccountsPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] p-6 text-[#172033]">
      <Link className="text-base font-bold text-[#E8531A]" href="/">
        Back to dashboard
      </Link>
      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-[#1B3A5C]">
          Accounts
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Account directory for prospects, clients, and active opportunities.
        </p>
        <table className="mt-6 w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-200">
              {["Company", "Industry", "Stage"].map((heading) => (
                <th
                  className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-slate-500"
                  key={heading}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accounts.map(([company, industry, stage]) => (
              <tr className="border-b border-slate-100" key={company}>
                <td className="px-4 py-4 text-base font-bold text-[#1B3A5C]">
                  {company}
                </td>
                <td className="px-4 py-4 text-base text-slate-600">
                  {industry}
                </td>
                <td className="px-4 py-4 text-base text-slate-600">{stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
