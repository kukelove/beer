import React, { PureComponent } from 'react'
import { Icon, Modal, message, Button, Row, Pagination} from 'antd' 
import { connect } from 'dva'
import { stringify } from 'qs'
import router from 'umi/router';
import  styles from './index.less';


const confirm = Modal.confirm;

@connect(({ picture, loading }) => ({ picture, loading }))
class MessageList extends PureComponent {

  state = {
    text: '',
    jumpPage: ''
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
  toPage(page) {
    this.handleRefresh({
      pn: page
    })
  }

  onMessageDelete = (id) => {
    const { pagination, messageList } = this.props.picture
    const that = this;
    const {dispatch} = this.props
    confirm({
      title: '确定删除该项？',
      onOk() {
        dispatch({
          type: 'picture/deleteMessage',
          payload: id,
        }).then(() => {
          message.success('删除成功！')
          that.handleRefresh({
            pn:
            messageList.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
    })
  }

  onEditMessage = (id)=> {
    router.push({
      pathname: '/message',
      search: stringify(
        {
          id
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }
  
  render() {
    const { messageList, pagination } = this.props.picture
    const {current, total} = pagination
    return <>
        <Button onClick={()=>router.push('/message')} className="create-button"> + 添加最新消息</Button>
          <Row className={styles.bannerRow}>
          {messageList.map(item => {
            return <div key={item.id} className={styles.listItem}>
              <div className={styles.options}>
                <Icon onClick={()=>this.onEditMessage(item.id)} className={styles.icon} style={{ fontSize: '25px' }} type="form" /> &nbsp; 
                <Icon onClick={()=>this.onMessageDelete(item.id)} className={styles.icon} style={{ fontSize: '25px' }} type="delete" />
              </div>
              <div className={styles.avatar}>
                <img alt="" src={item.image}/>
              </div>
              <div className={styles.info}>
                <div className={styles.header}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.time}>2018-01-01</div>
                </div>
                <div className={styles.belong}>所属列表：{item.galleryListName}</div>
                <div className={styles.content}>文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要...</div>
              </div>
              <div className={styles.options}></div>
            </div>
          })}
          <div className={styles.pagination}>
            <div style={{marginRight: '20px'}}>
              <Pagination pageSize={10} current={current+1} total={total} /></div>
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
                        console.log(e.target.value)
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
                <div onClick={()=>this.toPage(this.state.jumpPage - 1)} className={styles.quickJumperBox}>
                  跳转
                </div>
              </span>
            </div>
          </Row>
        </>
  }
}

export default MessageList
