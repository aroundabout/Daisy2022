import React, { Component } from 'react'
import { Card, List,Tag } from 'antd'
import { EditOutlined, WechatOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class UserTeam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
    var token = JSON.parse(localStorage.getItem('token')).token
    axios
      .get('/user/groups', { headers: { token: token } })
      .then((res) => {
        console.log(res)
        this.setState({
          data: res.data.detail,
        })
        console.log(this.state.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <List
          style={{ margin: 20}}
          grid={{ gutter: 20, column: 3 }}
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.group.name}
                extra={
                  <div>
                    {/* <Link
                      to={{
                        pathname: '/editteam/' + item.group.name,
                        query: {
                          GroupId: item.group.groupId,
                          ProjectId: item.group.projectId,
                          Account: this.state.account,
                        },
                      }}
                    >
                      <EditOutlined />
                    </Link> */}
                    <Link
                      to={{
                        pathname: '/teamChat/account=' + JSON.parse(localStorage.getItem('userData')).account,
                        query: {
                          GroupId: item.group.groupId,
                          ProjectId: item.group.projectId,
                          Account: this.state.account,
                        }
                      }}
                    >
                      <WechatOutlined />
                    </Link>
                  </div>
                }
              >
                <p>简介：{item.group.introduction}</p>
                <p>成员:</p>
                <div>
                  {
                    item.userList.map((citem, index) => (
                      <Tag>{citem}</Tag>
                    ))
                  }
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
