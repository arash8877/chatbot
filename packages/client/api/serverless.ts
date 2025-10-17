// packages/client/api/serverless.ts
import { IncomingMessage, ServerResponse } from 'http';
import type { Request, Response } from 'express';
import { app } from '../../server/index'; // your Express app

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // cast through 'unknown' to avoid using 'any' while satisfying Express types
  app(req as unknown as Request, res as unknown as Response); // pass request/response directly to Express
}
