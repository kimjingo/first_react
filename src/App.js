import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import Content from './components/Content';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      subject : {title:"web", sub:"world wide web!!"},
      data : [
        {id:1, a:"1.html", title:"HTML"},
        {id:2, a:"2.html", title:"CSS"},
        {id:3, a:"3.html", title:"JS"},
      ]
    }
  }
  render(){
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub} ></Subject>
        <TOC data={this.state.data}></TOC>
        <Content title="HTML" desc="HTML is a Hyper Text Markup Language"></Content>
      </div>
    );
  }
}

export default App;
