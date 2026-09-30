import { Rise } from "./motion";

// Add client names here as they're confirmed.
const CLIENTS = ["Ismo Media", "Wear the Clouds", "Stamina11"];

export function Clients() {
  return (
    <section data-theme-section="light" className="py-14 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <Rise className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
          <span className="t-muted text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
            Systems built &amp; run for
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="font-display t-text text-xl italic opacity-70 md:text-2xl"
              >
                {name}
              </span>
            ))}
          </div>
        </Rise>
      </div>
    </section>
  );
}
