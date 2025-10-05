import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout


