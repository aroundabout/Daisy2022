import React, { Component } from 'react'
import { Card, Avatar } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { isLogined } from '../../utils/auth'

const data = JSON.parse(localStorage.getItem('userData'))

export default class MastHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      role: this.props.role,
      image: null,
      ava:'/avatar/1.png'
    }
    if (isLogined()) {

      var token = JSON.parse(localStorage.getItem('token')).token
      var usrData=JSON.parse(localStorage.getItem('userData')).account
      console.log(usrData)
      axios
        // .get(`user/profile/${this.props.account}`, {
        .get(`user/profile/${usrData}`, {
            headers: { token: token },
        })
        .then((res) => {
          console.log(res)
          this.setState({
            name: res.data.detail.name,
            ava:res.data.detail.avatar
          })
        })
    } else {
      window.location.hash = '/home'
    }
  }

  render() {
    return (
      <div className="mastHead_card">
        <Card bordered={false} style={{ textAlign: 'center' }}>
          <Avatar
            src={this.state.ava}
            size="large"
            style={{ marginBottom: 20 }}
          />
          <p>{this.state.name}</p>
           <Link to="/editinform">
              <EditOutlined />
            </Link>
        </Card>
      </div>
    )
  }
}
