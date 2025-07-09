# Chat Realtime Server

This is the backend for a simple real-time chat application using **NestJS** and **Socket.IO**.

## Features

- Real-time messaging using WebSockets (Socket.IO)
- Room-based chat support
- User join/leave event notifications
- Modular and scalable NestJS structure

## Technologies Used

- NestJS
- Socket.IO
- TypeScript

## Getting Started

### Installation

```bash
git clone https://github.com/annguyen115/chat-realtime-server.git
cd chat-realtime-server
npm install
```

### Running the Server

```bash
npm run start:dev
```

The server will run by default on `http://localhost:4000`.

### Production Build

```bash
npm run build
npm run start:prod
```

## Socket.IO Events

- `connection`: Triggered when a client connects
- `join`: Join a chat room
- `message`: Send a message to a room
- `disconnect`: Triggered when a client disconnects

## Project Structure (NestJS)

```
src/
├── app.module.ts
├── main.ts
├── chat/
│   ├── chat.gateway.ts
│   ├── chat.module.ts
│   └── chat.service.ts
```

## Possible Improvements

- JWT authentication
- Redis adapter for scalability
- Persist chat history in a database (MongoDB, PostgreSQL, etc.)
- Logging and monitoring

## License

MIT License
