// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'templates',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/templates/{templateId}',
  operationId: 'deleteTemplate',
};

export const tool: Tool = {
  name: 'delete_templates',
  description: 'Delete template',
  inputSchema: {
    type: 'object',
    properties: {
      templateId: {
        type: 'string',
      },
    },
    required: ['templateId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { templateId, ...body } = args as any;
  const response = await client.templates.delete(templateId).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
