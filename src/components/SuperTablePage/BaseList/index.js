import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Pagination, Modal } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './List.less'
const { confirm } = Modal

@withI18n()
class BaseList extends PureComponent {

  state = {
    jumpPage: ''
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
    const {  list = [], pagination, listOptions = ['delete', 'edit']} = this.props
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
   
    const newlistColumns = this.props.listColumns.concat(options)
    const  {current, total} = this.props.pagination


    return (
      <div style={{textAlign:"center"}}>
      <Table
        className="base-table"
        rowClassName="base-table-row"
        pagination={false}
        bordered
        scroll={{ x: 1200 }}
        columns={newlistColumns}
        dataSource = {list}
        simple
        rowKey="id"
        // _rowKey={(record) => record.id}
      />
         <div className={styles.pagination}>
          <div style={{marginRight: '20px'}}>
            <Pagination onChange={(page)=>{
              this.props.toPage(page - 1)
            }} pageSize={10} current={current + 1} total={total} />
          </div>
          <span className={styles.quickJumper}>
            <div className={styles.quickJumperNumber}>
              <input
                min="1"
                type="number"
                placeholder="页数" 
                value={this.state.jumpPage} 
                className={styles.number}
                onChange={(e)=>{
                  if(e.target.value !=='' &&  Number(e.target.value) > 0) {
                    this.setState({
                      jumpPage: Number(e.target.value)
                    })
                  }else {
                    this.setState({
                      jumpPage: ''
                    })
                  }
                }}
              />
            </div>
            <div className={styles.quickJumperLine}>
            </div>
            <div onClick={()=>this.props.toPage(this.state.jumpPage - 1)} className={styles.quickJumperBox}>
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
  list: PropTypes.array,
  pagination: PropTypes.object,
  // location: PropTypes.object,
}

export default BaseList
