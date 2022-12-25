import React from 'react'
import 'antd/dist/antd.css'
import { Comment, Avatar, Form, Button, Input } from 'antd'
import { InputNumber } from 'antd'
import { Row, Col } from 'antd'
import axios from 'axios'
import { isLogined } from '../../utils/auth'

const { TextArea } = Input
var userdata = JSON.parse(localStorage.getItem('userData'))

const Editor = ({ onChange }) => (
  <>
    <Form.Item>
      <TextArea
        rows={10}
        onChange={onChange}
        style={{ width: '90%', resize: 'none' }}
        placeholder="队伍内容"
      />
    </Form.Item>
  </>
)

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props)

    let tempId = this.props.matchId

    this.state = {
      ProjctId: parseInt(tempId),
      Content: '',
      matchName: '',
      matchMaxMemberNum: 0,
      Name: '',
    }

    var token = JSON.parse(localStorage.getItem('token')).token
    axios
      .get('projects/' + tempId, { headers: { token: token } })
      .then((response) => {
        console.log(response)
        this.setState({
          matchName: response.data.detail.name,
          matchMaxMemberNum: response.data.detail.maxNum,
        })
      })
      .catch((error) => {
        this.setState({
          matchName: '未找到该比赛',
          matchIntroduction: '未找到该比赛',
        })
        console.log(error)
      })
  }

  TeamNameChange = (e) => {
    this.setState({
      Name: e.target.value,
    })
  }

  ContentChange = (e) => {
    this.setState({
      Content: e.target.value,
    })
  }

  getFields = () => {
    const children = [] //用于记录比赛信息

    children.push(
      <Col span={10} key={0}>
        <Form.Item
          name={`小队名称`}
          label={`小队名称`}
          rules={[
            {
              required: true,
              message: '该项为必填项',
            },
          ]}
        >
          <Input placeholder="输入小队名称" onChange={this.TeamNameChange} />
        </Form.Item>
      </Col>
    )

    children.push(
      <Col span={7} key={1}>
        <Form.Item
          name={`队长名称`}
          label={`队长名称`}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            placeholder={isLogined() ? userdata.account : '请先登录'}
            disabled
          />
        </Form.Item>
      </Col>
    )

    children.push(
      <Col span={6} key={2}>
        <Form.Item
          name={`从属比赛`}
          label={`从属比赛`}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <InputNumber placeholder={this.state.matchName} disabled />
        </Form.Item>
      </Col>
    )
    children.push(
      <Col span={21} key={3}>
        <Form.Item
          name={`队伍内容`}
          label={`队伍内容`}
          rules={[
            {
              required: true,
              message: '该项为必填项',
            },
          ]}
        >
          <Editor onChange={this.ContentChange} />
        </Form.Item>
      </Col>
    )
    children.push(
      <Col span={14} key={4}>
        <Button
          shape="round"
          type="primary"
          htmlType="submit"
          onClick={() => {
            if (isLogined()) {
              var token = JSON.parse(localStorage.getItem('token')).token
              if (this.state.Name.length > 0 && this.state.Content.length > 0) {
                let dataSent = {
                  leaderAccount: userdata.account,
                  introduction: this.state.Content,
                  maxNum: this.state.matchMaxMemberNum,
                  name: this.state.Name,
                  groupId: 0,
                }
                console.log(dataSent)
                axios
                  .post('/groups?projectId=' + this.state.ProjctId, dataSent, {
                    headers: { token: token },
                  })
                  .then((response) => {
                    console.log(response)
                    window.alert('申请成功')
                    //window.location.reload()
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }
            } else {
              window.alert('未登录，确定后跳转至登陆界面')
              window.location.hash = '#/login'
            }
          }}
        >
          建立小队
        </Button>
      </Col>
    )
    return children
  }

  render() {
    return (
      <>
        <Comment
          
          content={
            <Form
              name="advanced_search"
              className="ant-advanced-search-form"
              id="PublishPost"
            >
              <Row gutter={24}>{this.getFields()}</Row>
            </Form>
          }
        />
      </>
    )
  }
}
