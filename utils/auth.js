var Appbase=require('appbase-js');
import appbase from '../config/appbase.js'
module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken: function () {
    return localStorage.token
  },

  logout: function (cb) {
    delete localStorage.token
    delete localStorage.id
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn: function () {
    return !!localStorage.token
  },

  onChange: function () {}
}

function pretendRequest(email, pass, cb) {
  if(email && pass){
      appbase.search({
      type:'User',
      body:{
        query:{
          term:{
            "_id":email
          }
        }
      }
    }).on('data',function(res){
      console.log(res);
      if(res.hits.hits.length>0){
        if(res.hits.hits[0]._source.password==pass){
          window.localStorage['id']=email;
          cb({
            authenticated:true,
            token:Math.random().toString(36).substring(7)
          })
        }
        else{
          cb({authenticated:false})
        }
      }
    }).on('error',function(err){
      cb({authenticated:false})
      console.log(err);
    })
  }


}
