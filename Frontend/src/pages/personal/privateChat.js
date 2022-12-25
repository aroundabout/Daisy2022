import React, { Component } from 'react'
import Header from '../../components/comm/HeaderNav'
import Helper from '../../components/comm/FloatHelper'
import { Button, Card, Input, Layout, List, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import Socket from './Socket'
import { WechatOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

let socket;

export default class teamChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      receiverID: this.props.location.query.receiverID,
      senderID: JSON.parse(localStorage.getItem('userData')).account,
      messageList: [],
      GroupId: this.props.location.query.GroupId,
    }
  }
  componentWillMount() {
    this.setSocket()
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

  handleMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  sendMess() {
    if (this.state.message != ''){
      let data = {
        type: 0,
        receiver: this.state.receiverID,
        sender: this.state.senderID,
        message: this.state.message
      }
      socket.send(JSON.stringify(data))
      let message={
        sender: this.state.senderID,
        message: this.state.message
      }
      let messageList = this.state.messageList
      messageList.push(message)
      this.setState({
        messageList: messageList
      })
      let mess = ''
      this.setState({
        message: mess
      })
    }
    else {
      window.alert('请输入要发送的消息!')
    }
  }

  render() {
    return (
      <div className="allCompetitionPage">
        <Header />
        <div style={{ height: '70px' }} />
        <Helper />
        <h1
          style={{ margin: '0 50px' }}
        >私聊室</h1>
        <Link
          style={{ margin: '0 50px' }}
          to={{
            pathname: '/teamChat/account=' + JSON.parse(localStorage.getItem('userData')).account,
            query: {
              GroupId: this.state.groupId,
              Account: this.state.account,
            }
          }}
        >
          🔙返回聊天室
        </Link>
        <h2
          style={{ position: 'relative', left: '50%', }}
        >TO ：{this.state.receiverID}</h2>
        <Layout>
          <Sider width={200} style={{ backgroundColor: 'white' }}>
            {/*<Menu*/}
            {/*  id="chatList"*/}
            {/*  style={{ position: 'relative', width: '200px', left: '5%', }}*/}
            {/*  mode="vertical-left">*/}
            {/*  <span style={{ margin: '20px 0' }}>联系人</span>*/}
            {/*  <li>{this.state.receiverID}</li>*/}
            {/*</Menu>*/}
          </Sider>
          <Content>
            <Card style={{ height: '450px', overflowY: 'scroll' }}>
              <h1>信息框</h1>
              <List
                style={{ margin: '20px 20px' }}
                grid={{ column: 1 }}
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
