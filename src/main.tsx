import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HashRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { App } from './App';
import { useSupabaseSession } from './hooks/useSupabaseSession';
import { queryClient } from './lib/queryClient';
import './styles.css';

registerSW({ immediate: true });

export function Root() {
  useSupabaseSession();
  const showQueryDevtools = import.meta.env.DEV && import.meta.env.VITE_ENABLE_QUERY_DEVTOOLS === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
      </HashRouter>
      {showQueryDevtools ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
