import React, { PureComponent } from 'react'
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page, ImageUpload} from 'components'
import {Form, Input, Switch, Button, Select} from 'antd'
import styles from './index.less'
import 'react-quill/dist/quill.snow.css'; // ES6
import services from '../../services/index'

const Option = Select.Option

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
// @withI18n()
@connect(({ message, loading }) => ({ message, loading }))
@Form.create()
class AddMessage extends PureComponent {


  componentDidMount() {
    const that = this;
    const { setFieldsValue} = this.props.form
    const { location } = this.props;
    if(location.query && location.query.id) {
      // 查找id
      services.findmessage(location.query.id).then((res)=>{
        that.state.edit = res
        setFieldsValue(res)
      })
    }
  }

  state = {
    text: '',
  }

  handleOk = () => {
    const {form ,dispatch} = this.props
    const { validateFields, getFieldsValue, } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = { ...getFieldsValue(), content: this.state.text }
      console.log(data)
      // onOk(data)
      data.content = this.state.text;
      if(this.state.edit.id) {
        dispatch({
          type: 'message/updateMessage',
          payload: {...data, id: this.state.edit.id},
        })
      }else {
        dispatch({
          type: 'message/createMessage',
          payload: data,
        })
      }
      
    })
  }

  handleChange= (value) => {
    this.setState({ text: value })
  }
    
  render() {
    const { getFieldDecorator } = this.props.form
    const { galleryNameList } = this.props.message

    return (
      <Page inner>
        <div className={styles.editPanel}>
          <Form {...formItemLayout}>
            <Form.Item label="系列标题">
              {getFieldDecorator('title', {
                rules: [{
                    required: true,
                  },
                ],
              })(<Input style={{width: '480px'}}/>)}
            </Form.Item>
            <Form.Item label="正文标题">
              {getFieldDecorator('description', {
                rules: [{
                    required: true,
                  },
                ],
              })(<Input style={{width: '480px'}}/>)}
            </Form.Item>
            <Form.Item label="上传封面">
              {getFieldDecorator('image', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<ImageUpload count={1}/>)}
            </Form.Item>
            <Form.Item label="正文内容">
              <ReactQuill value={this.state.text} onChange={this.handleChange} />
            </Form.Item>
            {/* <Form.Item label="首页显示">
              {getFieldDecorator('status', { valuePropName: 'checked' })(<Switch />)}
            </Form.Item> */}
            <Form.Item label="所在列表">
              {getFieldDecorator('galleryListId', {
                rules: [{
                    required: true,
                  },
                ],
              })(
              <Select style={{width: '480px'}}>
                {galleryNameList.map(item=>{
                  return <Option key={item.id} value={item.id}>{item.name}</Option>
                })}
              </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button onClick={()=>this.handleOk()} className={styles.submit}> 确认提交 </Button>
            </Form.Item>
          </Form>
        </div>
      </Page>
    )
  }
}

AddMessage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default AddMessage