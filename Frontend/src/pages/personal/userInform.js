import React, { Component } from 'react'
import { Card, Divider, Descriptions } from 'antd'
import Axios from 'axios'

export default class UserInform extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      data: [],
      account: this.props.match.params.account,
    }
    var token = JSON.parse(localStorage.getItem('token')).token
    Axios.get('user/profile', { headers: { token: token } })
      .then((res) => {
        console.log(res)
        this.setState({
          data: res.data.detail,
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  render() {
    return <div></div>
  }
}
