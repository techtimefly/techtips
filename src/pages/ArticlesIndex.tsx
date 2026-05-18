import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { articles, formatArticleDate } from '../data/articles';

export function ArticlesIndex() {
  return (
    <>
      <Head>
        <title>Guides &amp; Articles — TechTips</title>
        <meta
          name="description"
          content="In-depth, plain-English tech guides and step-by-step tutorials."
        />
      </Head>

      <div className="mx-auto max-w-6xl px-5 pt-32 pb-24">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal">
          Guides
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Guides &amp; Articles
        </h1>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">
          Longer, step-by-step walkthroughs for when a quick tip isn't enough.
        </p>

        {articles.length === 0 ? (
          <p className="mt-12 text-ink-muted">No articles yet — check back soon.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl panel transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div
                  className="aspect-[16/9] w-full overflow-hidden"
                  style={{
                    backgroundImage:
                      'linear-gradient(155deg, rgba(124,92,255,0.28), #0b0d17)',
                  }}
                >
                  {article.cover && (
                    <img
                      src={article.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-display text-lg font-semibold leading-snug">
                    {article.title}
                  </h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
                    {article.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
                    <span>{article.readingTime} min read</span>
                    {article.date && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{formatArticleDate(article.date)}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
