export interface IResponse {
  ok: boolean;
  error?: any;
  data?: any;
  token?: string;
  total?: number;
  showError?: number;
}
