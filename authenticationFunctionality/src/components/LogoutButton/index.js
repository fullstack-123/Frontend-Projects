// Write your JS code here
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LogoutButton extends Component {
  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <button
        type="button"
        className="logout-button"
        onClick={this.onClickLogout}
      >
        Logout
      </button>
    )
  }
}

export default withRouter(LogoutButton)
