import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-void flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <p className="text-brand-orange font-display font-bold text-5xl mb-3 ltr-inline">
          404
        </p>
        <h1 className="font-display font-bold text-h2 text-ink mb-2">
          Page not found — الصفحة غير موجودة
        </h1>
        <p className="text-ink-muted mb-6 text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Home — الرئيسية
        </Link>
      </div>
    </main>
  );
}
