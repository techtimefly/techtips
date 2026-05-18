import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

// vite-react-ssg drives the app: it renders these routes to static HTML at
// build time and hydrates them on the client.
export const createRoot = ViteReactSSG({ routes });
