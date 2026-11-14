import { Rise } from "./motion";

/* Only list suppliers verified as current in the Telarus portfolio. */
const GROUPS = [
  {
    label: "Calling & collaboration",
    names: [
      "Zoom",
      "RingCentral",
      "8x8",
      "Dialpad",
      "Nextiva",
      "Vonage",
      "GoTo",
      "Cisco",
      "Aircall",
      "Intermedia",
      "Ooma",
      "Sangoma",
      "net2phone",
      "CallTower",
      "Crexendo",
      "Weave",
    ],
  },
  {
    label: "Contact center",
    names: [
      "NiCE",
      "Genesys",
      "Five9",
      "Talkdesk",
      "UJET",
      "Glia",
      "Content Guru",
      "Verint",
      "CallMiner",
      "Observe.AI",
      "AmplifAI",
    ],
  },
  {
    label: "AI & automation",
    names: ["SoundHound AI", "Bland AI", "Omilia", "IntelePeer", "Telnyx"],
  },
];

export function Partners() {
  return (
    <section id="partners" data-theme-section="light" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <Rise>
            <span className="t-muted text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
              Our partners
            </span>
          </Rise>
          <Rise delay={0.08}>
            <h2 className="font-display t-text mx-auto mt-6 max-w-3xl text-balance text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.12]">
              We're not tied to one vendor. We work with 400+.
            </h2>
          </Rise>
          <Rise delay={0.15}>
            <p className="t-muted mx-auto mt-6 max-w-2xl text-[1.02rem] leading-relaxed">
              Through our partnership with Telarus, we source, compare, and implement the
              leading calling, contact center, and AI platforms — so your recommendation is
              built around your business, not around one product.
            </p>
          </Rise>
        </div>

        <div className="mt-14 md:mt-20">
          {GROUPS.map((group, i) => (
            <Rise key={group.label} delay={i * 0.06}>
              <div className="t-hairline grid gap-5 border-t py-8 md:grid-cols-[230px_1fr] md:gap-10 md:py-10">
                <h3 className="text-terracotta text-[0.7rem] font-semibold uppercase tracking-[0.24em] md:pt-2">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-x-8 gap-y-4">
                  {group.names.map((name) => (
                    <li
                      key={name}
                      className="font-display t-text text-[1.2rem] leading-none md:text-[1.4rem]"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
          ))}
          <Rise>
            <p className="t-muted t-hairline border-t pt-8 text-center text-[0.95rem] leading-relaxed">
              Plus hundreds more suppliers across networking, cloud, and security.
            </p>
          </Rise>
        </div>
      </div>
    </section>
  );
}
