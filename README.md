# Scheme URL Handler App

这是一个处理自定义URL协议的React Native应用，包含首页、设置、创建URL和日志显示页面。

## 功能特点

1. 首页：显示接收到的URL和参数
2. 设置页面：应用设置选项
3. 创建URL页面：创建和保存自定义URL
4. 日志页面：显示应用操作日志
5. URL Scheme处理：处理`schemeurl://`开头的自定义链接
6. Stack导航：在各个页面之间导航
7. NFC写入功能：将URL写入NFC标签
8. 主题支持：支持深色和浅色主题

## 测试方法

1. 启动应用
2. 在手机浏览器中访问以下链接来测试：
   ```
   schemeurl://test?param1=value1¶m2=value2
   ```

3. 应用会接收到URL并在首页显示URL本身以及其中的参数
4. 使用底部导航栏的按钮在不同页面之间切换
5. 在日志页面查看应用操作记录

## 页面结构

- 首页：显示URL处理结果，包含导航到其他页面的按钮
- 设置：应用设置选项，包含主题切换等功能
- 创建URL：创建和保存自定义URL
- 日志：显示应用操作日志

## 技术实现

- 使用React Navigation Native Stack实现页面导航
- 使用React Native Linking API处理URL Scheme
- 使用AsyncStorage进行数据持久化存储
- 使用UUID生成唯一标识符
- 支持Android和iOS平台