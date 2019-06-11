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
    const { location, addModelButtonText, filterText, } = this.props
    const { query } = location

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

    return (
      <Page inner>
        <Row>
          <BaseFliter 
            addModelButtonText={addModelButtonText}
            filterText={filterText}
            {... filterProps}
          ></BaseFliter>
        </Row>
        <BaseList></BaseList>
      </Page>
    )
  }
}

SuperTablePage.propTypes = {
  location: PropTypes.object,
  addModelButtonText: PropTypes.any,
  filterText: PropTypes.any,
  onFilterChange: PropTypes.func,
}

export default SuperTablePage
