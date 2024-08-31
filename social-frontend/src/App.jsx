import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/home.jsx'
import Register from './Pages/auth/register.jsx'
import Login from './Pages/auth/login.jsx'
import RootLayout from './Pages/layouts/RootLayout.jsx'
import './App.css'

function App() {
  return (
    <>
      <main className='flex h-screen'>
        <Routes>
          <Route element={<RootLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {/* public routes */}
          {/* <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
          </Route> */}

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
