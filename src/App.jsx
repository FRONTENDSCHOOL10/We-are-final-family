import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';
import useThemeStore from './stores/useThemeStore';
import { useEffect } from 'react';

import { setVH } from '@/utils/viewport';

function App() {
  const { theme } = useThemeStore();
  useEffect(() => {
    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

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
