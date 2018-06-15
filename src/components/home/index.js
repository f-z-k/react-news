import React, { Component } from 'react'
import './index.css'
import { requestApi } from './../../api/axios.js'
import Header from "./header.js";
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      msg: '樊中魁',
      newsLists: []
    }
  }
  componentDidMount () {
    requestApi('get', '/news/list').then(res => {
      this.setState({newsLists: res.newsList})
    })
  }
  render () {
    const listItem = this.state.newsLists.map((ele, index) => {
      return (
        <p key={index}>{index}</p>
      )
    })
    return (
      <div className='home-box'>
        <Header/>
        {listItem}
      </div>
    )
  }
}
export default Index