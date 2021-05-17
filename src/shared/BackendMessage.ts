export interface BackendMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
