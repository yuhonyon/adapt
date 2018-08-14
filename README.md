# 仿淘宝移动端适配方案 **已遗弃**
***
[TOC]
## 介绍 
+ adapt.js 是一个移动端布局开发解决方案
+ 使用动态的HTML根字体大小和动态的viewport scale。

## 目录

```
├── example   //简单的示例
│   ├── css
│   ├── js
│   └── index.html
│
└── dist   //adapt.js文件
    └── adapt.js
```

## 用法

在`<head>`里引进adapt.js(存着其他脚本的时候要保证第一个得到引进)
`<script src="js/adapt.js"></script>`


## css 写法
+ 使用`rem`作为单位编写css;
+ `1rem`的大小为设计稿宽度 / 10(比如设计稿尺寸为1080px,则1rem = 108px,建议设计稿尺寸为750px);
+ 使用sass的混合或funtion 转换px到rem
+ 使用sublime插件 cssrem  转换px到rem(推荐)

## hack
通过`<html>`自定义属性`data-dpr="1/2/3"`获取当前设备的dpr
若要保持所有设备字体一致
```css
#container {
    color: #f0f0f0;
    font-size: 12px; 
}
[data-dpr="2"] #container {
    font-size: 24px; 
}
[data-dpr="3"] #container {
    font-size: 36px;
}
```

## 单位转换
提供`adapt.px2rem()`和'adapt.rem2px()'两方法转换px为rem和rem转换为px;
