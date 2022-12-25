import React, { Component } from 'react'
import { Button } from 'antd'
import { SmileTwoTone } from '@ant-design/icons'

export default class FindTeamButton extends Component {
  render() {
    return (
      <div>
        <a href={'#/findteam/id=' + this.props.compID}>
          <Button type="primary" icon={<SmileTwoTone />}>
            组队
          </Button>
        </a>
        <a
          href={'#/projectTrain/id=' + this.props.compID}
          style={{ marginLeft: 20 }}
        >
          <Button type="primary" icon={<SmileTwoTone />}>
            训练
          </Button>
        </a>
      </div>
    )
  }
}
