import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

export function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found — TechTips</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="mx-auto flex min-h-[78vh] max-w-xl flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-ink-muted">
          That page doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-7 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.04]"
        >
          Back home
        </Link>
      </div>
    </>
  );
}
