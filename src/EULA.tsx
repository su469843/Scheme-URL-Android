import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface EULAProps {
  visible: boolean;
  onAgree: () => void;
  onDisagree: () => void;
}

const EULA: React.FC<EULAProps> = ({ visible, onAgree, onDisagree }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>用户协议</Text>
        <Text style={styles.content}>
          欢迎使用本应用！在使用前，请仔细阅读以下用户协议：
          {'\n\n'}
          1. 本应用尊重并保护所有用户的隐私权，不会收集、存储或分享您的个人隐私信息。
          {'\n\n'}
          2. 您在使用本应用时，应遵守相关法律法规，不得利用本应用进行任何违法活动。
          {'\n\n'}
          3. 本应用提供的所有内容，包括但不限于文字、图片、音频、视频等，均为本应用合法拥有或合法授权使用。
          {'\n\n'}
          4. 本应用不保证服务一定会满足您的全部要求，也不保证服务的及时性、安全性、准确性。
          {'\n\n'}
          5. 您理解并同意，本应用有权在必要时对服务进行变更、中断或终止，且不需对您或任何第三方承担任何责任。
          {'\n\n'}
          6. 本协议的解释权归本应用所有。
          {'\n\n'}
          继续使用本应用即表示您同意以上条款。
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.disagreeButton} onPress={onDisagree}>
            <Text style={styles.buttonText}>不同意</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.agreeButton} onPress={onAgree}>
            <Text style={styles.buttonText}>同意</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  disagreeButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  agreeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EULA;