import React from 'react'
import auth from '../utils/auth'
var marked = require('marked');
var belle = require('belle');
var TextInput = belle.TextInput;
var Button = belle.Button;
var Card=belle.Card;
var Appbase=require('appbase-js');
var appbase=new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'blog',
  username: 'h5aIUPBPO',
  password: '348cee55-1054-4021-ad35-15f93016e876'
});
const Dashboard = React.createClass({
  getInitialState: function() {
    return {value: 'Write your post here in markdown!',title:'Title'};
  },
  handleChange: function() {
    this.setState({value: this.refs.textarea.value});
  },
  handleTitleChange:function(event){
    this.setState({title: event.target.value});
  },
  rawMarkup: function() {
    return { __html: marked(this.state.value, {sanitize: true}) };
  },
  submitFrom:function(e){
    e.preventDefault();
    appbase.index({
      type:"Posts",
      "id":Date.now(),
      body:{
        'user':localStorage.id,
        'title':this.state.title,
        'description':this.state.value,
      }
    }).on('data',function(response){
      this.setState({title:''});
      this.setState({value:''});
    }).on('error',function(err){
      alert("Sorry there was some error");
    })
  },
  render: function() {
    return (
      <div className="row">
      <Card className="columns eight offset-by-five">
      <h3>Blog post title</h3>
      <form onSubmit={this.submitFrom}>
      <input ref="title" placeholder="Blog post title" className="form-item" ref="title" onChange={this.handleTitleChange}/>
      <div className="MarkdownEditor">
        <h3>Blog Post</h3>
        <textarea className="form-item txt"
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value}/>
          <br/>
          <Button type="submit">Access your blog</Button>
        <h3>Rendering your post</h3>
        <h4>{this.state.title}</h4>
        <div
          className="content"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
      </div>
      </form>
      </Card>
      </div>
    );
  }
})

export default Dashboard
