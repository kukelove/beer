import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal } from 'antd';
import styles from './index.less'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class ImagesUpload extends Component {


  static defaultProps = { 
    count: 3
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    let changeValue = []
    fileList.map((item)=>{
      if(item.response && item.response.url) {
        changeValue.push(item.response.url)
      }
    })
    
    this.props.onChange(changeValue.length>1 ? changeValue: changeValue[0])
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/v1/resource/image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= this.props.count ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '50px' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
ImagesUpload.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  count: PropTypes.number,
}
