import React from 'react'
import { History, Navigation } from 'react-router'
var belle = require('belle');
var Button = belle.Button;
var Card=belle.Card;
var Appbase=require('appbase-js');
import appbase from '../config/appbase.js'
const Register = React.createClass({
  mixins: [ History,Navigation ],

  getInitialState() {
    return {
      error: false
    }
  },
  handleSubmit(event) {
    event.preventDefault()
    const email = this.refs.email.value
    const pass = this.refs.pass.value
    const name = this.refs.name.value
    var user={};
    var self=this;
    user.password=pass
    user.name=name;
    appbase.index({
        'type':'User',
        'id':email,
        body:user
    }).on('data',function(res){
        console.log(res);
        self.history.replaceState(null,'/login',{"done":"true"})
    }).on('error',function(err){
        alert("Sorry something went wrong, please try again");
    })
  },
  render() {
    return (
        <div className="row">
            <Card className="columns six offset-by-five" style={{padding:'10px'}}>
                <h2 style={{'fontWeight':'lighter'}}>Create your live blog in few steps :)</h2>
                <form onSubmit={this.handleSubmit}>
                    <input ref="name" placeholder="Your name, eg. Jhon" required className="form-item" /><br/>
                    <input ref="email" placeholder="Your email, eg. jhon@gmail.com" required className="form-item" />
                    <br/>
                    <input type="password" ref="pass" placeholder="Your password, ****" className="form-item"/><br />
                    <Button type="submit">Register today !</Button>
                </form>
            </Card>
        </div>
    )
  }
})

export default Register
