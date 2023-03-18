import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import HomePage from './pages/Home'
import KoreanPage from './pages/Korean'
import ForeignPage from './pages/Foreign'
import WaterToolPage from './pages/WaterTool'
import EventIssuePage from './pages/EventIssue'
import LoginPage from './pages/Login'
import BasketPage from './pages/Basket'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'korean', element: <KoreanPage /> },
      { path: 'foreign', element: <ForeignPage /> },
      { path: 'water-tool', element: <WaterToolPage /> },
      { path: 'event-issue', element: <EventIssuePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'basket', element: <BasketPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
