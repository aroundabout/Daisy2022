import { PageHeader, Descriptions } from 'antd'
import React, { Component } from 'react'
import axios from 'axios'
import '../../style/findTeam/findTeam.css'

export default class teamNav extends Component {
  /*接收比赛名称*/
  constructor(props) {
    super(props)
    let matchId = this.props.matchId
    this.state = {
      matchName: '',
      matchIntroduction: '',
      matchMaxMemberNum: '',
    }
    var token = JSON.parse(localStorage.getItem('token')).token
    axios
      .get('projects/' + matchId, { headers: { token: token } })
      .then((response) => {
        console.log(response.data)
        this.setState({
          matchName: response.data.detail.name,
          matchIntroduction: response.data.detail.introduction,
          matchMaxMemberNum: response.data.detail.maxNum,
        })
      })
      .catch((error) => {
        window.alert('连接出错，点击确定返回主页')
        window.location.hash = '#/login'
        console.log(error)
      })
  }

  render() {
    return (
      <>
        <div id="site-page-header-ghost-wrapper">
          <div id="title">
            <PageHeader ghost={false} title={this.state.matchName}>
              <Descriptions size="small">
                <Descriptions.Item label="比赛简介">
                  {this.state.matchIntroduction}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions size="small">
                <Descriptions.Item label="队伍人数上限">
                  {this.state.matchMaxMemberNum}人
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </div>
        </div>
      </>
    )
  }
}
