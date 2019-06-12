import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import SuperTablePage from 'components/SuperTablePage'
import { GENDER_TYPE } from '../../utils/constant'

@connect(({ user, loading }) => ({ user, loading }))
class User extends PureComponent {

  render() {
    const listColumns = [
      {
        title: '客户姓名',
        dataIndex: 'name',
        key: 'name',
        
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render: (text, record) => GENDER_TYPE[text]
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
      },
      {
        title: '联系方式',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '省市',
        dataIndex: 'province',
        key: 'province',
      },
      
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
      },
      
    ]

    const {location, user, dispatch} = this.props

    const pageProps = {
      addModelButtonText: false,
      filterText: '输入手机号查询',
      location,
      listColumns,
      modelName: 'User',
      model: user,
      EditModal: false,
      dispatch
    }
    return <SuperTablePage {...pageProps }/>
  }
}

User.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default User
