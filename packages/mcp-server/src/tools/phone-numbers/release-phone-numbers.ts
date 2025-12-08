// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'phone_numbers',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/phone-numbers/{phoneNumberId}',
  operationId: 'releasePhoneNumber',
};

export const tool: Tool = {
  name: 'release_phone_numbers',
  description: 'Release a phone number. The phone number must not be assigned to a sender.',
  inputSchema: {
    type: 'object',
    properties: {
      phoneNumberId: {
        type: 'string',
      },
    },
    required: ['phoneNumberId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { phoneNumberId, ...body } = args as any;
  const response = await client.phoneNumbers.release(phoneNumberId).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
