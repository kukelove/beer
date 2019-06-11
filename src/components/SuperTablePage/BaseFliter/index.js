import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Input, Button, Form } from 'antd'
import styles from './Fliter.less'
const Search = Input.Search;

@Form.create()
class Fliter extends PureComponent{

  static defaultProps = {
    addModelButtonText: '添加',
    filterText: '关键字查询',
    onFilterChange: ()=>{ console.log('Fliter onFilterChange: no action')}
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  render() {
    const placeholder = this.props.placeholder || "请输入门名称搜索"
    const { 
      onAdd, 
      form, 
      addModelButtonText,
      filterText } = this.props
    const { getFieldDecorator } = form
    
    

    return (
      <Fragment>
        <Col span={6}>
          {getFieldDecorator('keyword', {
              initialValue: '',
            })(
              <Search 
                onSearch={this.handleSubmit}
                placeholder={filterText} enterButton />
          )}
          
        </Col>
        <Col span={12}>
        {addModelButtonText && <Button onClick={onAdd} className="create-button ml-20">+{this.props.addModelButtonText}</Button>}
        </Col>
      </Fragment>
    )
  }
}

Fliter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  filterText: PropTypes.any,
  addModelButtonText: PropTypes.any,
}


export default Fliter
