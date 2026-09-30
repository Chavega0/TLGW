import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Logo dark />
        <p className="text-sm leading-relaxed max-w-md">
          Choose, implement, and connect the software your business needs to run better.
        </p>
        <p className="text-sm">© {new Date().getFullYear()} Stacktik</p>
      </div>
    </footer>
  );
}
