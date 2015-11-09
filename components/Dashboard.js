import React from 'react'
import auth from '../utils/auth'
var marked = require('marked');
var belle = require('belle');
var TextInput = belle.TextInput;
var Button = belle.Button;
var Card=belle.Card
const Dashboard = React.createClass({
  getInitialState: function() {
    return {value: 'Type some *markdown* here!',title:''};
  },
  handleChange: function() {
    this.setState({value: this.refs.textarea.value});
  },
  handleTitleChange:function(){
    this.setState({title:this.ref.title.value})
  },
  rawMarkup: function() {
    return { __html: marked(this.state.value, {sanitize: true}) };
  },
  render: function() {
    return (
      <div className="row">
      <Card className="columns eight offset-by-five">
      <h3>Blog post title</h3>
      <input ref="title" placeholder="Blog post title" className="form-item" ref="title" onChange={this.handleTitleChange}/>
      <div className="MarkdownEditor">
        <h3>Blog Post</h3>
        <textarea className="form-item txt"
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value}/>
        <h3>Rendering your post</h3>
        <h4>{this.state.title}</h4>
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

