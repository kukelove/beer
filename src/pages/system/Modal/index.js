import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Input, Modal, Row , Button, Checkbox, Select } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './Modal.less'

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
        type: 3
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
            })(<Input placeholder="人员姓名"/>)}
          </FormItem>
          <div id="cityCascader">
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('phoneNumber', {
              initialValue: item.phoneNumber,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="联系电话"/>)}
          </FormItem>
          </div>
        { !item.id && <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="请输入密码"/>)}
          </FormItem>}
          <FormItem {...formItemLayout}>
            {getFieldDecorator('merchantId', {
              initialValue: item.merchantId || merchantOptions[0].id,
              rules: [
                {
                  required: true,
                },
              ],
            })(
            <Select placeholder="所属门店">
              {
                merchantOptions.map(item=>{
                  return <Option key={item.id} value={item.id}>{item.name}</Option>
                })
              }
              
            </Select>)}
          </FormItem>
          <div className={styles.privilage}>拥有权限</div>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('privilage', {
              initialValue: item.privilage,
              rules: [
                {
                  required: true,
                },
              ],
            })(
            <CheckboxGroup
            >
              <Checkbox  value={1}>门店管理
              </Checkbox>
              <Checkbox  value={2}>会员管理
              </Checkbox>
              <Checkbox  value={3}>卡券管理
              </Checkbox>
              <Checkbox  value={4}>页面配置
              </Checkbox>
            </CheckboxGroup>
            )}
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
