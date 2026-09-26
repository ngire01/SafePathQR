import Link from "next/link";

export default function NotFound() {
  return <main className="shell narrow-page"><p className="eyebrow">Page not found</p><h1>That page is not here.</h1><p className="lead">If you need urgent help, call 999.</p><Link className="button button-primary" href="/">Go to SafePathQR</Link></main>;
}
