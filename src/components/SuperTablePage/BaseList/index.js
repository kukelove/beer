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
    const { listColumns = [], list = []} = this.props

    const options = {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => <div className="table-option">
          <div onClick={()=>{this.handleMenuClick(record, 'delete')}} className="option">
            <Icon className="delete" type="delete" />
          </div>
          &nbsp;&nbsp;
          <div onClick={()=>{this.handleMenuClick(record, 'update')}} className="option">
            <Icon className="edit" type="edit" />
          </div>
      </div>
    }

    listColumns.push(options)

    return (
      <div style={{textAlign:"center"}}>
      <Table
        className="base-table"
        // {...tableProps}
        rowClassName="base-table-row"
        pagination={false}
        bordered
        scroll={{ x: 1200 }}
        columns={listColumns}
        dataSource = {list}
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
  listColumns: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  list: PropTypes.array
  // location: PropTypes.object,
}

export default BaseList
