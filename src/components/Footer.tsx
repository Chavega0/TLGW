import { Logo } from "./Logo";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Services",
    links: [
      ["Software selection", "#services"],
      ["CRM setup", "#services"],
      ["Business calling", "#services"],
      ["Outbound systems", "#services"],
      ["Automation & AI", "#services"],
    ],
  },
  {
    title: "Company",
    links: [
      ["How we work", "#how"],
      ["The system", "#system"],
      ["Who it's for", "#who"],
    ],
  },
  {
    title: "Get started",
    links: [
      ["Free systems blueprint", "#blueprint"],
      ["hello@stacktik.com", "mailto:hello@stacktik.com"],
    ],
  },
];

export function Footer() {
  return (
    <footer data-theme-section="dark" className="bg-ink text-cream/70">
      <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Choose, implement, and connect the software your business needs to run better.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2 last:md:col-span-3">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream/40">
                {col.title}
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-clay transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-cream/10 pt-7 text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Stacktik. All rights reserved.</span>
          <span>Built around the way you work.</span>
        </div>
      </div>
    </footer>
  );
}
