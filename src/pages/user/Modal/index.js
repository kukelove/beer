import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input, Modal, Row , Button, Checkbox, Select} from 'antd'
import { withI18n } from '@lingui/react'
import styles from './Modal.less'
import { GENDER_TYPE } from '../../../utils/constant'
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
}
@withI18n()
@Form.create()
@connect(({ app }) => ({ app }))
class MerchantModal extends PureComponent {

  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue, resetFields } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
        type: 0
      }
      onOk(data)
      resetFields()
    })
  }

  formatCity(record) {
    return [record.province, record.city, record.country]
  }

  render() {

    console.log('%c⧭', 'color: #e50000', '跟新modal');
    const {item={}, form, title, app, ...modalProps } = this.props
    const merchantOptions = app.merchants
    const { getFieldDecorator } = form
    return (
      <Modal {...modalProps} footer={false} width={600}>
        <Row className={styles.title}>{item.id ? '编辑' : '添加'}</Row>
        <Form autoComplete="off" layout="horizontal">
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="客户姓名"/>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('gender', {
              initialValue: item.gender,
              rules: [
                {
                  required: true,
                },
              ],
            })( <Select placeholder="性别">
            <Option key={1} value={1}>男</Option>
            <Option key={2} value={2}>女</Option>
            
          </Select>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('birthday', {
              initialValue: item.birthday,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="生日"/>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('phoneNumber', {
              initialValue: item.phoneNumber,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="联系方式"/>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('province', {
              initialValue: item.province,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="省市"/>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: item.address,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="地址"/>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                },
              ],
            })(<Input placeholder="备注"/>)}
          </FormItem>
          
         
          <FormItem  {...formItemLayout}>
            <Button onClick={this.handleOk} className="submit-buttom">确认</Button>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

MerchantModal.propTypes = {
  type: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  item: PropTypes.object,
}

export default MerchantModal
