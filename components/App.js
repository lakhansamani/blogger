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
        <Link to='/home' className="brand">Blogger</Link>
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
          <li><a href="https://github.com/lakhansamani/blogger" target="_blank">Github</a></li>
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
