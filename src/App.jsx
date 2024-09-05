import '@/styles/iconfonts.css';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Intro from '@/pages/Intro/Intro';
import Test from './Test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,

    // 여기에 추가 라우트를 정의할 수 있습니다.
    // children: [
    //   {
    //     path: "about",
    //     element: <About />,
    //   },
    //   // ... 기타 라우트
    // ],
  },
  { path: '/test', element: <Test /> },
]);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
