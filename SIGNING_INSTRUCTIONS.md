# 创建Android签名密钥的步骤

1. 首先确保已安装JDK，并且keytool命令在系统路径中可用
2. 打开命令行工具，执行以下命令生成签名密钥：

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

3. 按照提示输入以下信息：
   - 密码（记住这个密码，后续配置需要用到）
   - 您的姓名和姓氏
   - 组织单位名称
   - 组织名称
   - 城市或地区名称
   - 州或省名称
   - 国家/地区代码（如CN）

4. 确认信息后，密钥库文件my-release-key.keystore将被创建

5. 将生成的my-release-key.keystore文件移动到项目目录下的android/app/keystore/文件夹中

6. 在项目根目录下创建或编辑`android/gradle.properties`文件，添加以下内容：

```properties
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

请将`*****`替换为您在生成密钥时设置的实际密码。

7. 修改`android/app/build.gradle`文件，添加签名配置：

```gradle
android {
    ...
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```