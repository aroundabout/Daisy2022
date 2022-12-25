import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
// import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { Layout, Menu, Space, Divider } from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  RadarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import logo from './logo-re.png'
import { isLogined, clearToken } from '../../utils/auth'
import LogoutHeaderNav from './LogoutHeaderNav'
import '../../style/comm/HeaderNav.css'

const { SubMenu } = Menu
class HeaderNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //   isLogin: false,
      islog: false,
    }
    this.logoutClick = this.logoutClick.bind(this)
  }

  logoutClick() {
    clearToken()
    setTimeout(() => {
      this.setState({
        islog: false,
      })
    })
    window.location.href = '#/login'
  }
  render() {
    this.state.islog = isLogined()
    return this.state.islog ? (
      <div>
        <Layout>
          <Space
            size={20}
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              background: 'white',
            }}
          >
            <div
              className="logo"
              style={{ margin: '0,100px', position: 'relative', left: '50%' }}
            >
              <NavLink to="home">
                <img height={'40px'} src={logo} alt="logo" />
              </NavLink>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
              <Menu
                id="headerNav"
                style={{ position: 'relative', width: '100%', left: '15%' }}
                mode="horizontal"
              >
                <Menu.Item
                  key="home"
                  icon={<HomeOutlined />}
                  style={{ margin: '0 50px' }}
                >
                  <a
                    href="#/homePage"
                    rel="noopener noreferrer"
                  >
                    首页
                  </a>
                </Menu.Item>

                <Menu.Item
                  key="compPage"
                  icon={<RadarChartOutlined />}
                  style={{ margin: '0 50px' }}
                >
                  <a
                    href="#/allCompPage"
                    rel="noopener noreferrer"
                  >
                    比赛
                  </a>
                </Menu.Item>

                {/*<Menu.Item*/}
                {/*  key="chatPage"*/}
                {/*  icon={<RadarChartOutlined />}*/}
                {/*  style={{ margin: '0 50px' }}*/}
                {/*>*/}
                {/*  <a*/}
                {/*    href={*/}
                {/*    '#/teamChat/account=' +*/}
                {/*    (JSON.parse(localStorage.getItem('userData'))*/}
                {/*      ? JSON.parse(localStorage.getItem('userData')).account*/}
                {/*      : null)*/}
                {/*  }*/}
                {/*    target="_blank"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*  >*/}
                {/*    聊天*/}
                {/*  </a>*/}
                {/*</Menu.Item>*/}

                <SubMenu
                  icon={<UserOutlined />}
                  style={{ margin: '0 50px' }}
                  key="personalMenu"
                  title={'我的'}
                >
                  <Menu.Item key="userHome">
                    <a
                      href={
                        '#/personal/account=' +
                        (JSON.parse(localStorage.getItem('userData'))
                          ? JSON.parse(localStorage.getItem('userData')).account
                          : null)
                      }
                      rel="noopener noreferrer"
                    >
                      个人主页
                    </a>
                  </Menu.Item>
                  <Menu.Item key="userTeam">
                    <a
                      href={
                        '#/personal/account=' +
                        (JSON.parse(localStorage.getItem('userData'))
                          ? JSON.parse(localStorage.getItem('userData')).account
                          : null) +
                        '/team'
                      }
                      rel="noopener noreferrer"
                    >
                      我的队伍
                    </a>
                  </Menu.Item>
                  <Menu.Item key="userComp">
                    <a
                      href={
                        '#/personal/account=' +
                        (JSON.parse(localStorage.getItem('userData'))
                          ? JSON.parse(localStorage.getItem('userData')).account
                          : null) +
                        '/comp'
                      }
                      rel="noopener noreferrer"
                    >
                      我的比赛
                    </a>
                  </Menu.Item>
                  <Menu.Item key="userCollege">
                    <a
                      href={
                        '#/personal/account=' +
                        (JSON.parse(localStorage.getItem('userData'))
                          ? JSON.parse(localStorage.getItem('userData')).account
                          : null) +
                        '/colle'
                      }
                      rel="noopener noreferrer"
                    >
                      我的收藏
                    </a>
                  </Menu.Item>
                </SubMenu>

                <Menu.Item
                  key="home"
                  icon={<HomeOutlined />}
                  style={{ margin: '0 50px' }}
                >
                  <a
                    href="#/community"
                    rel="noopener noreferrer"
                  >
                    社区
                  </a>
                </Menu.Item>

                <Menu.Item
                  key="signOut"
                  icon={<LogoutOutlined />}
                  style={{ left: '100px', float: 'right' }}
                  onClick={this.logoutClick}
                >
                  登出
                </Menu.Item>
              </Menu>
            </div>
          </Space>
        </Layout>

        <Divider
          style={{ position: 'fixed', zIndex: 1, width: '100%', top: 23 }}
        />
        <Divider
          style={{ position: 'fixed', zIndex: 1, width: '100%', top: 23 }}
        />
        <Divider
          style={{ position: 'fixed', zIndex: 1, width: '100%', top: 24 }}
        />
      </div>
    ) : (
      <LogoutHeaderNav />
    )
  }
}

export default HeaderNav
