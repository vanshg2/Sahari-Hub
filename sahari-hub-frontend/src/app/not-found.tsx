import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-container-low px-4 text-center">
      <h1 className="font-display-lg-mobile text-primary mb-4">404</h1>
      <p className="font-headline-md text-on-surface mb-2">Page Not Found</p>
      <p className="font-body-md text-on-surface-variant mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-primary text-white px-8 py-3 font-label-md uppercase tracking-widest hover:bg-secondary transition-colors shadow-sm"
      >
        Back to Home
      </Link>
    </div>
  );
}
