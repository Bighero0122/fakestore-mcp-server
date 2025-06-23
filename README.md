# Fake Store MCP Project

A complete MCP (Model Context Protocol) server and React client implementation for e-commerce functionality using the Fake Store API.

## 🎯 Overview

This project implements all required MCP server functionality with a modern TypeScript stack:

### ✅ Core Requirements
- **User Authentication** - Login with username/password
- **Cart Management** - Add/remove items with quantity control
- **Product Browsing** - View and filter products
- **Itemized Cart Display** - Detailed breakdown with subtotal, tax, and total

### ✅ Bonus Features
- **Category Filtering** - Browse products by category (electronics, jewelry, men's/women's clothing)
- **User Profile Display** - Show authenticated user details in header
- **Cart Persistence** - Maintain cart state across sessions
- **Tax Calculation** - Automatic 8% tax on cart total
- **Clear Cart** - Bulk cart operations
- **Real-time Updates** - Live cart count and total updates
- **Health Monitoring** - Server health check endpoint

## 🏗️ Architecture
React Client (Port 3000) ←→ MCP Server (Port 8080) ←→ Fake Store API


**Frontend:** React 18 + TypeScript + Tailwind CSS  
**Backend:** Node.js + Express + TypeScript  
**API:** Fake Store API (https://fakestoreapi.com)

## 🚀 Quick Start

### 1. Server Setup
```bash
cd mcp-server
npm install
cp .env.example .env
npm run build
npm start
```
Server runs on `http://localhost:8080`

### 2. Client Setup
```bash
cd client
npm install
npm start
```
Client runs on `http://localhost:3000`

### 3. Test Login
Use these credentials:
- Username: `johnd`
- Password: `m38rmF$`

## 🔧 API Documentation

### MCP Tools Available

| Tool | Purpose | Parameters |
|------|---------|------------|
| `login_user` | User authentication | `username`, `password` |
| `get_products` | Fetch products | `category?`, `limit?` |
| `get_categories` | List categories | none |
| `add_to_cart` | Add item to cart | `user_id`, `product_id`, `quantity?` |
| `remove_from_cart` | Remove from cart | `user_id`, `product_id`, `quantity?` |
| `display_cart` | Show cart details | `user_id` |
| `clear_cart` | Empty cart | `user_id` |
| `get_users` | List all users (bonus) | none |

### HTTP Endpoints

```http
GET  /health                    # Server health check
GET  /mcp/tools                 # List available tools
POST /mcp/tools/{toolName}      # Execute MCP tool
```

## 🧪 Testing

### Manual Testing
1. Open `http://localhost:3000`
2. Login with test credentials
3. Browse products and add to cart
4. Verify cart calculations and persistence
5. Test logout and re-login

### API Testing
```bash
# Health check
curl http://localhost:8080/health

# Login test
curl -X POST http://localhost:8080/mcp/tools/login_user \
  -H "Content-Type: application/json" \
  -d '{"username": "johnd", "password": "m38rmF$"}'

# Get products
curl -X POST http://localhost:8080/mcp/tools/get_products \
  -H "Content-Type: application/json" \
  -d '{"category": "electronics"}'
```

## ⚙️ Configuration

### Server (.env)
```env
PORT=8080
FAKESTORE_API_URL=https://fakestoreapi.com
CORS_ORIGIN=http://localhost:3000
DEBUG=true
```

### Available Test Users
| Username | Password | Name |
|----------|----------|------|
| `johnd` | `m38rmF$` | John Doe |
| `mor_2314` | `83r5^_` | Morrison |
| `kevinryan` | `kev02937@` | Kevin Ryan |
| `donero` | `ewedon` | Don Ero |

## 🚨 Troubleshooting

**Port conflicts:** Change `PORT` in server `.env` or `REACT_APP_MCP_BRIDGE_URL` in client  
**CORS errors:** Ensure `CORS_ORIGIN` matches client URL  
**Build errors:** Run `npm run build` in server directory  
**Login issues:** Verify server is running and accessible  

## 📊 Features Demonstrated

### Core Functionality
- ✅ User authentication with Fake Store API
- ✅ Product browsing with real API data
- ✅ Shopping cart CRUD operations
- ✅ Itemized cart with tax calculation

### Technical Implementation
- ✅ Full TypeScript implementation
- ✅ Error handling and validation
- ✅ RESTful API design
- ✅ Responsive React UI
- ✅ State management with hooks
- ✅ Browser storage persistence

### Bonus Implementations
- ✅ Advanced filtering and categorization
- ✅ User session management
- ✅ Comprehensive API documentation
- ✅ Health monitoring endpoints
