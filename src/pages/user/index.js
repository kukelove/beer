import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import SuperTablePage from 'components/SuperTablePage'

@connect(({ loading }) => ({ loading }))
class User extends PureComponent {

  render() {

    const {location} = this.props

    const pageProps = {
      addModelButtonText: false,
      filterText: '输入手机号查询',
      location,
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
