import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

export default class MyMenuItem extends Component {
  render() {
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="team">
            <Link to={'/personal/account=' + this.props.account + '/team'}>
              我的队伍
            </Link>
          </Menu.Item>
          <Menu.Item key="comp">
            <Link to={'/personal/account=' + this.props.account + '/comp'}>
              我的比赛
            </Link>
          </Menu.Item>
          <Menu.Item key="applied">
            <Link to={'/personal/account=' + this.props.account + '/applied'}>
              我的申请
            </Link>
          </Menu.Item>
          <Menu.Item key="received">
            <Link to={'/personal/account=' + this.props.account + '/received'}>
              我的审核
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
