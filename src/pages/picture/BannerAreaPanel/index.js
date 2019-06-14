import React, { PureComponent } from 'react'
import { Upload, Icon, Modal, message, Button, Row} from 'antd' 
import { connect } from 'dva'
import { Page} from 'components'
import  styles from './index.less';
import add_png from '../../../../public/add_upload.png'
const confirm = Modal.confirm;



@connect(({ picture, loading }) => ({ picture, loading }))
class bannerAreaPanel extends PureComponent {


  
  render() {
    return <>
          <Button className="create-button"> + 添加列表</Button>
            <Row className={styles.bannerRow}>
              <div className={styles.rowTitle}>列表01 <Icon  style={{ fontSize: '16px' }} type="form" /></div>
              <div className={styles.bannerArea}>
                <div style={{backgroundImage: 'url(https://images.pexels.com/photos/48605/pexels-photo-48605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)'}} className={styles.bannerPic}>
                    <div className={styles.options}>
                      <Icon className={styles.icon} style={{ fontSize: '25px' }} type="form" />&nbsp;
                      <Icon className={styles.icon} style={{ fontSize: '25px' }} type="delete" />
                    </div>
                </div>
                <div className={styles.bannerPic}>
                  
                    <img alt="" src={add_png}/>
                    <div > 添加照片 </div>
                </div>
              </div>
            </Row>
        </>
      
  }
}

export default bannerAreaPanel
