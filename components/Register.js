import React from 'react'
var belle = require('belle');
var Button = belle.Button;
var Card=belle.Card;
const Register = React.createClass({
  render() {
    return (
        <div className="row">
            <Card className="columns six offset-by-five" style={{padding:'10px'}}>
                <h2 style={{'fontWeight':'lighter'}}>Create your live blog in few steps :)</h2>
                <input ref="name" placeholder="Your name, eg. Jhon" required className="form-item" /><br/>
                <input ref="email" placeholder="Your email, eg. jhon@gmail.com" required className="form-item" />
                <br/>
                <input type="password" ref="pass" placeholder="Your password, ****" className="form-item"/><br />
                <Button type="submit" primary>Register today !</Button>
            </Card>
        </div>
    )
  }
})

export default Register
