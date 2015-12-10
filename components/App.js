import React from 'react'
import { Link } from 'react-router'
import auth from '../utils/auth'

const App = React.createClass({

  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: !!loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <div className="nav">
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li>
            {this.state.loggedIn ? (
              <Link to="/posts">Posts</Link>
            ) : (
              <Link to="/login">Posts</Link>
            )}
          </li>
          <li>
          {this.state.loggedIn ? (
              <Link to="/">Write post</Link>
            ) : (
              <Link to="/register">Register</Link>
          )}
          </li>
          <li><Link to="/user/foo">Github</Link></li>
        </ul>
        </div>
        <div className="app-container">
        {this.props.children}
        </div>
      </div>
    )
  }

})

export default App
