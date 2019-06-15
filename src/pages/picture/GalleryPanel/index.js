import React, { PureComponent } from 'react'
import { Upload, Icon, Modal, Input, Button, Row, message, Select} from 'antd' 
import { connect } from 'dva'
import { Page} from 'components'
import  styles from './index.less';
import add_png from '../../../../public/add_upload.png'
const confirm = Modal.confirm;



@connect(({ picture, loading }) => ({ picture, loading }))
class GalleryPanel extends PureComponent {

  state = {
    galleryNamemodalShow: false,
    imageEditModalShow: false,
    galleryNameEdit: {
    },
    imageEdit: {
    }
  }

  onAddBannerList() {
    this.setState({
      galleryNamemodalShow: true,
      galleryNameEdit: {}
    })
  }

  onSubmitGalleryName() {
    const {dispatch} = this.props
    const galleryNameEdit = this.state.galleryNameEdit;
    if(galleryNameEdit.name && galleryNameEdit.name !== '') {
      if(galleryNameEdit.id) {
        dispatch({
          type: 'picture/updateGalleryList',
          payload: galleryNameEdit,
        })
      }else {
        dispatch({
          type: 'picture/createGalleryList',
          payload: galleryNameEdit,
        })
      }
      
      this.setState({galleryNamemodalShow: false})
    }else {
      message.fail('请填入列表名称')
    }
  }

  onSubmitImage() {
    const {dispatch} = this.props
    if(this.state.imageEdit.id) {
      console.log('%c⧭', 'color: #735656', '???');
      dispatch({
        type: 'picture/updateGallery',
        payload: this.state.imageEdit,
      })
    }else {
      dispatch({
        type: 'picture/createGallery',
        payload: this.state.imageEdit,
      })
    }
    this.setState({imageEditModalShow: false})
  }

  onGalleryNameChange = (value) => {
    this.setState({
      galleryNameEdit: {
        ...this.state.galleryNameEdit,
        name: value,
      }
    })
  }

  onGalleryNameDelete = (id) => {
    const {dispatch} = this.props
    confirm({
      title: '确定删除该项？',
      onOk() {
        dispatch({
          type: 'picture/deleteGalleryList',
          payload: id,
        })
      },
    })
  }

  onGalleryNameEdit = (item) => {
    this.setState({
      galleryNamemodalShow: true,
      galleryNameEdit: item
    })
  }

  onAddImage = (galleryListId) => {
    this.setState({
      imageEditModalShow: true,
      imageEdit: {
        galleryListId,
      }
    })
  }

   onUpdateImage = (item) => {
    this.setState({
      imageEditModalShow: true,
      imageEdit: item
    })
  }

  onDeleteImage = (id, galleryListId) => {
    const {dispatch} = this.props
    confirm({
      title: '确定删除该项？',
      onOk() {
        dispatch({
          type: 'picture/deleteGallery',
          payload: {id, galleryListId},
        })
      },
    })
  }
  
  render() {
    const { galleryNameEdit, imageEdit } = this.state
    const {galleryNameList, galleryList, galleryListMap} = this.props.picture
    const uploadGalleryProps = {
      action: "/v1/resource/image",
      multiple: false,
      showUploadList: false,
      onChange: ({file}) =>{
        if(file.response && file.response.url) {
          // 如果上传成功就调用创建照片墙的接口
          this.setState({imageEdit: { ...imageEdit ,image: file.response.url}})
        }
      }
    };
    return <>
      <Modal
        // title="上传图片"
        visible={this.state.galleryNamemodalShow}
        // onOk={this.handleOk}
        footer={false}
        onCancel={()=>this.setState({galleryNamemodalShow: false})}
        >
        <div>
          <p className={styles.modalTitle}>{this.state.galleryNameEdit.id? '编辑': '新增'}列表</p>
          <Input 
            value={galleryNameEdit.name}
            onChange={(e)=>this.onGalleryNameChange(e.target.value)}
            style={{marginBottom: '20px'}} placeholder="输入列表名称"></Input>
          <br/>
          <Button onClick={()=>this.onSubmitGalleryName()}  className="common-bottom" type="primary">确认</Button>
        </div>
        
      </Modal>
      <Button onClick={()=>this.onAddBannerList()} className="create-button"> + 添加列表</Button>
      {galleryNameList.map(item=>{
        return <Row key={item.name} className={styles.bannerRow}>
            <div className={styles.rowTitle}>{item.name}&nbsp; 
              <Icon onClick={()=>this.onGalleryNameEdit(item)} style={{ fontSize: '16px' }} type="form" />&nbsp;&nbsp;
              <Icon onClick={()=>this.onGalleryNameDelete(item.id)} style={{ fontSize: '16px' }} type="delete" />
            </div>
            <div className={styles.bannerArea}>
              {galleryListMap[item.id].map(image=> <div key={image.id} style={{backgroundImage: `url(${image.image})`}} className={styles.galleryPic}>
                  <div className={styles.options}>
                    <Icon onClick={()=>this.onUpdateImage(image)} className={styles.icon} style={{ fontSize: '25px' }} type="form" />&nbsp;
                    <Icon onClick={()=>this.onDeleteImage(image.id, image.galleryListId)} className={styles.icon} style={{ fontSize: '25px' }} type="delete" />
                  </div>
              </div>)}
              {galleryListMap[item.id].length <6 && <div onClick={()=>this.onAddImage(item.id)} className={styles.galleryPic}>
                  <img alt="" src={add_png}/>
                  <div > 添加照片 </div>
              </div>}
            </div>
          </Row>
      })}
      <Modal
        // title="上传图片"
        footer={false}
        visible={this.state.imageEditModalShow}
        // onOk={this.handleOk}
        onCancel={()=>this.setState({imageEditModalShow: false})}
        >
        <div className={styles.modalTitle}>
          <p className={styles.modelArea}>首轮轮播图</p>
           <Upload {...uploadGalleryProps}>
           <div style={imageEdit.image ? {
             backgroundSize: '100% 100%',
             backgroundRepeat: 'no-repeat',
             backgroundImage: `url(${imageEdit.image})`}: {}} className={styles.uploadArea}>
            {!imageEdit.image && <span>+点击上传图片</span>}
          </div>
           </Upload>
          <Button onClick={()=>this.onSubmitImage()}  className="common-bottom" type="primary">确认</Button>
        </div>
      </Modal>
    </>
      
  }
}

export default GalleryPanel
