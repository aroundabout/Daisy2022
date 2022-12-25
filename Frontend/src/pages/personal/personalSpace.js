import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import MastHead from '../../components/personal/mastHead'
import HeaderNav from '../../components/comm/HeaderNav'
import { Layout, Divider } from 'antd'
import '../../style/personal/personalSpace.css'
import { personalRoutes } from '../../routes/index'
import OtherMenuItem from '../../components/personal/otherMenuItem'
import MyMenuItem from '../../components/personal/myMenuItem'
import Footer from '../../components/comm/Footer'
import { isLogined } from '../../utils/auth'
import Axios from 'axios'
import styles from './Center.less'
import { Card } from 'antd'
import UserComp from './userComp'
import UserTeam from './userTeam'
import ReceivedApplication from './userReceivedApplication'
import AppliedApplication from './userAppliedApplication'
const operationTabList = [
  {
    key: 'teams',
    tab: (
      <span>
        队伍{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        比赛{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
  {
    key: 'applied',
    tab: (
      <span>
        发出申请{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
  {
    key: 'received',
    tab: (
      <span>
        收到申请{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
]

export default class PersonalSpace extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      account: this.props.match.params.account,
      tabKey: 'teams',
      role: false,
    }

    if (!isLogined()) {
      this.setState({ role: false })
    } else {
      var logined = JSON.parse(localStorage.getItem('userData')).account
      this.setState({ role: logined === this.props.match.params.account })
    }
  }
  onTabChange = (key) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    })
  }
  renderChildrenByTabKey = (tabKey) => {
    if (tabKey === 'projects') {
      return <UserComp />
    }

    if (tabKey === 'teams') {
      return <UserTeam />
    }

    if (tabKey === 'applied') {
      return <AppliedApplication />
    }

    if (tabKey === 'received') {
      return <ReceivedApplication />
    }
    return null
  }

  render() {
    const { tabKey } = this.state
    return (
      <div className="whole_page">
        <HeaderNav />
        <div id="perspace_content">
          <div id="mastHead">
            <MastHead role={this.state.role} account={this.state.account} />
          </div>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={this.onTabChange}
          >
            {this.renderChildrenByTabKey(tabKey)}
          </Card>
        </div>
        <Footer />
      </div>
    )
  }
}
