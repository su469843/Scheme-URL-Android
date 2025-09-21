import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LogEntry {
  timestamp: number;
  message: string;
}

const LOG_KEY = 'app_logs';

export async function addLog(message: string): Promise<void> {
  const entry: LogEntry = { timestamp: Date.now(), message };
  const logs = await getLogs();
  logs.push(entry);
  await AsyncStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

export async function getLogs(): Promise<LogEntry[]> {
  const json = await AsyncStorage.getItem(LOG_KEY);
  return json ? JSON.parse(json) : [];
}

export async function clearLogs(): Promise<void> {
  await AsyncStorage.removeItem(LOG_KEY);
}
