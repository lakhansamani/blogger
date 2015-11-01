import React from 'react'
import { History } from 'react-router'
var belle = require('belle');
var Button = belle.Button;
var Card=belle.Card;
var Appbase=require('appbase-js');
var appbase=new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'blog',
  username: 'h5aIUPBPO',
  password: '348cee55-1054-4021-ad35-15f93016e876'
})
const Register = React.createClass({
  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    }
  },
  handleSubmit(event) {
    event.preventDefault()
    console.log("trying to submit");
    const email = this.refs.email.value
    const pass = this.refs.pass.value
    const name = this.refs.name.value
    var user={};
    user.password=pass
    user.name=name;
    user.blogPost=[];
    appbase.index({
        'type':'User',
        'id':email,
        body:user
    }).on('data',function(res){
        const { location } = this.props

        if (location.state && location.state.nextPathname) {
            this.history.replaceState(null, location.state.nextPathname)
        } else {
            this.history.replaceState(null, '/login')
        }
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
                    <Button type="submit" primary>Register today !</Button>
                </form>
            </Card>
        </div>
    )
  }
})

export default Register
