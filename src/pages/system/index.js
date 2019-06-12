import React, { PureComponent, Fragment} from 'react'
import {Icon} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import SuperTablePage from 'components/SuperTablePage'
import Modal from './Modal'

@connect(({ system, loading }) => ({ system, loading }))
class User extends PureComponent {

  
  render() {
    const listColumns = [
      {
        title: '人员姓名',
        dataIndex: 'name',
        key: 'name',
        
      },
      {
        title: '联系方式',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      // {
      //   title: '微信',
      //   dataIndex: 'address',
      //   key: 'address',
      // },
      {
        title: '所属商铺',
        dataIndex: 'merchantId',
        key: 'merchantId',
      },
      {
        title: '拥有权限',
        dataIndex: 'privilage',
        key: 'privilage',
      },
    ]

    const {location, system, loading, dispatch } = this.props
    console.log('%c⧭', 'color: #f2ceb6', system);
    const  { list } = system;

    const pageProps = {
      addModelButtonText: '添加系统人员',
      filterText: '输入人员姓名查询',
      location,
      listColumns,
      modelName: 'User',
      list,
      model: system,
      EditModal: Modal,
      dispatch
    }
    return <Fragment>
      <SuperTablePage {...pageProps }/>
    </Fragment>
  }
}

User.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default User
