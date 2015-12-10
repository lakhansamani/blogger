import React from 'react'
var belle = require('belle');
var Button = belle.Button;
var Card=belle.Card;
var Appbase=require('appbase-js');
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
var appbase=new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'blog',
  username: 'h5aIUPBPO',
  password: '348cee55-1054-4021-ad35-15f93016e876'
})

var Data = {};
var dataChange = function(callback){
    if(callback){
      callback(Data);
        appbase.searchStream({
          type:'Posts',
          body:{
            query:{
              match_phrase:{
                  "user":uname
              }
            }
          }
        }).on('data',function(response){
          console.log(response);
          Data.value=response;
          callback(Data);
        }).on('error',function(err){
          console.log(err);
        })
    }
    return Data;
};

var PostList = React.createClass({ // function that helps in creating list
  rawMarkup: function(data) {
    return { __html: marked(data, {sanitize: true}) };
  },
  render:function(){
    var createItem = function(item){
      return <li key={item._id}>{item._source.title}</li>;
    };
    return <ul>{this.props.items.map(function(value) {
        return (
           <Card key={value._id}>
                  <h3>{value._source.title}</h3>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={this.rawMarkup(value._source.description)}
                  />
           </Card>
        )
    }.bind(this))}</ul>;
  }
})
var PostApp = React.createClass({
  dataChange : function(callback){
      if(callback){
        callback(Data);
          appbase.searchStream({
            type:'Posts',
            body:{
              query:{
                match_phrase:{
                    "user":localStorage.id
                }
              },
              size:500,
              sort:[
                {
                  "_id":"desc"
                }
              ]
            }
          }).on('data',function(response){
            console.log(response);
            Data.value=response;
            callback(Data);
          }).on('error',function(err){
            console.log(err);
          })
      }
      return Data;
  },
  getInitialState:function(){
    return {items:[],text:'',data:this.dataChange()};
  },
  componentWillMount: function() {
      this.dataChange(this.updateHandler)
  },

  onChange:function(e){
    this.setState({text:e.target.value});
  },
  updateHandler: function(data) {

      if(data.value){
        if(data.value.hits){
          this.setState({
            data: data,
            items:data.value.hits.hits
          });
        }
        //only one row changed
        else{
          console.log(data);
          var tmp=this.state.items;
          var found=false;
          for(var i=0;i<tmp.length;i++){
            if(tmp[i]._id===data.value._id){
              tmp[i]._source=data.value._source;
              found=true;
              break;
            }
          }
          if(!found){
            tmp.push(data.value);
          }
          this.setState({items:tmp});
          console.log(tmp);
        }
      }
  },
  render:function(){
    return(
      <div className="row">
      <div className="columns eight offset-by-five">
        <h1 style={{marginLeft:'35px'}}> Your blog </h1>
        <PostList items={this.state.items} />
      </div>
      </div>
    );
  }
})

export default PostApp
