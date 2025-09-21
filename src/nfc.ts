import { Alert } from 'react-native';

let NfcManager: any = null;
let initialized = false;

export const ensureNfc = async () => {
  if (!NfcManager) {
    try {
      // lazy require to avoid bundling if not installed
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      NfcManager = require('react-native-nfc-manager').default;
    } catch (e) {
      return { ok: false, message: '未安装 react-native-nfc-manager，请先安装并链接原生模块' };
    }
  }

  if (!initialized) {
    try {
      await NfcManager.start();
      initialized = true;
    } catch (e) {
    return { ok: false, message: '无法初始化 NFC：' + String(e) };
    }
  }

  return { ok: true, nfc: NfcManager };
};

export const writeNfc = async (text: string) => {
  const res = await ensureNfc();
  if (!res.ok) {
    Alert.alert('NFC 错误', res.message);
    return false;
  }

  const nfc = res.nfc;
  try {
    // simple NDEF text record
    const bytes = nfc.stringToBytes(text);
    const ndef = [nfc.textRecord(text)];
    await nfc.requestTechnology(nfc.NdefTech);
    await nfc.writeNdefMessage(ndef);
    await nfc.cancelTechnologyRequest();
    Alert.alert('成功', '已写入 NFC');
    return true;
  } catch (e) {
  Alert.alert('NFC 写入失败', String(e));
    return false;
  }
};

export default { ensureNfc, writeNfc };
