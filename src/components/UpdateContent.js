import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : this.props.data.title,
      desc : this.props.data.desc,
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value})
  }
  render() {
    console.log(this.props.data);
    console.log('UpdateContent render');
    // return;
    return (
      <article>

      <h2>Update</h2>
        <form action="/update_process" method="post"
        onSubmit={function(e){
          console.log(2);
          e.preventDefault();
          this.props.onSubmit(
            this.props.data.id,
            e.target.title.value,
            e.target.desc.value,
          );
        }.bind(this)}>
          <input type="hidden" name="id" value={this.props.data.id}></input>
          <p>
            <input type="text" name="title" placeholder="title"
            value={this.state.title}
            onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <textarea name="desc" placeholder="description"
            value={this.state.desc}
            onChange={this.inputFormHandler}></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    )
  }
}

export default UpdateContent;