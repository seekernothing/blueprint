import { Box } from 'lucide-react'
import React from 'react'

export const Navbar = () => {

  const handelAuthClick = async()=>{}
  return (
    <header className='navbar'>
      <nav className='inner'>
        <div className="left">
          <div className="brand">
            <Box className='logo'/>
            <span className='name'>Blueprint</span>
          </div>

          <ul className='links'>
            <a href='#'>Product</a>
            <a href='#'>Pricing</a>
            <a href='#'>Community</a>
            <a href='#'>Enterprise</a>
          </ul>
        </div>

        <div className="actions">

          <button className='login'
          onClick={handelAuthClick}
          >
            Log In
          </button>

          <a
          href='#upload'
          className='cta'
          > Get Started</a>

        </div>

      </nav>
    </header>
  )
}
