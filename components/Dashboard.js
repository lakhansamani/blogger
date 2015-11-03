import React from 'react'
import auth from '../utils/auth'
var marked = require('marked');
var belle = require('belle');
var TextInput = belle.TextInput;
var Button = belle.Button;
var Card=belle.Card
const Dashboard = React.createClass({
  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: this.refs.textarea.value});
  },
  rawMarkup: function() {
    return { __html: marked(this.state.value, {sanitize: true}) };
  },
  render: function() {
    return (
      <div className="row">
      <Card className="columns five offset-by-six">
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea className="form-item"
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value} />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
      </div>
      </Card>
      </div>
    );
  }
})

export default Dashboard

