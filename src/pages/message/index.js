import React, { PureComponent } from 'react'
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page, ImageUpload} from 'components'
import {Form, Input, Switch, Button} from 'antd'
import styles from './index.less'
import 'react-quill/dist/quill.snow.css'; // ES6

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
// @connect(({ merchant, loading }) => ({ merchant, loading }))
@Form.create()
class AddMessage extends PureComponent {
    
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Page inner>
        <div className={styles.editPanel}>
          <Form {...formItemLayout}>
            <Form.Item label="系列标题">
              {getFieldDecorator('name', {
                rules: [{
                    required: true,
                  },
                ],
              })(<Input style={{width: '480px'}}/>)}
            </Form.Item>
            <Form.Item label="正文标题">
              {getFieldDecorator('subtitle', {
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
              })(<ImageUpload/>)}
            </Form.Item>
            <Form.Item label="正文内容">
              {getFieldDecorator('description', {
                rules: [{
                    required: true,
                  },
                ],
              })( <ReactQuill/>)}
            </Form.Item>
            <Form.Item label="首页显示">
              {getFieldDecorator('status', { valuePropName: 'checked' })(<Switch />)}
            </Form.Item>
            <Form.Item label="所在列表">
              {getFieldDecorator('bannerId', {
                rules: [{
                    required: true,
                  },
                ],
              })(<Input style={{width: '480px'}}/>)}
            </Form.Item>
            <Form.Item>
              <Button className={styles.submit}> 确认提交 </Button>
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