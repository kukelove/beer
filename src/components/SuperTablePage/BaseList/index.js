import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Pagination, Modal } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './List.less'
const { confirm } = Modal

@withI18n()
class BaseList extends PureComponent {


  async componentDidMount() {
    // await services.queryMerchant();
  }

  handleMenuClick = (record, ActionType) => {
    const { onDeleteItem, onEditItem, i18n } = this.props
    if (ActionType === 'update') {
      onEditItem(record)
    } else if (ActionType === 'delete') {
      confirm({
        title: '确定删除该项？',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  

  render() {
    const { listColumns = [], list = [], pagination, listOptions = ['delete', 'edit']} = this.props
    const options = {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => <div className="table-option">
          {
          listOptions.includes('delete') &&
          <div onClick={()=>{this.handleMenuClick(record, 'delete')}} className="option">
            <Icon className="delete" type="delete" />
          </div>}
          &nbsp;&nbsp;
          {listOptions.includes('edit') &&
          <div onClick={()=>{this.handleMenuClick(record, 'update')}} className="option">
            <Icon className="edit" type="edit" />
          </div>}
      </div>
    }

    listColumns.push(options)

    return (
      <div style={{textAlign:"center"}}>
      <Table
        className="base-table"
        rowClassName="base-table-row"
        pagination={false}
        bordered
        scroll={{ x: 1200 }}
        columns={listColumns}
        dataSource = {list}
        simple
        rowKey="id"
        // _rowKey={(record) => record.id}
      />
        <div className={styles.pagination}>
          <div style={{marginRight: '20px'}}><Pagination size={10} defaultCurrent={1} total={pagination.tz} /></div>
          {/* <span className={styles.quickJumper}>
            <div className={styles.quickJumperNumber}>
              <input type="number" max={pagination.tp + 1} placeholder="页数"  className={styles.number}/>
            </div>
            <div className={styles.quickJumperLine}>
            </div>
            <div className={styles.quickJumperBox}>
              跳转
            </div>
          </span> */}
        </div>
      </div>
    )
  }
}

BaseList.propTypes = {
  listColumns: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  list: PropTypes.array,
  pagination: PropTypes.object,
  // location: PropTypes.object,
}

export default BaseList
