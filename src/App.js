import React, { Component } from 'react';
// import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
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

  getReadContent(){
    var i = 0;
    while(i<this.state.contents.length){
      var data= this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
      }
      i=i+1;
    }
  }

  getContent(){
    var _title, _desc, _article, _content = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    }else if(this.state.mode === 'read'){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        console.log(_title,_desc);
        this.max_content_id = this.max_content_id + 1;
        // var new_contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
        var new_contents = Array.from(this.state.contents);
        new_contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({contents:new_contents, mode:"read", selected_content_id:this.max_content_id});
      }.bind(this)}></CreateContent>;
    } else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} 
      onSubmit={function(_id, _title, _desc){
        // add content to this.state.contents
        console.log(_id, _title,_desc);
        var _tmp_content = Array.from(this.state.contents);
        var i = 0;
        while(i < _tmp_content.length){
          var data = _tmp_content[i];
          console.log(data);
          if(data.id === _id) {
            break;
          }
          i = i + 1;
        }
        console.log(i);
        _tmp_content[i].title = _title;
        _tmp_content[i].desc = _desc;
        this.setState({contents:_tmp_content, mode:"read"});
      }.bind(this)}></UpdateContent>;
    }
    // console.log(_article);
    // return;
    return _article;
  }
  render(){
    console.log('App render');
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub} 
        onChangePage={function(){this.setState({mode:'welcome'})}.bind(this)}
        >
        </Subject>
        <Control onChangeMode={function(_mode){
          if(_mode === "delete"){
            if(window.confirm('really?')){
                var _tmp_content = Array.from(this.state.contents);
                var curr_id = this.state.selected_content_id;
                var i = 0;
                while(i<_tmp_content.length){
                  if(_tmp_content[i].id === curr_id){
                    _tmp_content.splice(i,1);
                    break;
                  }
                  i = i+1;
                }
                this.max_content_id--;
                curr_id--;
                this.setState({
                  mode:"welcome",
                  contents:_tmp_content,
                  selected_content_id: Math.max(curr_id,0)
                })
            }
          }else{
            this.setState({mode:_mode});
          }
          }.bind(this)}></Control>
        <TOC onChangePage={function(id){
            // alert('hi');
            this.setState({mode:'read',selected_content_id:Number(id)})
        }.bind(this)} data={this.state.contents}></TOC>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
