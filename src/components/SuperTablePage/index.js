import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { stringify } from 'qs'
import { connect } from 'dva'
import { router } from 'utils'
import { withI18n } from '@lingui/react'
import {Row ,Col, Icon} from 'antd'
import { Page} from 'components'
import BaseFliter from './BaseFliter'
import BaseList from './BaseList'

class SuperTablePage extends PureComponent {

  static defaultProps = {
    listColumns: []
  }

  handleRefresh = newQuery => {

    const { location } = this.props
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
    
  render() {
    const that = this
    const { 
      location, 
      addModelButtonText, 
      filterText, 
      listColumns,
      modelName,
      model,
      EditModal,
      dispatch,
      listOptions,} = this.props

    const { query } = location
    
    const {modalType, currentItem, modalVisible, list, pagination} = model

    const listProps = {
      listOptions,
      pagination,
      listColumns,
      list:model.list,
      onDeleteItem(id) {
        dispatch({
          type: modelName + '/delete',
          payload: id,
        }).then(() => {
          that.handleRefresh({
            pn:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },onEditItem(record) {
        dispatch({
          type: modelName + '/showModal',
          payload: {
            currentItem: record,
            modalType: 'update',
          },
        })
      },
    }

    const filterProps = {
      addModelButtonText,
      filterText,
      filter: {
        ...query,
      },
      onFilterChange: (value) => {
        that.handleRefresh({
          ...value,
          pn: 0,
          sz: 10,
        })
      },
      onAdd() {
        console.log('%c⧭', 'color: #f2ceb6', 'click add button');
        dispatch({
          type: modelName + '/showModal',
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
      // confirmLoading: loading.effects[`merchant/${modalType}`],
      title: modalType,
      centered: true,
      onOk(payload) {
        dispatch({
          type: modelName + `/${modalType}`,
          payload,
        }).then(() => {
          that.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: modelName + '/hideModal',
        })
      },
    }


    return (
      <Page inner>
        <Row>
          <BaseFliter 
            addModelButtonText={addModelButtonText}
            filterText={filterText}
            {... filterProps}
          ></BaseFliter>
        </Row>
        <br/>
        <BaseList {...listProps}></BaseList>
        {EditModal && <EditModal {...modalProps}></EditModal>}
      </Page>
    )
  }
}

SuperTablePage.propTypes = {
  location: PropTypes.object,
  addModelButtonText: PropTypes.any,
  filterText: PropTypes.any,
  onFilterChange: PropTypes.func,
  listColumns: PropTypes.array,
  modelName: PropTypes.string,
  EditModal: PropTypes.any,
  model: PropTypes.object,
  listOptions: PropTypes.array,
}

export default SuperTablePage
