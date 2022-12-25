import React, { Component } from 'react'
import { Card, List } from 'antd'
import axios from 'axios'

export default class UserComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
    var token = JSON.parse(localStorage.getItem('token')).token

    axios
      .get('/user/projects', { headers: { token: token } })
      .then((res) => {
        console.log(res.data)
        this.setState({
          data: res.data.detail, // res.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <List
          style={{ margin: 20 }}
          grid={{ gutter: 20, column: 3 }}
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <a href={'#/compPage/id=' + item.projectId + '/'}>
                  {item.name}
                </a>
              </Card>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
