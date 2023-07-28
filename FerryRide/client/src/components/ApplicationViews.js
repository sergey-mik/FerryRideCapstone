import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home/Home'
import UserComments from './Comment/UserComments'
import CommentForm from './Comment/CommentForm'
import ProfilePage from './Profile/Profile'
import CommentDetails from './Comment/CommentDetails'
import CommentList from './Comment/CommentList'

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
            path="/comment"
            element={isLoggedIn ? <CommentList /> : <Navigate to="/login" />}
          />
          <Route
            path="/comment/details/:id"
            element={isLoggedIn ? <CommentDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/comment/ticket/:id"
            element={isLoggedIn ? <UserComments /> : <Navigate to="/login" />}
          />
          <Route
            path="/comment/add/:id"
            element={isLoggedIn ? <CommentForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
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
