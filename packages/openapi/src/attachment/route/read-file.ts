import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { READ_FILE_URL } from '../path';

export const ReadFileRoute: RouteConfig = {
  method: 'get',
  path: READ_FILE_URL,
  description: 'upload attachment',
  summary: 'Get file stream',
  request: {
    params: z.object({
      token: z.string(),
    }),
    query: z.object({
      filename: z.string().optional().openapi({ description: 'File name for download' }),
    }),
  },
  responses: {
    200: {
      description: '',
    },
  },
  tags: ['attachments'],
};