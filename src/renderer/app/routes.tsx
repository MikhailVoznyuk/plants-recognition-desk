import { createHashRouter, RouterProvider } from 'react-router';
import RootLayout from '@/renderer/layouts/RootLayout';
import HomePage from '@pages/home/index';
import ReportsPage from '@pages/reports/index';
import AboutPage from '@pages/about/index';
import ReportPage from '@pages/report/index';

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, handle: { pageId: 0 } },
      { path: '/reports', element: <ReportsPage />, handle: { pageId: 1 } },
      { path: '/about', element: <AboutPage />, handle: { pageId: 2 } },
      { path: '/reports/:id', element: <ReportPage />, handle: { pageId: 2 } },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
