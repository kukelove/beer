import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Input, Button } from 'antd'
import styles from './Fliter.less'
const Search = Input.Search;

const Fliter = props => {

  const placeholder = props.placeholder || "请输入门名称搜索"
  return (
    <Col span={12}>
      <Search placeholder={placeholder} enterButton />
      <Button className="create-button ml-20">+添加门店</Button>
    </Col>
  )
}

Fliter.propTypes = {
  placeholder: PropTypes.string,
}

export default Fliter
