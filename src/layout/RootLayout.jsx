import S from './RootLayout.module.css';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Spinner from '@/components/App/Spinner';

function RootLayout() {
  return (
    <div className={S.root}>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default RootLayout;
