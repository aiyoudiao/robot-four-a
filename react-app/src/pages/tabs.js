import React from 'react';
/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-04-03 09:55:22
 * @LastEditTime: 2020-04-07 10:37:50
 * @LastEditors: aiyoudiao
 * @FilePath: \project\react-app\src\pages\tabs.js
 */
import LoadableComponent from '../utils/LoadableComponent';
//const Test = React.lazy(() => import('./Test'));   //报错，就没用React.lazy了
const ButtonDemo = LoadableComponent (import ('./ButtonDemo/index'), true);
const IconDemo = LoadableComponent (import ('./IconDemo/index'), true);
const FeedbackDemo = LoadableComponent (import ('./FeedbackDemo/index'), true);
const Users = LoadableComponent (import ('./Users/index'), true);
const BotFriend = LoadableComponent (import ('./BotFriend/index'), true);
const Collection = LoadableComponent (import ('./Collection/index'), true);
const MessageBoard = LoadableComponent (import ('./MessageBoard/index'), true);
const Chat = LoadableComponent (import ('./Chat/index'), true);
const About = LoadableComponent (import ('./About/index'), true);

const menu = [
  // {
  //     name: 'antd',
  //     icon: 'ant-design',
  //     key: 'antd',
  //     children: [
  //         {
  //             name: '按钮',
  //             icon: '',
  //             key: 'ButtonDemo',
  //         },
  //         {
  //             name: '图标',
  //             icon: '',
  //             key: 'IconDemo',
  //         },
  //         {
  //             name: '反馈',
  //             icon: '',
  //             key: 'FeedbackDemo',
  //         },
  //     ]
  // },
  // {
  //   name: '用户管理',
  //   icon: 'user',
  //   key: 'Users',
  // },
  {
    name: '好友管理',
    icon: 'user',
    key: 'BotFriend',
  },
  // {
  //     name: '作品集',
  //     icon: 'bulb',
  //     key: 'Collection'
  // },
  // {
  //     name: '留言板',
  //     icon: 'message',
  //     key: 'MessageBoard'
  // },
  // {
  //     name: '聊天室',
  //     icon: 'qq',
  //     key: 'Chat'
  // },
  // {
  //     name: '关于',
  //     icon: 'info-circle',
  //     key: 'About'
  // }
];

const tabs = {
  // ButtonDemo: <ButtonDemo />,
  // IconDemo: <IconDemo />,
  // FeedbackDemo: <FeedbackDemo />,
  // Users: <Users />,
  BotFriend: <BotFriend />,
  // Collection: <Collection />,
  // MessageBoard: <MessageBoard />,
  // Chat: <Chat />,
  // About: <About />,
};

export {menu, tabs};
