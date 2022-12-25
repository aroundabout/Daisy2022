import React, { Component } from 'react'
import { Card, List, Drawer, Button, Alert } from 'antd'
import { Form, Col, Row, Input, Select, DatePicker } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { isLogined } from '../../utils/auth'
import { CheckCircleTwoTone, NotificationOutlined } from '@ant-design/icons'

//import CONSTURL from '../../components/community/config';
import axios from 'axios'
const { Option } = Select

const onAlertClose = (e) => {
  console.log(e, 'I was closed.')
  window.location.reload()
}

export default class ReceivedApplication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      data: [],
      applications: [],
      visible: false,
      flag: '',
      choice: '',
      curruntApplication: -1,
      selectResult:0
    }
    var token = JSON.parse(localStorage.getItem('token')).token

    axios
      .get(`user/applicationsReceived`, { headers: { token: token } })
      .then((res) => {
        console.log(res)
        if(res.success){
          this.setState({ data: res.data.detail })
        }else{
          this.setState({ data:[] })

        }
      })

  }

  showDrawer = (index) => {
    this.setState({
      curruntApplication: index,
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  handleClick(item) {
    var token = JSON.parse(localStorage.getItem('token')).token
    console.log(item,this.state.selectResult)
    axios.patch(
      '/groups/' + item.groupId +
      '/applications/' + item.applicationId +
      '/result/' + this.state.selectResult +
      '/account/' + item.account, "body",
      { headers: { token: token } }
    ).then((response)=>{
      console.log(response)
    })
    this.onClose()
  }
  handleChange(val){
    console.log(val)
    this.setState({selectResult:val})
  }

  render() {
    console.log(this.state.data)
    const listData = this.state.data
    const ApplicationResult = ['审核', '通过', '未通过']
    return (
      <div>
        <List
          itemLayout="vertical"
          dataSource={this.state.data}
          renderItem={(item, index) => (
            <List.Item>
              <Row>
                <Col span={18}>
                  <List.Item.Meta
                    //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={
                      <a href={'#/personal/account=' + item.account}>
                        {item.account}申请加入你的小队！
                      </a>
                    }
                    description={'小队id：' + item.groupId}
                    style={{ width: '50%' }}
                  >
                  </List.Item.Meta>
                </Col>

                <Col span={6}>
                  <Button
                    onClick={() => { this.showDrawer(index) }}
                    disabled={item.result!=0}
                  >
                    {ApplicationResult[item.result]}
                  </Button>
                  <Drawer
                    title="是否允许该用户加入小队？"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                  >
                    <Form layout="vertical" hideRequiredMark
                      onFinish={() => {
                        console.log()
                        console.log(this.state.data[this.state.curruntApplication])
                        this.handleClick(this.state.data[this.state.curruntApplication])
                      }}>
                      <Form.Item>
                        <Select
                          defaultValue="0"
                          style={{ width: 120 }}
                          onChange={this.handleChange.bind(this)}
                        >
                          <Option value="0">同意</Option>
                          <Option value="1">拒绝</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </Drawer>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
