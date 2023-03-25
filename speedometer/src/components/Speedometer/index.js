import {Component} from 'react'
import './index.css'

class Speedometer extends Component {
  state = {speed: 0}

  accelerateBtn = () => {
    const {speed} = this.state
    if (speed < 200) {
      this.setState(prevState => ({speed: prevState.speed + 10}))
    } else {
      this.setState({speed})
    }
  }

  applyBreaksBtn = () => {
    const {speed} = this.state
    if (speed > 0) {
      this.setState(prevState => ({speed: prevState.speed - 10}))
    } else {
      this.setState({speed: 0})
    }
  }

  render() {
    const {speed} = this.state

    return (
      <div className="bg-container">
        <div className="speed-container">
          <h1 className="main-heading">SPEEDOMETER</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png"
            className="speedometer-img"
            alt="speedometer"
          />
          <h1 className="speed-heading">Speed is {speed}mph</h1>
          <p className="speed-limit-description">
            Min Limit is 0mph, Max Limit is 200mph
          </p>
          <div>
            <button
              type="button"
              className="accelerate-btn"
              onClick={this.accelerateBtn}
            >
              Accelerate
            </button>
            <button
              type="button"
              className="break-btn"
              onClick={this.applyBreaksBtn}
            >
              Apply Break
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Speedometer
