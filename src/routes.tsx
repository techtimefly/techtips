import type { RouteRecord } from 'vite-react-ssg';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ArticlesIndex } from './pages/ArticlesIndex';
import { ArticlePage } from './pages/ArticlePage';
import { NotFound } from './pages/NotFound';
import { articles } from './data/articles';

// One explicit route per article, so every article page is statically
// pre-rendered at build time (no dynamic-route enumeration needed).
const articleRoutes: RouteRecord[] = articles.map((article) => ({
  path: `articles/${article.slug}`,
  element: <ArticlePage article={article} />,
}));

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'articles', element: <ArticlesIndex /> },
      ...articleRoutes,
      { path: '*', element: <NotFound /> },
    ],
  },
];
