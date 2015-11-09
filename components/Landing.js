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
      		</p>
      	</Card>
       </div>
    )
  }

})

export default Landing
