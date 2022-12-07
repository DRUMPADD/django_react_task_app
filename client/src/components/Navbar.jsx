import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar'>
        <ul className='nav-link'>
            <li>
                <Link to="/">Home</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar