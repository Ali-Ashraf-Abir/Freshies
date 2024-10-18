import React from 'react'
import Navigation from './Navigation'
import Banner from './Banner'
import Category from './Category'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Home() {
  return (
    <div className="">
        <Navigation></Navigation>
        <Outlet></Outlet>
        <Footer></Footer>

    </div>
  )
}
