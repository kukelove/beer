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
    const { 
      location, 
      addModelButtonText, 
      filterText, 
      listColumns,
      modelName,
      model,
      EditModal,
      dispatch} = this.props

    const { query } = location
    
    const {modalType, currentItem, modalVisible} = model

    const listProps = {
      listColumns,
      list:model.list,
    }

    const filterProps = {
      addModelButtonText,
      filterText,
      filter: {
        ...query,
      },
      onFilterChange: (value) => {
        this.handleRefresh({
          ...value,
          pn: 0,
          sz: 10,
        })
      },
      onAdd() {
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
        const data = Object.assign({}, payload)
        data.province = payload.city[0];
        data.city = payload.city[1];
        data.country = payload.city[2];
        dispatch({
          type: `system/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'system/hideModal',
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
  model: PropTypes.object
}

export default SuperTablePage
