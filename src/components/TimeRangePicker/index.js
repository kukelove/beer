import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { TimePicker} from 'antd';
import styles from './index.less'
const format = 'HH:mm';


export default class TimeRangePicker extends Component {

  state = {
    timeRange: ['00:00', '00:00']
  }

  onchangeBeginHandle = (value) => {
    this.state.timeRange[0] = value.format(format)
    this.setState({})
    this.props.onChange(this.state.timeRange.toString())
  }

  onchangeEndHandle = (value) => {
    this.state.timeRange[1] = value.format(format)
    this.setState({})
    this.props.onChange(this.state.timeRange.toString())
  }

  render() {
    const startTime = this.state.timeRange[0]
    const endTime = this.state.timeRange[1]


    return (<Fragment> 
        <TimePicker  
          onChange={this.onchangeBeginHandle} 
          className="time-picker" placeholder="营业时间" 
          format={format} 
          value={moment(startTime, format)}
        />
        <TimePicker 
          onChange={this.onchangeEndHandle} 
          className="time-picker" 
          placeholder="息业时间" 
          format={format} 
          value={moment(endTime, format)} 
        />
      </Fragment>
    )
  }
 
}
TimeRangePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}
