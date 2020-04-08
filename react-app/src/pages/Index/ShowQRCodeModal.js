import React from 'react';
import ReactDOM from 'react-dom';

import {Modal, Form, message} from 'antd';
import {authenticateSuccess} from '../../utils/session';
import moment from 'moment';
import {json} from '../../utils/ajax';
import {setUser, initWebSocket} from '../../store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createFormField} from '../../utils/util';

import * as QRCode from 'easyqrcodejs';

const store = connect (
  state => ({user: state.user, websocket: state.websocket}),
  dispatch => bindActionCreators ({setUser, initWebSocket}, dispatch)
);
const form = Form.create ({});

@store
@form
class ShowQRCodeModal extends React.Component {
  constructor (props) {
    super (props);
    this.scanState = {
      0: '正在初始化',
      1: '已取消登录',
      2: '请扫码确认登录',
      3: '扫码成功，待确认',
      4: '已登录成功',
      5: '二维码超时',
      undefiend: '请启动微信机器人',
    };
  }

  /**
     * 关闭模态框
     */
  handleCancel = () => {
    // this.props.form.resetFields ();
    this.props.toggleVisible (false);
  };
  /**
     * 模态框的确定按钮
     */
  handleOk = () => {
    this.initQRCode ();
    // 刷新二维码
    message.success ('刷新成功');
  };
  /**
     * 更新用户信息
     */
  onUpdate = async values => {
    const param = {
      ...values,
      birth: values.birth && moment (values.birth).valueOf (),
    };
    const res = await json.post ('/user/update', param);
    if (res.status === 0) {
      //修改localStorage，为什么我们在redux中保存了用户信息还要在localStorage中保存？redux刷新就重置了，我们需要username重新去后台获取
      localStorage.setItem ('username', values.username);
      //修改cookie
      authenticateSuccess (res.data.token);
      //修改redux中的user信息
      this.props.setUser (res.data);
      //修改websocket中的user信息
      if (this.props.websocket.readyState !== 1) {
        this.props.initWebSocket (res.data);
      } else {
        this.props.websocket.send (
          JSON.stringify ({
            id: res.data.id,
            username: res.data.username,
            avatar: res.data.avatar,
          })
        );
      }
      message.success ('修改信息成功');
      this.handleCancel ();
    }
  };

  generateQrCode (qrcode, status) {
    const options = {
      // ====== Basic
      // text: 'www.easyproject.cn/donation',
      text: qrcode || this.scanState[`${status}`],
      width: 300,
      height: 300,
      correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
      dotScale: 0.7, // Must be greater than 0, less than or equal to 1. default is 1
      colorDark: '#1890ff',
      colorLight: '#eee',

      // QuietZone
      quietZone: 15,

      // === Title
      title: 'iPad微信登录', // Title
      titleFont: 'bold 20px sans-serif', // Title font
      titleColor: '#8811ff', // Title Color
      titleBackgroundColor: '#1199ff33', // Title Background
      titleHeight: 40, // Title height, include subTitle
      titleTop: 10, // Title draw position(Y coordinate), default is 30

      // === SubTitle
      subTitle: this.scanState[`${status}`], // Subtitle content
      subTitleFont: '16px sans-serif', // Subtitle font
      subTitleColor: '#09f', // Subtitle color
      subTitleTop: 30, // Subtitle drwa position(Y coordinate), default is 50
    };
    document.getElementById ('qrcode').innerHTML = '';
    // Create QRCode Object
    new QRCode (document.getElementById ('qrcode'), options);
  }

  initQRCode () {
    var evtSource = new EventSource ('http://127.0.0.1:8989/sse/getScanCode');
    let i = 0;
    let before = '';
    const that = this;
    evtSource.onmessage = function (e) {
      if (e.data.indexOf ('请启动机器人先')) {
        i++;
      } else {
        i = 0;
      }

      if (i === 15) {
        i = 0;
        evtSource.close ();
      }

      console.log (e.data);
      console.log (e);

      if (before === e.data) {
        return;
      } else {
        before = e.data;
      }

      const obj = JSON.parse (e.data);
      if (obj && obj.status === undefined) {
        obj.status = that.scanState['undefined'];
      }
      that.generateQrCode (obj.qrcode, obj.status);
    };
    evtSource.onerror = function (e) {
      console.log ('error', e);
      evtSource.close ();
    };
  }

  render () {
    const {visible} = this.props;

    if (visible) {
      setTimeout (() => {
        // const url = 'http://weixin.qq.com/x/IYlLnwyGbUVzGLKBkWLu';
        // var options = {
        //   text: 'https://github.com/ushelp/EasyQRCodeJS',
        // };
        // document.getElementById ('qrcode').innerHTML = '';
        // new QRCode (document.getElementById ('qrcode'), options);
        this.initQRCode ();
      }, 16);
    }

    // new QRCode()
    return (
      <Modal
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        okText="刷新"
        visible={visible}
        centered
        title="二维码"
      >
        <div style={{height: '60vh', overflow: 'auto'}}>
          <Form>
            <Form.Item>

              <div style={{textAlign: 'center'}} id="qrcode" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
}

const styles = {
  avatarUploader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 28,
    color: '#999',
  },
  avatar: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
};

export default ShowQRCodeModal;
