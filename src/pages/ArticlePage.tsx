import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { formatArticleDate } from '../data/articles';
import type { Article } from '../data/articles';

export function ArticlePage({ article }: { article: Article }) {
  return (
    <>
      <Head>
        <title>{`${article.title} — TechTips`}</title>
        <meta name="description" content={article.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        {article.cover && <meta property="og:image" content={article.cover} />}
      </Head>

      <article className="mx-auto max-w-3xl px-5 pt-28 pb-24">
        <Link
          to="/articles"
          className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          ← All guides
        </Link>

        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-muted">
          {article.summary}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
          <span>{article.readingTime} min read</span>
          {article.date && (
            <>
              <span aria-hidden="true">·</span>
              <span>{formatArticleDate(article.date)}</span>
            </>
          )}
        </div>

        {article.cover && (
          <img
            src={article.cover}
            alt=""
            className="mt-8 aspect-[16/9] w-full rounded-2xl border border-border object-cover"
          />
        )}

        <div
          className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent-soft prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-code:text-teal prose-blockquote:border-l-accent prose-li:marker:text-accent-soft"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        <div className="mt-12 border-t border-border pt-6">
          <Link
            to="/articles"
            className="text-sm font-medium text-accent-soft hover:underline"
          >
            ← Back to all guides
          </Link>
        </div>
      </article>
    </>
  );
}
