// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Tools extends APIResource {
  /**
   * Create a new tool for an agent. Tools allow the agent to call external webhooks.
   *
   * @example
   * ```ts
   * const tool = await client.senders.agent.tools.create(
   *   'senderId',
   *   {
   *     description: 'Get the status of a customer order',
   *     name: 'get_order_status',
   *     parameters: {
   *       type: 'object',
   *       properties: {
   *         order_id: {
   *           type: 'string',
   *           description: 'The order ID to look up',
   *         },
   *       },
   *       required: ['order_id'],
   *     },
   *     webhookUrl:
   *       'https://api.example.com/webhooks/order-status',
   *     webhookSecret: 'whsec_...',
   *   },
   * );
   * ```
   */
  create(senderID: string, body: ToolCreateParams, options?: RequestOptions): APIPromise<ToolCreateResponse> {
    return this._client.post(path`/v1/senders/${senderID}/agent/tools`, { body, ...options });
  }

  /**
   * Get a specific tool.
   *
   * @example
   * ```ts
   * const tool = await client.senders.agent.tools.retrieve(
   *   'toolId',
   *   { senderId: 'senderId' },
   * );
   * ```
   */
  retrieve(
    toolID: string,
    params: ToolRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ToolRetrieveResponse> {
    const { senderId } = params;
    return this._client.get(path`/v1/senders/${senderId}/agent/tools/${toolID}`, options);
  }

  /**
   * Update a tool.
   *
   * @example
   * ```ts
   * const tool = await client.senders.agent.tools.update(
   *   'toolId',
   *   { senderId: 'senderId' },
   * );
   * ```
   */
  update(toolID: string, params: ToolUpdateParams, options?: RequestOptions): APIPromise<ToolUpdateResponse> {
    const { senderId, ...body } = params;
    return this._client.patch(path`/v1/senders/${senderId}/agent/tools/${toolID}`, { body, ...options });
  }

  /**
   * List tools for an agent.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agentTool of client.senders.agent.tools.list(
   *   'senderId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    senderID: string,
    query: ToolListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentToolsCursor, AgentTool> {
    return this._client.getAPIList(path`/v1/senders/${senderID}/agent/tools`, Cursor<AgentTool>, {
      query,
      ...options,
    });
  }

  /**
   * Delete a tool.
   *
   * @example
   * ```ts
   * await client.senders.agent.tools.delete('toolId', {
   *   senderId: 'senderId',
   * });
   * ```
   */
  delete(toolID: string, params: ToolDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { senderId } = params;
    return this._client.delete(path`/v1/senders/${senderId}/agent/tools/${toolID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Test a tool by triggering its webhook with test parameters.
   *
   * @example
   * ```ts
   * const response = await client.senders.agent.tools.test(
   *   'toolId',
   *   {
   *     senderId: 'senderId',
   *     testParams: { order_id: 'ORD-12345' },
   *   },
   * );
   * ```
   */
  test(toolID: string, params: ToolTestParams, options?: RequestOptions): APIPromise<ToolTestResponse> {
    const { senderId, ...body } = params;
    return this._client.post(path`/v1/senders/${senderId}/agent/tools/${toolID}/test`, { body, ...options });
  }
}

export type AgentToolsCursor = Cursor<AgentTool>;

export interface AgentTool {
  id: string;

  agentId: string;

  createdAt: string;

  /**
   * Description for the LLM to understand when to use this tool.
   */
  description: string;

  enabled: boolean;

  name: string;

  parameters: AgentTool.Parameters;

  updatedAt: string;

  /**
   * HTTPS URL to call when the tool is executed.
   */
  webhookUrl: string;
}

export namespace AgentTool {
  export interface Parameters {
    properties: { [key: string]: Parameters.Properties };

    required: Array<string>;

    type: 'object';
  }

  export namespace Parameters {
    export interface Properties {
      description?: string;

      type?: string;
    }
  }
}

export interface ToolCreateResponse {
  tool: AgentTool;
}

export interface ToolRetrieveResponse {
  tool: AgentTool;
}

export interface ToolUpdateResponse {
  tool: AgentTool;
}

export interface ToolTestResponse {
  scheduled: boolean;
}

export interface ToolCreateParams {
  description: string;

  name: string;

  parameters: ToolCreateParams.Parameters;

  /**
   * Must be HTTPS.
   */
  webhookUrl: string;

  enabled?: boolean;

  /**
   * Optional secret for webhook signature verification.
   */
  webhookSecret?: string;
}

export namespace ToolCreateParams {
  export interface Parameters {
    properties: { [key: string]: Parameters.Properties };

    required: Array<string>;

    type: 'object';
  }

  export namespace Parameters {
    export interface Properties {
      description?: string;

      type?: string;
    }
  }
}

export interface ToolRetrieveParams {
  senderId: string;
}

export interface ToolUpdateParams {
  /**
   * Path param:
   */
  senderId: string;

  /**
   * Body param:
   */
  description?: string;

  /**
   * Body param:
   */
  enabled?: boolean;

  /**
   * Body param:
   */
  name?: string;

  /**
   * Body param:
   */
  parameters?: ToolUpdateParams.Parameters;

  /**
   * Body param:
   */
  webhookSecret?: string | null;

  /**
   * Body param:
   */
  webhookUrl?: string;
}

export namespace ToolUpdateParams {
  export interface Parameters {
    properties: { [key: string]: Parameters.Properties };

    required: Array<string>;

    type: 'object';
  }

  export namespace Parameters {
    export interface Properties {
      description?: string;

      type?: string;
    }
  }
}

export interface ToolListParams extends CursorParams {
  enabled?: boolean;
}

export interface ToolDeleteParams {
  senderId: string;
}

export interface ToolTestParams {
  /**
   * Path param:
   */
  senderId: string;

  /**
   * Body param: Parameters to pass to the tool for testing.
   */
  testParams: { [key: string]: unknown };
}

export declare namespace Tools {
  export {
    type AgentTool as AgentTool,
    type ToolCreateResponse as ToolCreateResponse,
    type ToolRetrieveResponse as ToolRetrieveResponse,
    type ToolUpdateResponse as ToolUpdateResponse,
    type ToolTestResponse as ToolTestResponse,
    type AgentToolsCursor as AgentToolsCursor,
    type ToolCreateParams as ToolCreateParams,
    type ToolRetrieveParams as ToolRetrieveParams,
    type ToolUpdateParams as ToolUpdateParams,
    type ToolListParams as ToolListParams,
    type ToolDeleteParams as ToolDeleteParams,
    type ToolTestParams as ToolTestParams,
  };
}
