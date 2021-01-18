import React, { Component } from 'react';
import { findRenderedComponentWithType } from 'react-dom/test-utils';

class TOC extends Component {

  render() {
    var  lists = [];
    var data = this.props.data;
    let i = 0;
    while(i<data.length){
        lists.push(<li key={data[i].id}><a href={data[i].a}>{data[i].title}</a></li>);
        i=i+1;
    }

    return (
      <nav>
          <ul>
              {lists}
          </ul>
      </nav>
    )
  }
}

export default TOC;