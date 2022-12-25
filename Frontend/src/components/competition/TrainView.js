import React, { Component } from 'react'
import { List, Radio, Space, Button,Alert,Modal } from 'antd'
import { Pagination } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'

let ProjectId
export default class TrainView extends Component {
  constructor(props) {
    super(props)
    ProjectId = this.props.matchId
    this.state = {
      currentData: [],
      question: [],
      ans: [],
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    var token = JSON.parse(localStorage.getItem('token')).token
    var requesturl = 'choiceQuestionList/' + ProjectId
    axios
      .get(requesturl, { headers: { token: token } })
      .then((response) => {
        console.log(response)
        console.log(ProjectId)
        this.setState({
          question: response.data.detail,
          ans: new Array(response.data.detail.length).fill(0),
        })
      })
      .catch((error) => {
        console.log(error)
        window.alert('连接出现问题，点击确定跳转回主页')
        window.location.hash = '#/home'
      })
  }

  onChange(e, index) {
    console.log('radio checked', e.target.value)
    console.log('index', index)
    this.setState((state) => {
      state.ans[index] = e.target.value
    })
    console.log('satt', this.state.ans[index])
  }

  onSubmit(){
    console.log("onsubmit")
    let score = 0;
    let total = 0;
    let wrongMsg = "";
    for(let i = 0; i < this.state.ans.length; i++){
      total += this.state.question[i].score;
      if(this.state.ans[i] == this.state.question[i].answerRight){
        score += this.state.question[i].score;
      }
      else{
        wrongMsg += ' [第'+i+'题应为'+this.state.question[i].answerRight+'] ';
      }
    }
    if(score == total){
      Modal.success({
        title: '恭喜你全部正确!',
        content: '相对得分是 : '+100 * score / total,
      })
    }
    else{
      Modal.error({
        title: '有错误!!',
        content: '相对得分是 : '+100 * score / total +wrongMsg,
      })
    }
    
  }

  render() {
    const agriculturalListData = this.state.currentData
    return (
      <div id="SEEme" style={{ padding: '10px' }}>
        <List
          size="large"
          header={<div>比赛训练题目 -- 比赛编号{ProjectId}</div>}
          footer={
            <div>
              <Button
                type="primary"
                onClick={() => {
                  this.onSubmit()
                }}
                style={{ marginBottom: 10 }}
              >
                提交
              </Button>
            </div>
          }
          bordered
          dataSource={this.state.question}
          renderItem={(item, index) => (
            <List.Item>
              第{index + 1}题 : {item.question}  --  分值: {item.score}
              <div>
                <Radio.Group
                  onChange={(value) => {
                    this.onChange(value, index)
                  }}
                >
                  <Space direction="vertical">
                    <Radio value={"A"}>A {item.answerA}</Radio>
                    <Radio value={"B"}>B {item.answerB}</Radio>
                    <Radio value={"C"}>C {item.answerC}</Radio>
                    <Radio value={"D"}>D {item.answerD}</Radio>
                  </Space>
                </Radio.Group>
              </div>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
