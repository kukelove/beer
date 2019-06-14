import React, { PureComponent,Fragment } from 'react'
import axios from 'axios'
import qs from 'qs';
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

  state = {
    poi: []
  }

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
      // 出去的数据需要进行加工
      data.latitude = data.latlongitude.split(',')[0] 
      data.longitude = data.latlongitude.split(',')[1] 
      onOk(data)
    })
  }

  formatCity(record) {
    if(record.country) {
      return [record.province, record.city, record.country]
    }
  }

  searchAdress() {
    const { form } = this.props
    const { getFieldValue } = form
    const address =  getFieldValue('address')
    const city =  getFieldValue('city')
    if(address && city) {
      axios.get(`/place/v2/search?query=${address}&region=${city}&output=json&ak=NY6OTfDXGR2ii6Gsye6ybmFKSgbtXnHy`)
      .then(response => {
        const { statusText, status, data } = response
        if(data.results) {
          this.setState({poi: data.results})
        }
      })
      .catch(err => {
        throw err;
      })
    }
  }

  render() {

    const uploadProps = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      multiple: true,
    };
    const {item = {}, title, onOk, form, ...modalProps } = this.props
    if(item.latitude) {
      item.latlongitude = item.latitude + ',' + item.longitude
    }
    const { getFieldDecorator } = form
    return (
      <Modal {...modalProps} footer={false} width={600} visible={true}>
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
            })(<Input placeholder="店铺名称"/>)}
          </FormItem>
          <div id="cityCascader">
          <FormItem  {...formItemLayout}>
         
            {getFieldDecorator('city', { 
                initialValue: this.formatCity(item),
              })(
                <Cascader
                  style={{ width: '100%' }}
                  options={city}
                  placeholder="请选择城市"
                  getPopupContainer={() =>
                    document.getElementById('cityCascader')
                  }
                />
              )}
            
          </FormItem>
          </div>
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
                initialValue: item.address,
                rules: [
                  {
                    type: "string",
                    required: true,
                  },
                ],
              })(<Input onBlur={(e)=>this.searchAdress()} placeholder="详细地址"/>)}
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
            })(<Input placeholder="联系电话"/>)}
          </FormItem>
        
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('openHour', {
              initialValue: item.openHour || '08:00,23:00',
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
          <FormItem hasFeedback {...formItemLayout}>
            {getFieldDecorator('latlongitude', {
              initialValue: item.latlongitude,
              rules: [
                {
                  type: "string",
                  required: true,
                },
              ],
            })(
              <Select
              showSearch
              placeholder="选择定位"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.poi.map((item)=> {
                return <Option value={item.location.lat + ',' +  item.location.lng}>{item.name}-{item.address}</Option>
              }) }
            
            </Select>,

            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('image', {
              initialValue: item.image,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <ImageUpload count={1}></ImageUpload>
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
