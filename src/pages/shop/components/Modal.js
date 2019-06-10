import React, { PureComponent,Fragment } from 'react'
import PropTypes from 'prop-types'
import { Icon, Form, Input, Modal, Select, Row , Button, Cascader, Col, TimePicker, Upload} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import  { ImageUpload, TimeRangePicker } from 'components/index'
import city from 'utils/city'
import moment from 'moment';

import styles from './Modal.less';

const format = 'HH:mm';
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
class MerchantModal extends PureComponent {

  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        // id: item.id,
      }
      onOk(data)
    })
  }

  render() {
    const uploadProps = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      multiple: true,
    };
    const {item = {}, title, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal {...modalProps} footer={false} width={600} visible={true}>
        <Row className={styles.title}>添加门店</Row>
        <Form autoComplete="off" layout="horizontal">
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              // initialValue: '',
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="店铺名称"/>)}
          </FormItem>
          <div id="cityCascader">
          <FormItem hasFeedback {...formItemLayout}>
         
            {getFieldDecorator('city', { 
                initialValue: '' 
              })(
                <Cascader
                  style={{ width: '100%' }}
                  options={city}
                  placeholder="城市"
                  getPopupContainer={() =>
                    document.getElementById('cityCascader')
                  }
                />
              )}
            
          </FormItem>
          </div>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
                initialValue: '',
                rules: [
                  {
                    type: "string",
                    required: true,
                  },
                ],
              })(<Input placeholder="详细地址"/>)}
          </FormItem>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('phoneNumber', {
              initialValue: '',
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(<Input placeholder="联系电话"/>)}
          </FormItem>
        
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('openHour', {
              rules: [
                {
                  required: true,
                  type: "string",
                },
              ],
            })(
              <TimeRangePicker></TimeRangePicker>
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('images', {
              initialValue: [],
              rules: [
                {
                  type: "array",
                  required: true,
                },
              ],
            })(
              <ImageUpload></ImageUpload>
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
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default MerchantModal
