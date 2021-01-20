import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import Content from './components/Content';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'welcome',
      selected_content_id: 2,
      subject : {title:"web", sub:"world wide web!!"},
      welcome : {title:"welcome", desc:"Hello, React!!"},
      contents : [
        {id:1, a:"1.html", title:"HTML", desc:"HTML is for information"},
        {id:2, a:"2.html", title:"CSS", desc:"CSS is for design"},
        {id:3, a:"3.html", title:"JS", desc:"JavaScript is for interactive"},
      ]
    }
  }
  render(){
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
      var i = 0;
      while(i<this.state.contents.length){
        var data= this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i=i+1;
      }
    }
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub} 
        onChangePage={function(){this.setState({mode:'welcome'})}.bind(this)}
        >
        </Subject>
        <TOC onChangePage={function(e){
          alert('hi');
          this.setState({mode:'read',selected_content_id:0})
      }.bind(this)} data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
