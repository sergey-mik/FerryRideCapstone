import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home/Home'
import UserComments from './Comment/UserComments'
import CommentForm from './Comment/CommentForm'
import ProfilePage from './Profile/Profile'

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/usercomments"
            element={isLoggedIn ? <UserComments /> : <Navigate to="/login" />}
          />
          <Route
            path="/addcomment"
            element={isLoggedIn ? <CommentForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile" // add a new route for the profile page
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  )
}
