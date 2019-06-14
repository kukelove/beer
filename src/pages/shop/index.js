import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { stringify } from 'qs'
import { connect } from 'dva'
import { router } from 'utils'
import { withI18n } from '@lingui/react'
import {Row ,Col, Icon} from 'antd'
import { Page} from 'components'
import Fliter from './components/BaseFliter'
import BaseList from './components/BaseList'
import styles from './shop.less'
import Modal from './components/Modal'

@withI18n()
@connect(({ merchant, loading }) => ({ merchant, loading }))
class Shop extends PureComponent {

  columns = [{
    title: '默认列',
    dataIndex: 'name',
    key: 'name'}]
    
  render() {
    
    const { merchant, loading, location, dispatch} = this.props
    const { query, pathname } = location
    const {
      modalVisible,
      modalType,
      currentItem,
      list,
      pagination
    } = merchant

    const handleRefresh = newQuery => {
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

    const filterProps = {
      filter: {
        ...query,
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          pn: 0,
          sz: 10,
        })
      },
      onAdd() {
        dispatch({
          type: 'merchant/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
    
    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: loading.effects[`merchant/${modalType}`],
      title: modalType,
      centered: true,
      onOk(payload) {
        const data = Object.assign({}, payload)
        data.province = payload.city[0];
        data.city = payload.city[1];
        data.country = payload.city[2];
        dispatch({
          type: `merchant/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh()
        })
        dispatch({
          type: 'merchant/hideModal',
        })
      },
      onCancel() {
        dispatch({
          type: 'merchant/hideModal',
        })
      },
    }

    const listProps = {
      list: list,
      loading: loading.effects['merchant/fetchList'],
      pagination,
      toPage(page) {
        handleRefresh({
          pn: page
        })
      },
      onEditItem(record) {
        dispatch({
          type: 'merchant/showModal',
          payload: {
            currentItem: record,
            modalType: 'update',
          },
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'merchant/delete',
          payload: id,
        }).then(() => {
          handleRefresh({
            pn:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
    }
    return (
      <Page inner>
        <Row>
          <Fliter {...filterProps}></Fliter>
        </Row>
        <Row className={styles.mt_20}>
          <Col><BaseList {...listProps}></BaseList></Col>
        </Row>
        {modalVisible && <Modal {...modalProps}/>}
      </Page>
    )
  }
}

Shop.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Shop
