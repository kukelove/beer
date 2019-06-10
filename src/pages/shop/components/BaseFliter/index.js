import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Input, Button, Form } from 'antd'
import styles from './Fliter.less'
const Search = Input.Search;

@Form.create()
class Fliter extends PureComponent{

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  render() {
    const placeholder = this.props.placeholder || "请输入门名称搜索"
    const { onAdd, form } = this.props
    const { getFieldDecorator } = form
    
    

    return (
      <Fragment>
        <Col span={6}>
          {getFieldDecorator('keyword', {
              initialValue: '',
            })(
              <Search 
                onSearch={this.handleSubmit}
                placeholder={placeholder} enterButton />
          )}
          
        </Col>
        <Col span={12}><Button onClick={onAdd} className="create-button ml-20">+添加门店</Button></Col>
      </Fragment>
    )
  }
}

Fliter.propTypes = {
  placeholder: PropTypes.string,
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}


export default Fliter
