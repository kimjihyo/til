
### Apache

- HTTP Web Server
- Written in C
- Primary use: Serving static content & PHP

### Nginx

- HTTP Server + Reverse Proxy / Load Balancer
- Written in C
- Serving static contents, doesn’t support dynamic content directly.

### Tomcat

- Java Application Server
- Written in C
- Running Java web applications (Servlets, JSP)

### Netty

- A network application framework, not a web server
- Doesn’t come with built-in support for HTTP routing, static file serving, directory browsing, SSL setup etc.
- When frameworks wan t to control the full networking stack (e.g. Spring WebFlux, gRPC, Vert.x)
- Used when you need custom protocols or high performance non-HTTP servers
- 🧱 Netty is like bricks, cement, and tools
- 🏠 A **web server** like **Tomcat or Nginx** is a **finished house**

| Feature                     | **Web Server (e.g., Tomcat, Nginx)** | **Netty**                              |
| --------------------------- | ------------------------------------ | -------------------------------------- |
| Handles HTTP out-of-the-box | ✅ Yes                                | ❌ No (unless you build it)             |
| Serves static files         | ✅ Yes                                | ❌ No                                   |
| Has routing (e.g. `/users`) | ✅ Yes                                | ❌ No (you define the protocol/routing) |
| Has request/response APIs   | ✅ Yes (`HttpServletRequest`, etc.)   | ❌ No — raw TCP/UDP/HTTP abstraction    |
| Easy to use for websites    | ✅ Yes                                | ❌ Not directly                         |
| Fully-featured HTTP server  | ✅ Yes                                | ❌ Netty is a **tool to build one**     |

