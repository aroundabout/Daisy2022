import React, { Component } from 'react'

export default class CompetitionInformation extends Component {
  render() {
    return (
      <div className={'CompetitionInformation'}>
        <h1>比赛简介</h1>
        <h2>{this.props.compInformation}</h2>
        <h3>参与人数:{this.props.compParticipantsNumber}</h3>
        <h3>开始时间:{this.props.compStartTime}</h3>
        <h3>结束时间:{this.props.compEndTime}</h3>
      </div>
    )
  }
}
