import { MCPTool } from "../types";
import { loginTool } from "./loginTool";
import { getProductsTool, getCategoresTool } from "./productsTool";
import {
  addToCartTool,
  removeFromCartTool,
  displayCartTool,
  clearCartTool,
} from "./cartTool";
import { getUsersTool } from "./userTool";

export const tools: Record<string, MCPTool> = {
  // Authentication
  [loginTool.name]: loginTool,

  // Products
  [getProductsTool.name]: getProductsTool,
  [getCategoresTool.name]: getCategoresTool,

  // Cart Management
  [addToCartTool.name]: addToCartTool,
  [removeFromCartTool.name]: removeFromCartTool,
  [displayCartTool.name]: displayCartTool,
  [clearCartTool.name]: clearCartTool,

  // Bonus - User Management
  [getUsersTool.name]: getUsersTool,
};

export function getTool(name: string): MCPTool | undefined {
  return tools[name];
}

export function getAllTools(): MCPTool[] {
  return Object.values(tools);
}
