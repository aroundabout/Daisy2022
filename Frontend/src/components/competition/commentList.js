//
// made by ykn
//
import { Comment, List,Avatar } from 'antd';

import React, { Component } from 'react'
import '../../style/comm/comm.css'
import 'antd/dist/antd.css';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import '../../style/comm/comm.css'
import  ToComment from '../../components/community/ToComment'
import { Collapse } from 'antd';
import 'antd/dist/antd.css';
import '../../style/community/Comment.css'
import Axios from 'axios';
import {isLogined} from '../../utils/auth'
import Loading from './Loading'


const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;



export default class CommentList extends Component {

    constructor(props){
        super(props)
        var tempId=this.props.momentId
        this.submitComment=this.submitComment.bind(this)
        this.childCreateComment=this.childCreateComment.bind(this)
        this.createReply=this.createReply.bind(this)
        //这里根据tempid请求数据

        this.state={
          renderAdComponent:[],
          data:[],
          Pid:tempId,
          isLoading:true,
          image:''
         }
         this.updateADComp()
      }

      componentDidMount(){
        var url='/reply/projectId/'+this.state.Pid
        console.log(url)
        var token = JSON.parse(localStorage.getItem('token')).token
        Axios.get(url,
          {
            headers:{token:token}
          }).then((res)=>{
          // console.log("get daole :",res.data.detail)
          var result=res.data.detail
          for(var i=0;i<result.length;i++){
            result[i].time=this.deleteLetter(result[i].time)
          }
          console.log("保存下来的：",result)
          this.setState({data:result})
          this.setState({isLoading:false})
        })
      }

      deleteLetter(str) {
        if(str===undefined){
          str="this is undefined"
        }
        var result;
      
        var reg = /[a-zA-Z]+/;  //[a-zA-Z]表示匹配字母，g表示全局匹配
      
        while (result = str.match(reg)) { //判断str.match(reg)是否没有字母了
      
          str = str.replace(result[0], ' '); //替换掉字母  result[0] 是 str.match(reg)匹配到的字母
      
        }
        return str;
      }



      createReply(content,isReply){
        if(isLogined()){

          var t=moment().format('YYYY-MM-DDTHH:mm:ssC')
          if(isReply!=-1){
            var CommentId=isReply
            var json=
            {
              account:JSON.parse(localStorage.userData).account.toString(),
              content:content,
              time:t
            }
          }else{
            var CommentId=Number(this.state.Pid)
            var json=
            {
              account:JSON.parse(localStorage.userData).account.toString(),
              content:content,
              time:t
            }
          }

          console.log("to reply data",json)
          
          var token = JSON.parse(localStorage.getItem('token')).token
          Axios.post('/reply/replyId/'+CommentId,json,
            {
              headers: { token:token },
            }
            ).then((res)=>{
              console.log(res)
            window.location.reload()
          })
        }
        else{
          window.alert("未登录，跳转至登陆界面")
          window.location.hash='#/login'
        }
      }

      updateADComp(){
        let temp=this.state.data.length
       // console.log(temp)
        for(let i=0;i<temp;i++){
          let tmp=this.state.renderAdComponent
          tmp.push(false)
          this.setState({
            renderAdComponent:tmp
          })
        }
    //    console.log(this.state.renderAdComponent)
      }

      childCreateComment(content){
        this.props.createComment(content)
      }

      submitComment(index){
     //   console.log(index)
      //  console.log("i am clicked")
        this.changeRenderADComp(index)
      }

      changeRenderADComp(index){
        let ans=this.state.renderAdComponent
        ans[index]=!ans[index]
        this.setState({
          renderAdComponent:ans
        })
      }

    render() {      
      //初始化render数组状态
      var objArr=this.state.data
      console.log("obj data",objArr)
        return (
            this.state.isLoading?<Loading />:
            <div id="firstLayer">
                {
                  objArr.map((item,index)=>(

                    <li style={{listStyle:"none"}} key={item+index}>
                      <Comment
                      className='middle'
                      actions={
                        [] 
                          // [
                          //   <span 
                          //       className="replyList"
                          //       key="comment-list-reply-to-0" 
                          //       onClick={this.submitComment.bind(this,index)}
                          //       >                                           
                          //       Reply to
                          //   </span>,                            
                          // ]
                        }
                      author={item.account}
                      avatar={
                        <a href={'#/personal/account='+item.account}>
                        <Avatar
                          src={item.avatar}
                        />
                        </a>
                      }
                      content={item.content}
                      datetime={item.time}
                      >
                   
                      </Comment>
                    </li>
                  ))
                }


                 
            </div>
        )
    }

    
}
