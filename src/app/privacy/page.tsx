import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="shell narrow-page">
      <p className="eyebrow">About SafePathQR</p>
      <h1>Privacy and safety</h1>
      <p className="lead">SafePathQR is a simple signposting website. It does not ask you to log in or tell us who you are.</p>
      <div className="prose">
        <h2>No personal data collection</h2>
        <p>We do not run accounts, analytics, advertising cookies or tracking. We do not store your answers, phone number or location.</p>
        <h2>Location stays on your phone</h2>
        <p>Location is only requested when you tap “Use my location”. Your browser uses it to sort nearby places and show the map. It is not sent to SafePathQR.</p>
        <h2>External services</h2>
        <p>If you choose Directions, your browser opens Google Maps. The map uses OpenStreetMap tiles. Their own privacy policies apply when your browser connects to those services.</p>
        <h2>Accuracy</h2>
        <p>Opening hours and service details can change. Check the service website or call ahead where possible. In an emergency, call 999.</p>
        <h2>Report a mistake</h2>
        <p>Before launch, add a monitored shared contact address here so services and visitors can report changes.</p>
        <p><Link className="text-link" href="/">Back to SafePathQR</Link></p>
      </div>
    </main>
  );
}
