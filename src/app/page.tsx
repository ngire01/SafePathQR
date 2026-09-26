import Link from "next/link";
import { ClientSite } from "@/components/ClientSite";

export default function HomePage() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Manchester mental-health support</p>
          <h1>Help when things feel too much.</h1>
          <p className="hero-lede">Find a free helpline, work out your safest next step, or find nearby A&E. You do not need an account and we do not track you.</p>
          <div className="hero-actions"><a className="button button-primary large-button" href="#check">Start the quick check</a><a className="button button-secondary large-button" href="#helplines">See helplines</a></div>
        </div>
        <aside className="emergency-card" aria-label="Emergency information"><p className="eyebrow">Immediate danger?</p><h2>Call 999</h2><p>If someone is in immediate danger, call 999 or go to A&E. If you can, stay with them.</p><a className="button button-danger" href="tel:999">Call 999</a></aside>
      </section>
      <div className="notice-bar"><div className="shell"><strong>Not sure what to do?</strong> Choose “Not sure” in the check and we will show the more urgent option.</div></div>
      <ClientSite />
      <section className="section shell simple-cta"><h2>Need help right now?</h2><p>Call 999 in an emergency, or call NHS 111 and ask for the mental-health option.</p><div className="action-row"><a className="button button-danger" href="tel:999">Call 999</a><a className="button button-secondary" href="tel:111">Call NHS 111</a><Link className="text-link" href="/privacy/">About this service</Link></div></section>
    </main>
  );
}
