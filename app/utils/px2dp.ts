/**
 * 屏幕适配
 */
 import { Dimensions } from 'react-native';
 // 设计图上的比例，宽度
 let basePx = 500;
 const deviceW = Dimensions.get('window').width;
 /**
  * 适配宽高 px2dp
  * @param {width、height} px 
  */
 export default function px2dp(px) {
   return px * deviceW / basePx;
 }