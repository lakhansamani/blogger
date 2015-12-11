import React from 'react'
var belle = require('belle');
var Card=belle.Card
const Landing = React.createClass({

  render() {
    return (
       <div className="row">
      	<Card className="columns eight offset-by-five">
      		<h3> Blogger </h3>
      		<p>
      			Blogger is live blogging platform created using <a href="https://facebook.github.io/react/" target="_blank">React</a> and <a href="https://appbase.io" target="_blank"> Appbase </a>
            Blogger is an open source project you can fork it on <a href="https://github.com/lakhansamani/blogger" target="_blank"> Github</a> and build your own blogging platfrom.
      		</p>
          <h5>Get Started With blogger </h5>
          <ul>
            <li> Create account on blogger</li>
            <li> Download <a href="/example/example.zip">client example</a> developed using React and appbase</li>
            <li> Configure example with your blogger username </li>
            <pre>
                cd example<br/>
                vim config.js
            </pre>
            <li> Change value of <pre>blogger_username</pre> </li>
            <li> Host your blog on github, if it is your personal blog create repo with username.github.io else if its blog for your project you can host it in `gh-pages` branch</li>
          </ul>
      	</Card>
       </div>
    )
  }

})

export default Landing
