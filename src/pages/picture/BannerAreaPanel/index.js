import React, { PureComponent } from 'react'
import { Upload, Icon, Modal, message, Button, Row, Select} from 'antd' 
import { connect } from 'dva'
import { Page} from 'components'
import  styles from './index.less';
import add_png from '../../../../public/add_upload.png'
const confirm = Modal.confirm;
const Option = Select.Option;

@connect(({ picture, loading }) => ({ picture, loading }))
class GalleryPanel extends PureComponent {

  state = {
    modalShow: false,
    edit: {

    }
  }

  onEdit(item) {
    this.setState(
      {modalShow: true, edit: item}
    )
  }
  handleOk = () => {
    this.props.dispatch({
      type: 'picture/createGallery',
      payload: Object.assign({}, this.state.edit)
    })
    this.setState({modalShow: false, edit: {}})
  }

  render() {
    const { image } = this.state.edit
    const { galleryList } = this.props.picture
    const uploadGalleryProps = {
      action: "/v1/resource/image",
      multiple: false,
      showUploadList: false,
      onChange: ({file}) =>{
        if(file.response && file.response.url) {
          // 如果上传成功就调用创建照片墙的接口
          this.setState({edit: {...this.state.edit, image: file.response.url}})
        }
      }
    };
    return <>
      <Modal
        // title="上传图片"
        visible={this.state.modalShow}
        onOk={this.handleOk}
        onCancel={()=>this.setState({modalShow: false})}
        >
        <div className={styles.modelArea}>
          <p>首轮轮播图</p>
           <Upload {...uploadGalleryProps}>
           <div style={image ? {
             backgroundSize: '100% 100%',
             backgroundRepeat: 'no-repeat',
             backgroundImage: `url(${image})`}: {}} className={styles.uploadArea}>
            {!image && <span>+点击上传图片</span>}
          </div>
           </Upload>
          <Select style={{ width: '360px' }}>
          </Select>
        </div>
      </Modal>
      <div className={styles.openPage}>
        {galleryList.map(pic=>{
          return <div key={pic.id} style={{backgroundImage: `url(${pic.image})`}} className={styles.indexPicture}>
            <div className={styles.options}>
              <Icon onClick={()=>{this.onEdit(pic)}} className={styles.icon} style={{ fontSize: '25px' }} type="form" /> &nbsp; 
              <Icon onClick={()=>this.onDeleteGallery(pic.id)} className={styles.icon} style={{ fontSize: '25px' }} type="delete" />
            </div>
        </div>
        })}
       
            <div onClick={()=>this.setState({modalShow: true})} style={{background: 'rgba(238,238,238,1)'}} className={styles.indexPicture}>
              <img alt="" src={add_png}/>
              添加图片
          </div>
       
        </div>  
        </>
      
  }
}

export default GalleryPanel
