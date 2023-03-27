import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <img
      src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
      className="wave-img"
      alt="wave"
    />
    <ul className="menu-items">
      <Link to="/" className="link-item">
        <li className="list-item">Home</li>
      </Link>
      <Link to="/about" className="link-item">
        <li className="list-item">About</li>
      </Link>
      <Link to="/contact" className="link-item">
        <li className="list-item">Contact</li>
      </Link>
    </ul>
  </nav>
)

export default Header
