// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'broadcasts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/broadcasts/{broadcastId}/progress',
  operationId: 'getBroadcastProgress',
};

export const tool: Tool = {
  name: 'progress_broadcasts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet real-time progress of a broadcast including delivery counts and estimated completion time.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/broadcast_progress',\n  $defs: {\n    broadcast_progress: {\n      type: 'object',\n      properties: {\n        broadcastId: {\n          type: 'string'\n        },\n        delivered: {\n          type: 'integer',\n          description: 'Successfully delivered.'\n        },\n        failed: {\n          type: 'integer',\n          description: 'Failed to deliver.'\n        },\n        pending: {\n          type: 'integer',\n          description: 'Not yet queued for sending.'\n        },\n        percentComplete: {\n          type: 'number',\n          description: 'Percentage complete (0-100).'\n        },\n        sending: {\n          type: 'integer',\n          description: 'Currently being sent.'\n        },\n        skipped: {\n          type: 'integer',\n          description: 'Skipped (broadcast cancelled).'\n        },\n        status: {\n          $ref: '#/$defs/broadcast_status'\n        },\n        total: {\n          type: 'integer',\n          description: 'Total contacts in broadcast.'\n        },\n        actualCost: {\n          type: 'number',\n          description: 'Actual cost so far in USD.'\n        },\n        estimatedCompletionAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        estimatedCost: {\n          type: 'number',\n          description: 'Estimated total cost in USD.'\n        },\n        reservedAmount: {\n          type: 'number',\n          description: 'Amount reserved from balance in USD.'\n        },\n        startedAt: {\n          type: 'string',\n          format: 'date-time'\n        }\n      },\n      required: [        'broadcastId',\n        'delivered',\n        'failed',\n        'pending',\n        'percentComplete',\n        'sending',\n        'skipped',\n        'status',\n        'total'\n      ]\n    },\n    broadcast_status: {\n      type: 'string',\n      description: 'Current status of the broadcast.',\n      enum: [        'draft',\n        'scheduled',\n        'sending',\n        'paused',\n        'completed',\n        'cancelled',\n        'failed'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      broadcastId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['broadcastId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { broadcastId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.broadcasts.progress(broadcastId)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
