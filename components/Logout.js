import React from 'react'
import auth from '../utils/auth'
var belle = require('belle');
var Button = belle.Button;
var Card=belle.Card;
const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return (
      <div className="row">
      <div className="columns four offset-by-six">
      <h3>Thank you for using blogger,You are now logged out</h3>
      </div>
      </div>
    )
  }
})

export default Logout
