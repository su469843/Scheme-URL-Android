# Scheme URL Handler App

这是一个处理自定义URL协议的React Native应用，包含首页和设置两个页面。

## 功能特点

1. 首页：显示接收到的URL和参数
2. 设置页面：应用设置选项
3. URL Scheme处理：处理`schemeurl://`开头的自定义链接
4. Stack导航：在首页和设置页面之间导航

## 测试方法

1. 启动应用
2. 在手机浏览器中访问以下链接来测试：
   ```
   schemeurl://test?param1=value1¶m2=value2
   ```

3. 应用会接收到URL并在首页显示URL本身以及其中的参数
4. 使用首页的"设置"按钮导航到设置页面
5. 使用设置页面的"返回首页"按钮返回首页

## 页面结构

- 首页：显示URL处理结果，包含导航到设置页面的按钮
- 设置：应用设置选项，包含返回首页的按钮

## 技术实现

- 使用React Navigation Native Stack实现页面导航
- 使用React Native Linking API处理URL Scheme
- 支持Android和iOS平台