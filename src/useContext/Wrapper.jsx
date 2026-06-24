import React from 'react'
import { ThemeProvider } from './ThemeContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Wrapper() {
  return (

    <ThemeProvider>
        <Navbar/>
        <Sidebar/>
    </ThemeProvider>
  )
}

export default Wrapper
