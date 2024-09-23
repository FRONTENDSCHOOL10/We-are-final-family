import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import useThemeStore from './stores/useThemeStore';
import { useEffect } from 'react';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // document.body.classList.toggle('dark-mode', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
