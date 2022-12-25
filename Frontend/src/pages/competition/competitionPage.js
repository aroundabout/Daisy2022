import React, { Component } from 'react'
import { Col, Row } from 'antd'
import 'antd/dist/antd.css'
import Footer from '../../components/comm/Footer'
import Header from '../../components/comm/HeaderNav'
import Helper from '../../components/comm/FloatHelper'

import CompetitionName from '../../components/competition/competitionName'
import FindTeamBotton from '../../components/competition/findTeamButton'
import CompetitionInformation from '../../components/competition/competitionInformation'

import '../../style/competition/competition.css'

import axios from 'axios'
import { isLogined } from '../../utils/auth'
import moment from 'moment-timezone'
import CommentList from '../../components/competition/commentList'
import Tocomment from '../../components/competition/Tocomment'
export default class CompetitionPage extends Component {
  constructor(props) {
    super(props)
    this.createComment = this.createComment.bind(this)
    this.state = {
      compID: this.props.match.params.compID,
      compName: '',
      compImgUrl: '',
      compInformation: '',
      compHost: '',
      compParticipantsNumber: '',
      compStartTime: '',
      compEndTime: '',
    }
  }

  createComment(content, isReply) {
    console.log("创建评论", isReply)
    if (isLogined()) {
      var t = moment().format('YYYY-MM-DDTHH:mm:ssC')

      var projectId = Number(this.state.compID)
      var json =
      {
        "account": JSON.parse(localStorage.userData).account.toString(),
        "content": content,
        "time": t
      }

      console.log("reply final data", json)
      var token = JSON.parse(localStorage.getItem('token')).token
      axios.post('/reply/projectId/' + projectId, json, {
        headers: { token: token },
      }).then((res) => {
        console.log(res)
        window.location.reload()
      })

    }
    else {
      window.alert("未登录，将跳转至登陆界面")
      window.location.hash = '#/home'
    }

  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    var token = JSON.parse(localStorage.getItem('token')).token
    var requesturl = 'projects/' + this.state.compID
    axios
      .get(requesturl, { headers: { token: token } })
      .then((response) => {
        // console.log(response)
        this.setState({
          compName: response.data.detail.name,
          compInformation: response.data.detail.introduction,
          compHost: response.data.detail.host,
          compParticipantsNumber: response.data.detail.maxNum,
          compStartTime: response.data.detail.startTime,
          compEndTime: response.data.detail.endTime,
        })
      })
      .catch((error) => {
        console.log(error)
        window.alert('连接出现问题，点击确定跳转回主页')
        window.location.hash = '#/home'
      })
  }

  render() {
    var momentId = this.state.compID
    return (
      <div className="CompetitionPage">
        <Header />
        <div style={{ height: '50px' }} />
        <Helper />
        <div className="CompetionContentBox" style={{ marginTop: '5%' }}>
          <div className={'CompetitionNameBox'}>
            <Row gutter={16} align={'middle'}>
              <Col span={6} offset={9}>
                <CompetitionName compName={this.state.compName} />
              </Col>
              <Col span={6}>
                <FindTeamBotton compID={this.state.compID} />
              </Col>
            </Row>
          </div>
          <Col offset={2} span={20}>
            <CompetitionInformation
              compInformation={this.state.compInformation}
              compHost={this.state.compHost}
              compParticipantsNumber={this.state.compParticipantsNumber}
              compStartTime={this.state.compStartTime}
              compEndTime={this.state.compEndTime}
            />
          </Col>
        </div>
        <div style={{ height: '50px' }} />
        <div style={{width:'80%',margin:'0 auto'}}>

          <CommentList momentId={momentId} createComment={this.createComment} />
        
          <Tocomment createComment={this.createComment} />
        </div>

        <Footer />
      </div>
    )
  }
}
