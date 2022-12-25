import React, { Component } from 'react'
import Header from '../../components/comm/HeaderNav'
import Helper from '../../components/comm/FloatHelper'
import ReactWebsocket from '../../components/chat/ReactWebsocket'
import { Button, Input, Layout, Menu } from 'antd'
import MenuItem from 'antd/es/menu/MenuItem'
import { Card, List } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import Socket from './Socket'
import Axios from 'axios'
import { WechatOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

let socket;

export default class teamChat extends Component {
  constructor(props) {
    super(props);
      this.state = {
        senderID: JSON.parse(localStorage.getItem('userData')).account,
        GroupId: this.props.location.query.GroupId,
        message: '',
        messageList: [],
        humanList: [],
    }
    var token = JSON.parse(localStorage.getItem('token')).token
    Axios.get(
      '/groups/'+
      this.props.location.query.GroupId +
      '/members',
      {headers: { token: token }}
    )
      .then((res)=>{
        console.log(res)
        this.setState({
          humanList: res.data.detail
        })
        console.log(this.state.humanList)
      })
  }
  componentWillMount() {
     this.setSocket()
  }
  componentWillUnmount() {
    socket.onclose()
  }

  setSocket = () => {
    socket = new Socket('ws://localhost:8080/chat/'+JSON.parse(localStorage.getItem('token')).token,'')
    socket.onmessage(this.handleList.bind(this))
  }

  handleList = event => {
    console.log(event)
    // let data = JSON.parse(event)
    let message={
      sender: event.sender,
      message: event.message,
    }
    let List = this.state.messageList
    List.push(message)
    this.setState({
      messageList: List
    })
  }


  sendMess() {
    if (this.state.message != ''){
      let mess = ''
      this.setState({
        message: mess
      })
      let data = {
        type: 1,
        receiver: this.state.GroupId,
        sender: this.state.senderID,
        message: this.state.message
      }
      socket.send(JSON.stringify(data))
    }
    else {
      window.alert('请输入要发送的消息!')
    }
  }

  handleMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  onMessage(event) {
    console.log('message')
  }

  onClose() {
    console.log('close')
  }

  onOpen() {
    console.log('onopen')
  }

  render() {
    return (
      <div class="allCompetitionPage">
        <Header />
        <div style={{ height: '70px' }} />
        <Helper />
        <h1
          style={{margin: '0 50px'}}
        >聊天室</h1>
        <h2
          style={{position:'relative', left: '50%',}}
        >小组ID：{this.state.GroupId}</h2>
        <Layout>
          <Sider width={200} style={{backgroundColor: 'white'}}>
            <Menu
              id="chatList"
              style={{ position: 'relative', width: '200px', left: '5%' ,}}
              mode="vertical-left">
              <span style={{margin: '20px 0'}}>联系人</span>
              <List
                grid={{column: 1}}
                dataSource={this.state.humanList}
                renderItem={(item) => (
                  <List.Item>
                    <Link
                      to={{
                        pathname: '/privateChat/account=' + JSON.parse(localStorage.getItem('userData')).account,
                        query: {
                          receiverID: item,
                          GroupId: this.state.GroupId,
                          Account: this.state.account,
                        }
                      }}
                    >
                      <Layout>
                        <Sider width={20} style={{backgroundColor: 'white'}}>
                          <WechatOutlined />
                        </Sider>
                        <Content>
                          <li>{item}</li>
                        </Content>
                      </Layout>
                    </Link>
                  </List.Item>
                )}
              >
              </List>
            </Menu>
          </Sider>
          <Content>
            <Card style={{height: '450px', overflowY: 'scroll' }}>
              <h1>信息框</h1>
              <List
                style={{margin: '20px 20px'}}
                grid={{column: 1}}
                dataSource={this.state.messageList}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      title={item.sender}
                    >
                      <p>{item.message}</p>
                    </Card>
                  </List.Item>
                )}
              >

              </List>
            </Card>
            <Card>
              <Input
                placeholder="请输入要发送的消息..."
                value={this.state.message}
                onChange={this.handleMessage.bind(this)}
              />
              <Button type="primary" onClick={() => this.sendMess()}>
                发送
              </Button>
            </Card>
          </Content>
        </Layout>
      </div>
    )
  }
}
