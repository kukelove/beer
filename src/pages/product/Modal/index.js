import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'dva'
import { Form, Input, Modal, Row , Button, DatePicker} from 'antd'
import { withI18n } from '@lingui/react'
import styles from './index.less'
const { RangePicker } = DatePicker;
const FormItem = Form.Item
const dateFormat = 'YYYY/MM/DD';


const formItemLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
}
// @withI18n()
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
      }
      console.log('%c⧭', 'color: #f2ceb6', data);
      // 日期进行处理
      data.startTime = new Date(data.time[0].format(dateFormat))
      data.endTime = new Date(data.time[1].format(dateFormat))
      delete data.time
      data.purchasePoint = Number(data.purchasePoint)
      onOk(data)
      resetFields()
    })
  }

  formatCity(record) {
    return [record.province, record.city, record.country]
  }

  render() {
    
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
            })(<Input placeholder="优惠券名称"/>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('discription', {
              initialValue: item.discription,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="描述"/>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('discountPrice', {
              initialValue: item.discountPrice,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="优惠金额，单位：元"/>)}
          </FormItem>
          
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('time', {
              initialValue: item.time,
              rules: [
                {
                  required: true,
                },
              ],
            })( <RangePicker
              style={{width: '100%'}}
              // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
              format={dateFormat}
            />)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('purchasePoint', {
              initialValue: item.purchasePoint,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="number" placeholder="所需积分"/>)}
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
