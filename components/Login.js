import React from 'react'
import { History } from 'react-router'
import auth from '../utils/auth.js'
var belle = require('belle');
var TextInput = belle.TextInput;
var Button = belle.Button;
var Card=belle.Card
const Login = React.createClass({

  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname)
      } else {
        this.history.replaceState(null, '/')
      }
    })
  },

  render() {
    return (
      <div className="row">
        <Card className="columns five offset-by-six" style={{padding:'10px'}}>
            <h3 style={{fontWeight:'lighter'}}>Please sign-in to access your blog !</h3>
            <form onSubmit={this.handleSubmit}>
              <input ref="email" placeholder="Your email, eg. jhon@gmail.com" className="form-item" />
              <br/>
              <input type="password" ref="pass" placeholder="******" className="form-item"/><br />
              <Button type="submit" primary>Access your blog</Button>
              {this.state.error && (
                <p>Bad login information</p>
              )}
            </form>
        </Card>
      </div>
    )
  }

})

export default Login
