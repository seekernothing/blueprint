import { Box } from 'lucide-react'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router'
import { Button } from './ui/Button'

export const Navbar = () => {

  const { isSignedIn, userName, signIn, signOut } = useOutletContext<AuthContext>()

  const [isBusy, setIsBusy] = useState(false)

  const handelAuthClick = async () => {
    if (isBusy) return

    setIsBusy(true)
    try {
      if (isSignedIn) {
        await signOut()
      } else {
        await signIn()
      }
    } finally {
      setIsBusy(false)
    }
  }

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

         {isSignedIn ? (
              <>
              <span>
                {userName ? `Hi, ${userName}` : 'Signed in'}
              </span>

              <Button size="sm" onClick={handelAuthClick} disabled={isBusy} className='btn'>
                {isBusy ? 'Logging out...' : 'Log out'}
              </Button>
              </>
         ):(

          <>
            <Button onClick = {handelAuthClick} size="sm"
            variant='ghost'
            disabled={isBusy}
          >
            {isBusy ? 'Logging in...' : 'Log In'}
          </Button>

           <a
          href='#upload'
          className='cta'
          > Get Started</a>

          </>
         )}

        </div>

      </nav>
    </header>
  )
}
