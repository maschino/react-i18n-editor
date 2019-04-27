export interface IBackendMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
