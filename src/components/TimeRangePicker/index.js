import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { TimePicker} from 'antd';
import styles from './index.less'
const format = 'HH:mm';


export default class TimeRangePicker extends Component {

  state = {
  }

  onchangeBeginHandle = (value) => {
    const endTime = this.props.value? this.props.value.split(',')[1]: '21:00'
    this.props.onChange(value.format(format) + ',' + endTime)
  }

  onchangeEndHandle = (value) => {
    // this.props.onChange(this.state.timeRange.toString())
    const startTime = this.props.value? this.props.value.split(',')[0]: '8:00'
    this.props.onChange(startTime + ',' + value.format(format))
  }

  render() {
    const data  = this.props.value? this.props.value.split(',') : ['08:00', '21:00']
    const startTime = data[0]
    const endTime = data[1]

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
