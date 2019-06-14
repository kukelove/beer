import React, { PureComponent } from 'react'
import {Row, Button, Col, Icon, Modal} from 'antd' 
import moment from 'moment'
import { stringify } from 'qs'
import { Page} from 'components'
import { router } from 'utils'
import { connect } from 'dva'
import styles from './index.less'
import MyModal from './Modal'

const dateFormat = 'YYYY/MM/DD';


const confirm = Modal.confirm;

@connect(({ product, loading }) => ({ product, loading }))

class Product extends PureComponent {
  onAdd = () => {
    this.props.dispatch({
      type: 'product/showModal',
      payload: {
        modalType: 'create',
      },
    })
  }

  handleRefresh = newQuery => {
    const {  location } = this.props
    const { query, pathname } = location
    router.push({
      pathname,
      search: stringify(
        {
          pn: 0,
          sz: 10,
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  onEditItem(record) {
    record.time = [moment(record.startTime), moment(record.endTime)] 
    this.props.dispatch({
      type: 'product/showModal',
      payload: {
        currentItem: record,
        modalType: 'update',
      },
    })
  }

  onDeleteItem = (id) => {
    const {dispatch} = this.props
    const {list, pagination} = this.props.product
    const that = this
    confirm({
      title: '提示',
      content: '确定删除该项吗？',
      onOk() {
        dispatch({
          type: 'product/delete',
          payload: id,
        }).then(() => {
          that.handleRefresh({
            pn:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onCancel() {
      },
    });
  }
  

  render() {
    const that = this;
    const modelName = 'product';
    const {dispatch} = this.props;
    const {currentItem, modalType, modalVisible, list, pagination} = this.props.product

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      title: modalType,
      centered: true,
      onOk(payload) {
        dispatch({
          type: modelName + `/${modalType}`,
          payload,
        }).then(() => {
          that.handleRefresh()
          dispatch({
            type: modelName + '/hideModal',
          })
        })
      },
      onCancel() {
        dispatch({
          type: modelName + '/hideModal',
        })
      },
    }

    

    return <Page inner>
      <MyModal {...modalProps}></MyModal>
      <Row>
        <Button onClick={this.onAdd} className="create-button">+添加卡券</Button>
      </Row>
      <br/>
      <Row>
       {list.map(item=>{
          return <Col key={item.id} span={8}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.header}>
                <div className={styles.title}>{item.name}</div> <div className={styles.price}>¥{item.discountPrice}</div>
              </div>
              <div className={styles.describe}>使用{item.purchasePoint}积分免费兑换</div>
              <div className={styles.status}><div className={styles.time}>{moment(item.startTime).format(dateFormat)} 至 {moment(item.endTime).format(dateFormat)}</div> <div className={styles.people}>已领取：0人</div></div>
            </div>
            <div className={styles.foot}>
              <Icon onClick={()=>this.onEditItem(item)} style={{ fontSize: '25px' }} type="form" /> &nbsp;&nbsp; 
              <Icon onClick={()=> this.onDeleteItem(item.id)} style={{ fontSize: '25px' }} type="delete" />
            </div>
          </div>
        </Col>
       })}
      </Row>
    </Page>
  }
}

export default Product
