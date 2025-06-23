export interface MCPRequest {
  method: string;
  params?: Record<string, any>;
}

export interface MCPResponse {
  status: "success" | "error";
  message: string;
  data?: any;
}

export interface MCPTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  handler: (params: any) => Promise<MCPResponse>;
}

export interface ServerInfo {
  name: string;
  version: string;
  capabilities: string[];
}
