import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-items-container">
        <Link to="/" className="link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo-header-img"
            alt="website logo"
          />
        </Link>
        <ul className="menu-items-container">
          <Link to="/" className="link-item">
            <li className="header-list-item">
              <h1 className="header-home-heading">Home</h1>
            </li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="header-list-item">
              <h1 className="header-home-heading">Jobs</h1>
            </li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
