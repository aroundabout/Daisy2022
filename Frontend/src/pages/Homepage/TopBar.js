import React, { Component } from 'react'
import { Row, Col } from 'antd'
import 'antd/dist/antd.css'
import CommunityShow from './CommunityShow'

class TopBar extends Component {
  render() {
    return (
      <div
        style={{
          margin: '160px 150px 40px 150px',
          // ,border:'2px gray solid'
        }}
      >
        {/* 24栅栏 2:3 → 9:15 */}
        <Row>
          <Col span={22} offset={1}>
            <CommunityShow />
          </Col>
        </Row>
      </div>
    )
  }
}

export default TopBar
