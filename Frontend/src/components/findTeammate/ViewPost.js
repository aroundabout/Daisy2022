import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import { Pagination } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import Layout from 'antd/lib/layout/layout'

let ProjectId
let PostPerPage = 10
var image
export default class CommunityContent extends Component {
  constructor(props) {
    super(props)
    ProjectId = this.props.matchId
    var token = JSON.parse(localStorage.getItem('token')).token
    this.state = {
      currentData: [],
      total: 0,
      pageSize: PostPerPage,
      pageNumber: parseInt(window.location.hash.slice(1), 0) || 1, //获取当前页面的hash值，转换为number类型
    }
    this.onPageChange = this.onPageChange.bind(this)
    axios
      .get('groups?projectId=' + ProjectId, { headers: { token: token } })
      .then((response) => {
        console.log(response)
        this.setState({
          total: Math.ceil(response.data.detail.length),
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.handleAnchor() //页面刷新时回到刷新前的page
  }
  handleAnchor() {
    this.onPageChange(this.state.pageNumber, this.state.pageSize) //手动调用onPageChange,传入当前页数和每页条数
  }

  onPageChange = (page) => {
    this.setState(
      {
        pageNumber: page,
      },
      () => {
        window.location.hash = `#/findteam/id=${ProjectId}/pagenum=${page}` //设置当前页面的hash值为当前page页数
      }
    )
    var token = JSON.parse(localStorage.getItem('token')).token
    axios
      .get('groups?projectId=' + ProjectId, { headers: { token: token } })
      .then((response) => {
        console.log(response.data.detail)
        this.setState((state) => {
          for (let i = 0; i < PostPerPage; i++) {
            state.currentData.pop()
          }
          if (
            (page - 1) * PostPerPage + PostPerPage <=
            response.data.detail.length
          ) {
            for (
              let i = (page - 1) * PostPerPage;
              i < (page - 1) * PostPerPage + PostPerPage;
              i++
            ) {
              state.currentData.push(response.data.detail[i])
            }
          } else {
            for (
              let i = (page - 1) * PostPerPage;
              i < response.data.detail.length;
              i++
            ) {
              state.currentData.push(response.data.detail[i])
            }
          }
          return {
            currentData: state.currentData,
          }
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState((state) => {
          for (let i = 0; i < PostPerPage; i++) {
            state.currentData.pop()
          }
          return {
            currentData: state.currentData,
          }
        })
      })
  }

  getimag(url) {
    axios.get(url).then((res) => {
      image = res.data
    })
    return image
  }

  render() {
    const agriculturalListData = this.state.currentData
    return (
      <div style={{ padding: '10px' }}>
        <Layout>
          <List
            itemLayout="horizontal"
            dataSource={agriculturalListData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<h2>{item.name}</h2>}
                  description={
                    <a
                      href={
                        '#/PostPage/MatchId=' +
                        ProjectId +
                        '/groupId=' +
                        item.groupId
                      }
                    >
                      查看队伍详情
                    </a>
                  }
                />
              </List.Item>
            )}
          />
          <div id="TurnPage">
            <Pagination
              showQuickJumper
              defaultCurrent={this.state.pageNumber}
              defaultPageSize={this.state.pageSize}
              total={this.state.total}
              onChange={this.onPageChange}
            />
          </div>
        </Layout>
      </div>
    )
  }
}
