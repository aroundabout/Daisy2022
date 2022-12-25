//
// made by ykn
//
import React, { Component } from 'react'
import { List, Avatar, Col, Pagination, Space, Button, Input } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import CONSTURL from './config'
import Axios from 'axios';
import Loading from './Loading'
import { isLogined } from '../../utils/auth';
import Unlogined from './Unlogined';

const { Search } = Input;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

Axios.defaults.baseURL = '/api'

export default class MomentList extends Component {
  constructor(props) {
    super(props)

    console.log("默认sourcedata")
    var sourceData = [
    ];
    this.state = {
      data: sourceData,
      copydata:[],
      currentData: [],
      total: 10,//这里的total也是要获取的数据
      pageSize: 10,
      temp: '',
      image: '',
      account: '1',
      pageNumber: parseInt(window.location.hash.slice(-1), 0) || 1 //获取当前页面的hash值，转换为number类型
    }
  }

  componentDidMount() {
    console.log("get moment list")
    this.getMomentList()
  }

  getMomentList() {
    var url = CONSTURL.GetMomentList
    // console.log(url)
    var token = JSON.parse(localStorage.getItem('token')).token
    Axios.get(url, {
      headers: { token: token }
    }).then((res) => {
      console.log("momentlist data:", res.data)
      let len = res.data.detail.length
      for (var i = 0; i < len; i++) {
        console.log(res.data.detail[i])
        res.data.detail[i].time = res.data.detail[i].time.replace('T', ' ')
        res.data.detail[i].time = res.data.detail[i].time.replace('C', ' ')
      }
      
      this.setState({
        data: res.data,
        copydata:res.data
      })
      this.handleAnchor()
    })
  }

  sortByDefault() {
    var temp = this.state.data.detail
    temp.sort(this.sortDefault)
    console.log("ans", temp)
    this.setState({
      data: {
        detail: temp
      }
    })
    this.handleAnchor()
  }

  sortByTime() {
    console.log(this)
    var temp = this.state.data.detail
    console.log("temp:", temp)
    temp.sort(this.sortTime)
    console.log("ans", temp)
    this.setState({
      data: {
        detail: temp
      }
    })
    console.log("result", this.state.data.detail)
    this.handleAnchor()
  }

  sortByLike() {
    console.log(this.state.data.detail)
    var temp = this.state.data.detail
    console.log("temp:", temp)
    temp.sort(this.sortLike)
    console.log("ans", temp)
    this.setState({
      data: {
        detail: temp
      }
    })
    console.log("result", this.state.data.detail)
    this.handleAnchor()
  }

  sortDefault(a, b) {
    return b.moemntId - a.momentId
  }

  sortTime(a, b) {
    if (b.time > a.time) {
      return 1;
    }
    return -1;
  }

  sortLike(a, b) {
    return b.likecount - a.likecount
  }

  onSearch(value){
    var rawdata=this.state.copydata.detail
    var newdata=[]
    for(var i =0;i<rawdata.length;i++){
      if(rawdata[i].title.indexOf(value)!=-1 || rawdata[i].content.indexOf(value)!=-1){
        var t=rawdata[i]
        newdata.push(t)
      }
    }
    this.setState({
      data:{
        detail:newdata
      }
    })
    this.handleAnchor()
  }



  handleAnchor() {
    this.onPageChange(this.state.pageNumber, this.state.pageSize); //手动调用onPageChange,传入当前页数和每页条数
  }

  onPageChange = (page, pageSize,) => {
    //      console.log("page:",page);
    this.setState({
      pageNumber: page
    }, () => {
      window.location.hash = `#/Community/pagenum=${page}`; //设置当前页面的hash值为当前page页数
    })
    this.setState((state) => {
      for (let i = 0; i < state.pageSize; i++) {
        state.currentData.pop()
      }
      for (let i = pageSize * (page - 1); i < state.total && i < pageSize * page; i++) {
        state.currentData.push(this.state.data.detail[i])
      }
      console.log(state.currentData)
      return {
        currentData: state.currentData,
      }
    }
    );

  }



  render() {
    console.log(this.state.data.detail)

    return (
      <div>
        <Space>
          <p>排序：</p>
          <Button  type="primary" onClick={this.sortByDefault.bind(this)}>默认</Button>
          <Button  type="primary" onClick={this.sortByTime.bind(this)}>时间</Button>
          <Button  type="primary" onClick={this.sortByLike.bind(this)}>点赞数</Button>
          <div 
          // style={{marginLeft:'830px'}}
          >
            <Search placeholder="输入搜索内容" onSearch={this.onSearch.bind(this)} enterButton />
          </div>
        </Space>
        <List
          itemLayout="horizontal"
          dataSource={this.state.data.detail}
          renderItem={item => (
            <List.Item
              key={item.momentId}
              actions={[
                <IconText icon={LikeOutlined} text={item.likecount} key="list-vertical-like-o" />,
                <IconText icon={FieldTimeOutlined} text={item.time} key="list-vertical-like-o" />
              ]}
            >
              <List.Item.Meta
                avatar={
                  <a>
                    <Avatar src={item.avatar}
                    />
                  </a>
                }

                //帖子的名字和指向的地址，传一个pid，moment_id
                title={<a href={"#/Moment/" + item.momentId}>{item.title}</a>}

                description={<p>{item.content}</p>}

              />

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

