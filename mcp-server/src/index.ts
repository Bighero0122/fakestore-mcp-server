import dotenv from "dotenv";
import { HttpBridge } from "./server/httpBridge";
import { logger } from "./utils/logger";

// Load environment variables
dotenv.config();

const PORT = parseInt(process.env.PORT || "8080", 10);

function main(): void {
  try {
    logger.info("Starting Fake Store MCP Server...");

    // Start HTTP bridge
    const bridge = new HttpBridge(PORT);
    bridge.start();

    logger.info("MCP Server started successfully");
  } catch (error) {
    logger.error("Failed to start MCP Server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  logger.info("Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

// Start the server
main();
