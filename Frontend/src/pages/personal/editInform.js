import React, { Component } from 'react'
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Avatar,
  Input,
  Upload,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import '../../style/personal/editInform.css'
import HeaderNav from '../../components/comm/HeaderNav'
import Footer from '../../components/comm/Footer'
import Axios from 'axios'
import UserComp from './userComp'
const { TextArea } = Input

var data = JSON.parse(localStorage.getItem('userData'))
//当前登录的用户数据
export default class EditInform extends Component {
  constructor(props) {
    super(props)
    this.inputChange = this.inputChange.bind(this)
    this.state = {
      data: JSON.parse(localStorage.getItem('userData')),
      image: null,
      showSelectAvatar: false,
      savedAvatar:'/avatar/1.png'
    }
    console.log(this.state.data)

    //给this.state赋值
  }
  componentDidMount(){
    console.log(this.state.data.avatar)
    var temp=this.state.data.avatar
    this.setState({savedAvatar:temp})
  }
  clickAvatar() {
    const isShow=this.state.showSelectAvatar
    this.setState({showSelectAvatar:!isShow})
  }
  clickSelectAvatar(index) {
    const avatarList = ['/avatar/0.jpeg', '/avatar/1.png', '/avatar/2.jpeg', '/avatar/3.jpeg',
    '/avatar/4.jpeg', '/avatar/5.jpeg', '/avatar/8.jpeg', '/avatar/9.jpeg', '/avatar/10.png']
    console.log(avatarList[index])
    const isShow=this.state.showSelectAvatar
    this.setState({showSelectAvatar:!isShow})
    this.setState({savedAvatar:avatarList[index]})
  }

  render() {
    var formData = this.state.data
    console.log(formData)
    const avatarList = ['/avatar/0.jpeg', '/avatar/1.png', '/avatar/2.jpeg', '/avatar/3.jpeg',
      '/avatar/4.jpeg', '/avatar/5.jpeg', '/avatar/8.jpeg', '/avatar/9.jpeg', '/avatar/10.png']
    return (
      <div id="whole_page">
        <HeaderNav />
        <div className="pagecontent">
          <Card id="ed_card" title="修改个人资料" bordered={false}>
            <Divider orientation="left">基本信息</Divider>
            <Descriptions>
              <Descriptions.Item label="头像">
                <Avatar size={128} onClick={() => this.clickAvatar()} src={this.state.savedAvatar} />
              </Descriptions.Item>
            </Descriptions>
            <div>
              {
                this.state.showSelectAvatar ?
                  <Descriptions>
                    <Descriptions.Item label="可选">
                      <div>
                        {
                          avatarList.map((item, index) => (
                            <Avatar size={64} onClick={() => this.clickSelectAvatar(index)} src={item} />
                          ))
                        }
                      </div>
                    </Descriptions.Item>
                  </Descriptions>
                  : null
              }
            </div>


            <Descriptions bordered>
              <Descriptions.Item label="名字">
                <TextArea
                  autoSize
                  bordered={false}
                  name="name"
                  defaultValue={formData.name}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="性别">
                <TextArea
                  autoSize
                  bordered={false}
                  name="sex"
                  defaultValue={formData.sex}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="昵称">
                <TextArea
                  autoSize
                  bordered={false}
                  name="nickname"
                  defaultValue={formData.nickname}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="手机">
                <TextArea
                  autoSize
                  bordered={false}
                  name="phoneNum"
                  defaultValue={formData.phoneNum}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="邮箱">
                <TextArea
                  autoSize
                  bordered={false}
                  name="emailAddress"
                  defaultValue={formData.emailAddress}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="学校">
                <TextArea
                  autoSize
                  bordered={false}
                  name="school"
                  defaultValue={formData.school}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="学号">
                <TextArea
                  autoSize
                  name="studentNumber"
                  bordered={false}
                  defaultValue={formData.studentNumber}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="学院">
                <TextArea
                  autoSize
                  bordered={false}
                  name="college"
                  defaultValue={formData.college}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
              <Descriptions.Item label="年级">
                <TextArea
                  autoSize
                  bordered={false}
                  name="grade"
                  defaultValue={formData.grade}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
            </Descriptions>
            <Divider orientation="left">了解更多</Divider>
            <Descriptions bordered>
              <Descriptions.Item label="简介">
                <TextArea
                  autoSize
                  bordered={false}
                  name="intro"
                  defaultValue={formData.intro}
                  onChange={this.inputChange}
                />
              </Descriptions.Item>
            </Descriptions>
            <div className="saveButtons">
              <Button type="primary" onClick={() => this.saveEdit()}>
                保存
              </Button>
              <a
                href={'#/personal/account=' + formData.account + '/team'}
              >
                <Button>取消</Button>
              </a>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  saveEdit() {
    var token = JSON.parse(localStorage.getItem('token')).token
    const responseBody = this.state.data
    responseBody.avatar=this.state.savedAvatar
    console.log(this.state.data)
    Axios.
      patch('user/profile', responseBody, {
        headers: { token: token },
      })
      .then((response) => {
        // window.alert("stop")
        console.log("输出的：", responseBody)
        localStorage.setItem("userData", JSON.stringify(responseBody))
        console.log(localStorage.getItem("userData"))
        window.location.hash = '#/personal/account=' + this.state.data.account
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(this.state)
  }
  inputChange(e) {
    console.log(e.target.name, e.target.value)
    let o = {}
    o[e.target.name] = e.target.value
    console.log(o)
    var newdata = this.state.data
    for (var item in o) {
      newdata[item] = o[item]
    }
    this.setState({ data: newdata })

  }
}
