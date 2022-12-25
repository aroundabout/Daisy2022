import React, { Component } from 'react'
import Highlighter from 'react-highlight'
import { Card, Table, Button, Space, Input, Popconfirm, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import QuestionPage from '../../components/admin/questionEditPop'
import axios from 'axios'
import moment from 'moment'

const { Search } = Input

// s<e = true
function checkTime(stime, etime) {
  //通过replace方法将字符串转换成Date格式
  var sdate = new Date(Date.parse(stime.replace(/-/g, '/')))
  var edate = new Date(Date.parse(etime.replace(/-/g, '/')))

  //获取两个日期的年月日
  var smonth = sdate.getMonth() + 1
  var syear = sdate.getFullYear()
  var sday = sdate.getDate()

  var emonth = edate.getMonth() + 1
  var eyear = edate.getFullYear()
  var eday = edate.getDate()
  //从年，月，日，分别进行比较
  if (syear > eyear) {
    return false
  } else if (syear < eyear) {
    return true
  } else {
    if (smonth > emonth) {
      return false
    } else if (smonth < emonth) {
      return true
    } else {
      if (sday > eday) {
        return false
      } else {
        return true
      }
    }
  }
}

function getTags(start, end, now) {
  if (checkTime(now, start)) {
    return '未开始'
  } else if (checkTime(end, now)) {
    return '已结束'
  }
  return '进行中'
}

export default class QuestionManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, //载入
      searchText: '', //搜索文字
      searchedColumn: '', //搜出来的行
      searchProjectIdText: '', //搜索文字
      data: [],
    }
    
  }

  deleteNode = (id) => {
    var ndata = this.state.data
    console.log('ndata', ndata)
    delete ndata[0]
    console.log('ndata', ndata)
    // for(var i = 0; i<this.state.data.length; i++){
    //   if(this.state.data[i].id == id){
    //     ndata.slice(i,1)
    //     this.setState({
    //       data: ndata,
    //     })

    //     break
    //   }
    // }
  }

  onSearch = (value) => {
    console.log(value)
    this.setState({
      searchProjectIdText:value
    })
    var token = JSON.parse(localStorage.getItem('token')).token
    var requestUrl = 'choiceQuestionList/' + value
    axios
      .get(requestUrl, { headers: { token: token } })
      .then((res) => {
        var tempData = []
        for (var i = 0; i < res.data.detail.length; i++) {
          var tempTemp = {
            questionId: res.data.detail[i].questionId,
            question: res.data.detail[i].question,
            answerA: res.data.detail[i].answerA,
            answerB: res.data.detail[i].answerB,
            answerC: res.data.detail[i].answerC,
            answerD: res.data.detail[i].answerD,
            answerRight: res.data.detail[i].answerRight,
            score: res.data.detail[i].score,
            tags: res.data.detail[i].level,
          }
          tempData.push(tempTemp)
        }
        this.setState({
          data: tempData,
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    const columns = [
      {
        title: '题目id',
        dataIndex: 'questionId',
        key: 'questionId',
        render: (text) => <a>{text}</a>,
        ...this.getColumnSearchProps('questionId'),
      },
      {
        title: '问题内容',
        dataIndex: 'question',
        key: 'question',
        render: (text) => <a>{text}</a>,
        ...this.getColumnSearchProps('question'),
      },
      {
        title: '选项A',
        dataIndex: 'answerA',
        key: 'answerA',
        render: (text) => <a>{text}</a>,
        ...this.getColumnSearchProps('answerA'),
      },
      {
        title: '选项B',
        dataIndex: 'answerB',
        key: 'answerB',
        render: (text) => <a>{text}</a>,
        ...this.getColumnSearchProps('answerB'),
      },
      {
        title: '选项C',
        dataIndex: 'answerC',
        key: 'answerC',
        render: (text) => <a>{text}</a>,
        ...this.getColumnSearchProps('answerC'),
      },
      {
        title: '选项D',
        dataIndex: 'answerD',
        key: 'answerD',
        render: (text) => <a>{text}</a>,
        ...this.getColumnSearchProps('answerD'),
      },
      {
        title: '正确选项',
        dataIndex: 'answerRight',
        key: 'answerRight',
        render: (text) => <a>{text}</a>,
        ...this.getColumnSearchProps('answerRight'),
      },
      {
        title: '分值',
        dataIndex: 'score',
        key: 'score',
        render: (text) => <a>{text}</a>,
        ...this.getColumnSearchProps('score'),
      },
      {
        title: '难度',
        key: 'tags',
        dataIndex: 'tags',
        filters: [
          {
            text: 'EASY',
            value: 'easy',
          },
          {
            text: 'MIDDLE',
            value: 'middle',
          },
          {
            text: 'HARD',
            value: 'hard',
          },
        ],
        onFilter: (value, record) => record.tags.indexOf(value) === 0,
        render: (tags) => {
          let color = 'geekblue'
          if (tags === 'easy') {
            color = 'green'
          } else if (tags === 'hard') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tags}>
              {tags}
            </Tag>
          )
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Popconfirm
              title="确认删除此题目？"
              onCancel={() => {
                console.log('cancel')
              }}
              onConfirm={() => {
                console.log('confirm')
                console.log("record.id",record.questionId)
                var token = JSON.parse(localStorage.getItem('token')).token
                axios.delete(`choiceQuestion/${record.questionId}`, {
                  headers: { token: token },
                })
                this.deleteNode(record.id)
              }}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ]
    return (
      <Card
        title="练习题管理"
        extra={
          <div style={{ display: 'flex' }}>
            <Search
              placeholder="输入比赛编号查询对应的题目"
              allowClear
              onSearch={this.onSearch}
              style={{ width: 300, marginRight: 30 }}
            />
            <QuestionPage />
          </div>
        }
      >
        <Table columns={columns} bordered dataSource={this.state.data} />
      </Card>
    )
  }

  //刷新
  reload = () => {
    this.setState({ loading: true })
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      })
    }, 1000)
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  //搜索
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100)
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex
        ? // <Highlighter
          //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          //   searchWords={[this.state.searchText]}
          //   autoEscape
          //   textToHighlight={text ? text.toString() : ''}
          // />
          text
        : text,
  })

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    })
  }

  handleReset = (clearFilters) => {
    clearFilters()
    this.setState({ searchText: '' })
  }
}
