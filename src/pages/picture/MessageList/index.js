import React, { PureComponent } from 'react'
import { Upload, Icon, Modal, message, Button, Row, Pagination} from 'antd' 
import { connect } from 'dva'
import { Page} from 'components'
import  styles from './index.less';
import add_png from '../../../../public/add_upload.png'
const confirm = Modal.confirm;



@connect(({ picture, loading }) => ({ picture, loading }))
class MessageList extends PureComponent {
  
  render() {
    return <>
          <Button className="create-button"> + 添加最新消息</Button>
          <Row className={styles.bannerRow}>

            <div className={styles.listItem}>
             <div className={styles.options}>
                <Icon className={styles.icon} style={{ fontSize: '25px' }} type="form" /> &nbsp; 
                <Icon className={styles.icon} style={{ fontSize: '25px' }} type="delete" />
              </div>
              <div className={styles.avatar}>
                <img alt="" src="https://tse1-mm.cn.bing.net/th?id=OIP.Wo0E2kACycBZa4AF_UoUjwAAAA&w=211&h=209&c=8&rs=1&qlt=90&dpr=2&pid=3.1&rm=2"/>
              </div>
              <div className={styles.info}>
                <div className={styles.header}>
                  <div className={styles.title}>用色彩提升家的温度</div>
                  <div className={styles.time}>2018-01-01</div>
                </div>
                <div className={styles.belong}>所属列表：列表01</div>
                <div className={styles.content}>文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要文章内容概要...</div>
              </div>
              <div className={styles.options}></div>
            </div>
            <div className={styles.pagination}>
              <div style={{marginRight: '20px'}}>
              <Pagination defaultCurrent={1} total={50} /></div>
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
          </Row>
            
        </>
      
  }
}

export default MessageList
