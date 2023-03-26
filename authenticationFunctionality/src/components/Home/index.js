import Header from '../Header'
import LogoutButton from '../LogoutButton'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="home-container">
        <h1 className="home-heading">Home Route</h1>
        <LogoutButton />
      </div>
    </div>
  </>
)

export default Home
