import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import HomePage from './pages/Home'
import KoreanPage, { loader as koreanLoader } from './pages/Korean'
import ForeignPage, { loader as foreignLoader } from './pages/Foreign'
import EventIssuePage from './pages/EventIssue'
import LoginPage from './pages/Login'
import KoreanDetailPage, {
  loader as koreanDetailLoader,
} from './pages/KoreanDetail'
import CommunityLayout from './pages/CommunityLayout'
import NewPostPage from './pages/NewPost'
import { action as newAction } from './components/PostForm'
import ForeignDetailPage, {
  loader as foreignDetailLoader,
} from './pages/ForeignDetail'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'korean',
        element: <CommunityLayout />,
        children: [
          {
            index: true,
            id: 'korean',
            element: <KoreanPage />,
            loader: koreanLoader,
          },
          {
            path: ':id',
            id: 'korean-detail',
            loader: koreanDetailLoader,
            children: [{ index: true, element: <KoreanDetailPage /> }],
          },
        ],
      },

      {
        path: 'foreign',
        element: <CommunityLayout />,
        children: [
          {
            index: true,
            id: 'foreign',
            element: <ForeignPage />,
            loader: foreignLoader,
          },
          {
            path: ':id',
            id: 'foreign-detail',
            loader: foreignDetailLoader,
            children: [
              {
                index: true,
                element: <ForeignDetailPage />,
              },
            ],
          },
        ],
      },
      { path: 'new', element: <NewPostPage />, action: newAction },
      { path: 'event-issue', element: <EventIssuePage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
