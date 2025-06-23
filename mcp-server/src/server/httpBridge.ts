import express from "express";
import cors from "cors";
import { getTool, getAllTools } from "../tools";
import { logger } from "../utils/logger";

export class HttpBridge {
  private app: express.Application;
  private port: number;

  constructor(port: number = 8080) {
    this.app = express();
    this.port = port;
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
      })
    );
  }

  private setupRoutes(): void {
    // Health check
    this.app.get("/health", (req, res) => {
      res.json({ status: "ok", timestamp: new Date().toISOString() });
    });

    // List available tools
    this.app.get("/mcp/tools", (req, res) => {
      const tools = getAllTools().map((tool) => ({
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      }));

      res.json({
        status: "success",
        message: "Tools retrieved successfully",
        data: { tools },
      });
    });

    // Execute tool
    this.app.post("/mcp/tools/:toolName", async (req, res) => {
      const { toolName } = req.params;
      const params = req.body;

      logger.info(`Executing tool: ${toolName}`, params);

      const tool = getTool(toolName);
      if (!tool) {
        return res.status(404).json({
          status: "error",
          message: `Tool '${toolName}' not found`,
        });
      }

      try {
        const result = await tool.handler(params);
        return res.json(result);
      } catch (error) {
        logger.error(`Tool execution failed: ${toolName}`, error);
        return res.status(500).json({
          status: "error",
          message:
            error instanceof Error ? error.message : "Tool execution failed",
        });
      }
    });

    // Error handler
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        logger.error("Unhandled error:", err);
        res.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      }
    );
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`HTTP Bridge server running on port ${this.port}`);
      logger.info(`Health check: http://localhost:${this.port}/health`);
      logger.info(`Tools endpoint: http://localhost:${this.port}/mcp/tools`);
    });
  }
}
