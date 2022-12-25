import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Card, Button, Avatar } from 'antd'
import '../../style/comm/comm.css'
import axios from 'axios'
import Layout from 'antd/lib/layout/layout'

export default class Post extends Component {
  constructor(props) {
    super(props)
    var token = JSON.parse(localStorage.getItem('token')).token

    var groupId = this.props.groupId
    var MatchId = this.props.matchId

    this.state = {
      GroupInfo: {},
      GroupMember: [],
      GroupId: groupId,
      ProjctId: parseInt(MatchId),
    }
    axios
      .get('groups/' + this.state.GroupId, { headers: { token: token } })
      .then((response) => {
        console.log(response)
        this.setState({
          GroupInfo: response.data.detail,
        })
        console.log(this.state)
      })
      .catch((error) => {
        console.log(error)
      })
    axios
      .get('groups/' + this.state.GroupId + '/members', {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response)
        this.setState({
          GroupMember: response.data.detail,
        })
        console.log(this.state)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const agriculturalListData = this.state.GroupMember
    return (
      <div style={{ backgroundColor: 'whitesmoke' }}>
        <Card
          extra={
            <Layout>
              <h3>当前组员</h3>
              <ul>
                {agriculturalListData.map((item) => (
                  <li>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <a>{item}</a>
                  </li>
                ))}
              </ul>
            </Layout>
          }
          actions={[
            <Button
              shape="round"
              type="primary"
              style={{ width: 150 }}
              onClick={() => {
                var token = JSON.parse(localStorage.getItem('token')).token
                axios({
                  method: 'post',
                  url: 'groups/' + this.state.GroupId + '/applications',
                  headers: { token: token },
                })
                  .then((response) => {
                    console.log(response)
                    window.alert('申请成功')
                  })
                  .catch((error) => {
                    if (error.response.status === 409) {
                      window.alert('您已经发送过申请')
                    } else {
                      window.alert('申请失败')
                    }
                  })
              }}
            >
              <p>申请进入小队</p>
            </Button>,
          ]}
        >
          <div>
            <h2 style={{ textAlign: 'left' }}>{this.state.GroupInfo.name}</h2>
            <p>{this.state.GroupInfo.introduction}</p>
          </div>
        </Card>
      </div>
    )
  }
}
