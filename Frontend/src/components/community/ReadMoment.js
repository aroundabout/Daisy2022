//
// made by ykn
//

//记录明天的部分
//排序
//登陆状态的用户体验提升

import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Card, Avatar, Space, Button } from 'antd'
import '../../style/comm/comm.css'
import { LikeOutlined, CommentOutlined } from '@ant-design/icons'
import ReportButton from './ReportButton'
import CONSTURL from './config'
import Axios from 'axios'
import Loading from './Loading'
//import Report from '../findTeammate/report'
import moment from 'moment'
import { isLogined } from '../../utils/auth'
// Axios.defaults.baseURL = '/api'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

export default class ReadMoment extends Component {
  constructor(props) {
    super()

    this.state = {
      data: {
        Icon: '',
        Account: '',
        Nickname: '',
        Title: '',
        Content: '',
        Time: '',
        LikeCount: 0,
        CommentCount: 0,
      },

      commentcount:0,
      isLoading: true,
      Mid: props.momentId,
      image:'',
    }

  }

  componentDidMount() {
    console.log("mid id  shi",this.state.Mid)
    this.getMomentContent(this.state.Mid)
    
  }

  getMomentContent(Mid) {
    //do something
    console.log('readmoment get moment',Mid)
    var url = CONSTURL.GetMoment + Mid
    var token = JSON.parse(localStorage.getItem('token')).token
    Axios.get(url,{
      headers:{token:token}
    }).then((res) => {
      console.log(res)
      console.log("收到moment内容")
      this.setState({ data: res.data.detail })
      this.setState({ isLoading: false })
    })
    var url2='/Moment/count/'+Mid
    Axios.get(url2,{
      headers:{token:token}
    }).then((res)=>{
      console.log("得到评论数了")
      console.log(res.data)
      this.setState({commentcount:res.data.detail})
    })
  }

  likeMoment() {
    if (isLogined()) {
      var json = {
        MomentId: Number(this.state.Mid),
        Account: JSON.parse(localStorage.userData).account.toString(),
      }

      console.log("点赞数据",json)

      var token = JSON.parse(localStorage.getItem('token')).token
      Axios.post('/Moment/like/momentId/'+json.MomentId+'/account/'+json.Account,"",{
        headers: { token:token },
      }).then((res) => {
        console.log(res)
        window.location.reload()
        if(res.detail==0){
          window.location.reload()
        }else{
          // window.alert("不可重复点赞")
        }
      })

      
    } else {
      window.alert('未登录，跳转至登陆界面')
      window.location.hash = '#/login'
    }
  }


  render() {
    console.log(this.state.data)
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className='site-card-border-less-wrapper'>
        <Card
          title={this.state.data.title}
          bordered={false}
          extra={
            //之后可以用button之类的包装一下做成超链接
            //这里的头像要动态生成
            <div align='right'>
              <a href={'#/personal/account='+this.state.data.account}>
                <Avatar src={this.state.data.avatar}></Avatar>
              </a>

              <p>{this.state.data.account}</p>
            </div>
          }
          actions={[
            <Button type='text' onClick={this.likeMoment.bind(this)}>
              <IconText
                icon={LikeOutlined}
                text={this.state.data.likecount}
                key='list-vertical-like-o'
              />
            </Button>,

            <Button type='text'>
              <IconText
                icon={CommentOutlined}
                text={this.state.commentcount}
                key='list-vertical-share-o'
              />
            </Button>,

            // <ReportButton
            //   ReportUID={this.state.Mid}
            //   ReporterUID='test2'
            //   Time={moment().format('YYYY-MM-DDTHH:mm:ssC')}
            //   ContentType='moment'
            // />,
          ]}>
          {
            //下面是帖子的内容部分
          }
          <p>{this.state.data.content}</p>
        </Card>
        <br />
      </div>
    )
  }
}
