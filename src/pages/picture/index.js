import React, { PureComponent } from 'react'
import {Collapse, Modal} from 'antd' 
import { connect } from 'dva'
import { Page} from 'components'
import BannerAreaPanel from './BannerAreaPanel/index'
import MessageList from './MessageList/index'
import GalleryPanel from './GalleryPanel/index'

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
  
    return <Page inner>
      <Collapse expandIconPosition="right" bordered={true} defaultActiveKey={['1']}>
        <Panel header="首页屏轮播图（不超过6张）" key="1">
          <GalleryPanel key="ch"></GalleryPanel>
        </Panel>
      </Collapse>
      <br/>
      <Collapse expandIconPosition="right" bordered={true} defaultActiveKey={['1']}>
        <Panel header="首页轮播图（不超过6张）" key="1"> 
          <BannerAreaPanel></BannerAreaPanel>
        </Panel>
      </Collapse>
      <br/>
      <Collapse expandIconPosition="right" bordered={true} defaultActiveKey={['1']}>
      <Panel header="页面最新消息" key="1">
          <MessageList location={this.props.location}></MessageList>
        </Panel>
      </Collapse>
      <br/>
    </Page>
  }
}

export default Picture
