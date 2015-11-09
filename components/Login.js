import React from 'react'
import { History, Router, Route, Link } from 'react-router'
import auth from '../utils/auth.js'
var belle = require('belle');
var TextInput = belle.TextInput;
var Button = belle.Button;
var Card=belle.Card
const Login = React.createClass({

  mixins: [ History ],

  getInitialState() {
    var dn=""
    let { query } = this.props.location;
    if(query.done=="true"){
      dn="Successfully registered, Please login to access your blog";
    }
    return {
      error: false,
      msg:dn
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value
    let { query } = this.props.location;
    if(query.done=="true"){
      this.setState({done:"Successfully registered, Please login to access your blog"})
    }
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
              <Button type="submit">Access your blog</Button>
              {this.state.error && (
                <p>Bad login information</p>
              )}
              {this.state.msg!="" && (
                <p>{this.state.msg}</p>
              )}
            </form>
        </Card>
      </div>
    )
  }

})

export default Login
