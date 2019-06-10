import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './List.less'
import { Pagination, Row, Col, Input } from 'antd';
import services from '../../services/index'


@withI18n()
class BaseList extends PureComponent {


  async componentDidMount() {
    // await services.queryMerchant();
  }

  buildColumns = () => {
    return this.props.columns || [
      {
        title: '默认列',
        dataIndex: 'name',
        key: 'name',
      },
    ];
  }
  

  render() {

    console.log('debug list render data :', this.props.list)
    return (
      <div style={{textAlign:"center"}}>
      <Table
        className="base-table"
        // {...tableProps}
        rowClassName="base-table-row"
        pagination={false}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={this.buildColumns()}
        dataSource = {this.props.list}
        simple
        rowKey={(record, index) => index}
      />
        <div className={styles.pagination}>
          <div style={{marginRight: '20px'}}><Pagination defaultCurrent={1} total={50} /></div>
          <span className={styles.quickJumper}>
            <div className={styles.quickJumperNumber}>
              <input placeholder="页数"  className={styles.number}/>
            </div>
            <div className={styles.quickJumperLine}>
            </div>
            <div className={styles.quickJumperBox}>
              跳转
            </div>
          </span>
        </div>
      </div>
    )
  }
}

BaseList.propTypes = {
  columns: PropTypes.array
  // onDeleteItem: PropTypes.func,
  // onEditItem: PropTypes.func,
  // location: PropTypes.object,
}

export default BaseList
