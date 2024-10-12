import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/home.jsx'
import Me from './Pages/profile.jsx'
import MessageComponent from './Pages/message.jsx'
import SearchUser from './Pages/search.jsx'
import Register from './Pages/auth/register.jsx'
import Login from './Pages/auth/login.jsx'
import Notifications from './Pages/notifications.jsx'
import Explore from './Pages/explore.jsx'
import RootLayout from './Pages/layouts/RootLayout.jsx'
import AuthLayout from './Pages/layouts/AuthLayout.jsx'
import './index.css'
import Saved from './Pages/saved.jsx'
import CreatePost from './Pages/create-post.jsx'
function App() {
  return (
    <>
      <main className='flex h-screen'>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<Login />} />
            <Route path='/sign-up' element={<Register />} />
          </Route>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Me />} />
            <Route path="/message" element={<MessageComponent />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/search" element={<SearchUser />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
          {/* private routes */}
          {/* <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/all-users' element={<AllUsers />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:id' element={<EditPost />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/profile/:id/*' element={<Profile />} />
            <Route path='/update-profile/:id' element={<UpdateProfile />} />
          </Route> */}
        </Routes>
      </main>

    </>
  )
}

export default App
