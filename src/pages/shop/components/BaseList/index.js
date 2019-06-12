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
    const listColumns = [
      {
        title: '门店照片',
        dataIndex: 'merchantId',
        key: 'merchantId',
        render: (text, record) => <img alt="" width="50" height="50" src={record.image}/>
        
      },
      {
        title: '门店名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        key: 'address',
        render: (text, record ) => (<div>
          {record.province}&nbsp;{record.city}&nbsp;{record.country}
          {record.address}
        </div>)
      },
      {
        title: '联系电话',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '营业时间',
        dataIndex: 'openHour',
        key: 'openHour',
      },
      {
        title: '纬度',
        dataIndex: 'latitude',
        key: 'latitude',
        render: (text, record ) => (<div>
          经度{record.latitude}&nbsp;纬度{record.longitude}
        </div>)
      }
      ,{
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
    ]

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
  // columns: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  // location: PropTypes.object,
}

export default BaseList
