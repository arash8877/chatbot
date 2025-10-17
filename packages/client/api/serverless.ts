import { createServer, IncomingMessage, ServerResponse } from 'http';
import { app } from '../../server/index'; // import your express app

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const server = createServer(app);
  server.emit('request', req, res);
}
