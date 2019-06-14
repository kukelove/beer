import React, { PureComponent } from 'react'
import {Collapse, Upload, Icon, Modal, message, Button} from 'antd' 
import { connect } from 'dva'
import { Page} from 'components'
import  styles from './index.less';
import BannerAreaPanel from './BannerAreaPanel/index'
import MessageList from './MessageList/index'

const Panel = Collapse.Panel;
const confirm = Modal.confirm;
const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

@connect(({ picture, loading }) => ({ picture, loading }))
class Picture extends PureComponent {



  onDeleteGallery = (id) => {
    const {dispatch} = this.props
    const {list, pagination} = this.props.picture
    const that = this
    confirm({
      title: '提示',
      content: '确定删除该项吗？',
      onOk() {
        dispatch({
          type: 'picture/deleteGallery',
          payload: id,
        })
      },
      onCancel() {
      },
    });
  }

  
  render() {
    const {galleryList} = this.props.picture
    console.log('%c⧭', 'color: #00e600', galleryList); 

    const uploadGalleryProps = {
      action: "/v1/resource/image",
      multiple: false,
      showUploadList: false,
      onChange: ({file}) =>{
        if(file.response && file.response.url) {
          // 如果上传成功就调用创建照片墙的接口
          this.props.dispatch({
            type: 'picture/createGallery',
            payload: {"image": file.response.url,"status":1}
          })
        }
      }
    };

    return <Page inner>
      <Collapse expandIconPosition="right" bordered={true} defaultActiveKey={['1']}>
        <Panel header="首页屏轮播图（不超过6张）" key="2">
            <div className={styles.openPage}>
            {galleryList.map(pic=>{
              return <div key={pic.id} style={{backgroundImage: `url(${pic.image})`}} className={styles.indexPicture}>
                <div className={styles.options}>
                  <Icon className={styles.icon} style={{ fontSize: '25px' }} type="form" /> &nbsp; 
                  <Icon onClick={()=>this.onDeleteGallery(pic.id)} className={styles.icon} style={{ fontSize: '25px' }} type="delete" />
                </div>
            </div>
            })}
            <Upload {...uploadGalleryProps}>
                <div style={{background: 'rgba(238,238,238,1)'}} className={styles.indexPicture}>
                  添加图片
              </div>
            </Upload>
          </div>  
        </Panel>
      </Collapse>
      <br/>
      <Collapse expandIconPosition="right" bordered={true} defaultActiveKey={['1']}>
        <Panel header="首页轮播图（不超过6张）" key="2"> <BannerAreaPanel></BannerAreaPanel></Panel>
      </Collapse>
      <br/>
      <Collapse expandIconPosition="right" bordered={true} defaultActiveKey={['1']}>
      <Panel header="页面最新消息" key="1">
          <MessageList></MessageList>
        </Panel>
      </Collapse>
      <br/>
    </Page>
  }
}

export default Picture
