import React, { Component } from 'react'
import { List, Col, Pagination } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'

export default class CompetitionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      total: 0,
      currentData: [],
      pageSize: 5,
      pageNumber: parseInt(window.location.hash.slice(-1), 0) || 1, //获取当前页面的hash值，转换为number类型
    }
    var token = JSON.parse(localStorage.getItem('token')).token
    axios
      .get('projects', { headers: { token: token } })
      .then((response) => {
        console.log(response)
        this.setState({
          total: response.data.detail.length,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    //页面刷新时回到刷新前的page
    this.handleAnchor()
  }

  handleAnchor() {
    this.onPageChange(this.state.pageNumber, this.state.pageSize) //手动调用onPageChange,传入当前页数和每页条数
  }

  onPageChange = (page, pageSize) => {
    console.log('page:', page)
    this.setState(
      {
        pageNumber: page,
      },
      () => {
        window.location.hash = `#/allCompPage/pagenum=${page}` //设置当前页面的hash值为当前page页数
      }
    )
    var token = JSON.parse(localStorage.getItem('token')).token
    axios.get('projects', { headers: { token: token } }).then((response) => {
      this.setState((state) => {
        console.log(response.data.detail)
        for (let i = 0; i < this.state.pageSize; i++) {
          state.currentData.pop()
        }
        if (
          (page - 1) * this.state.pageSize + this.state.pageSize <=
          response.data.length
        ) {
          for (
            let i = (page - 1) * this.state.pageSize;
            i < (page - 1) * this.state.pageSize + this.state.pageSize;
            i++
          ) {
            state.currentData.push(response.data.detail[i])
          }
        } else {
          for (
            let i = (page - 1) * this.state.pageSize;
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
  }

  render() {
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.currentData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a href={'#/compPage/id=' + item.projectId + '/'}>
                    {item.name}
                  </a>
                }
              />
              {item.introduction}
            </List.Item>
          )}
        />
        <Col offset={9}>
          <Pagination
            showQuickJumper
            current={this.state.pageNumber}
            defaultPageSize={this.state.pageSize}
            total={this.state.total}
            onChange={this.onPageChange}
          />
        </Col>
      </div>
    )
  }
}
