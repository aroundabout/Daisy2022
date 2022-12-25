import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Layout, List, Row } from 'antd'
import Axios from 'axios'

const { Header, Content } = Layout

class CommunityShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentData: [],
      isLoaded: false,
      ava: '../../img/avatar/ava.jpg',
    }
  }

  componentDidMount() {
    const _this = this //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    var token = JSON.parse(localStorage.getItem('token')).token
    Axios.get('notice', { headers: { token: token } })
      .then(function (response) {
        console.log(response)
        _this.setState({
          currentData: response.data.detail,
          isLoaded: true,
        })
      })
      .catch(function (error) {
        console.log(error)
        _this.setState({
          isLoaded: false,
          error: error,
        })
      })
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading</div>
    } else {
      return (
        <div style={{ width: '80%', marginLeft: '10%' }}>
          <Layout>
            <Header theme="light">
              <Content>
                <Row>
                  <h1 style={{ color: 'white' }}>系统公告</h1>
                </Row>
              </Content>
            </Header>
            <Content>
              <List
                itemLayout="horizontal"
                dataSource={this.state.currentData}
                renderItem={(item) => (
                  <List.Item
                    style={{ paddingLeft: '30px', paddingRight: '30px' }}
                    key={item.noticeId}
                  >
                    <List.Item.Meta
                      title={<h2>{item.title}</h2>}
                      description={
                        <div>
                          <Row>
                            <h3>{item.content}</h3>
                          </Row>
                          <Row>
                            <p>{item.noticeTime}</p>
                          </Row>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Content>
          </Layout>
        </div>
      )
    }
  }
}

export default CommunityShow
