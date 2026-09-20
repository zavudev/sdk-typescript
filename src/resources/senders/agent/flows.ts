// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Flows extends APIResource {
  /**
   * Create a new flow for an agent.
   *
   * @example
   * ```ts
   * const flow = await client.senders.agent.flows.create(
   *   'senderId',
   *   {
   *     name: 'Lead Capture',
   *     steps: [
   *       {
   *         id: 'welcome',
   *         type: 'message',
   *         config: {
   *           text: 'Thanks for your interest! Let me get some info.',
   *         },
   *         nextStepId: 'ask_name',
   *       },
   *       {
   *         id: 'ask_name',
   *         type: 'collect',
   *         config: {
   *           variable: 'name',
   *           prompt: "What's your name?",
   *         },
   *       },
   *     ],
   *     trigger: {
   *       type: 'keyword',
   *       keywords: ['info', 'pricing', 'demo'],
   *     },
   *     description: 'Capture lead information',
   *   },
   * );
   * ```
   */
  create(senderID: string, body: FlowCreateParams, options?: RequestOptions): APIPromise<FlowCreateResponse> {
    return this._client.post(path`/v1/senders/${senderID}/agent/flows`, { body, ...options });
  }

  /**
   * Get a specific flow.
   *
   * @example
   * ```ts
   * const flow = await client.senders.agent.flows.retrieve(
   *   'flowId',
   *   { senderId: 'senderId' },
   * );
   * ```
   */
  retrieve(
    flowID: string,
    params: FlowRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<FlowRetrieveResponse> {
    const { senderId } = params;
    return this._client.get(path`/v1/senders/${senderId}/agent/flows/${flowID}`, options);
  }

  /**
   * Update a flow.
   *
   * @example
   * ```ts
   * const flow = await client.senders.agent.flows.update(
   *   'flowId',
   *   { senderId: 'senderId' },
   * );
   * ```
   */
  update(flowID: string, params: FlowUpdateParams, options?: RequestOptions): APIPromise<FlowUpdateResponse> {
    const { senderId, ...body } = params;
    return this._client.patch(path`/v1/senders/${senderId}/agent/flows/${flowID}`, { body, ...options });
  }

  /**
   * List flows for an agent.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agentFlow of client.senders.agent.flows.list(
   *   'senderId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    senderID: string,
    query: FlowListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentFlowsCursor, AgentFlow> {
    return this._client.getAPIList(path`/v1/senders/${senderID}/agent/flows`, Cursor<AgentFlow>, {
      query,
      ...options,
    });
  }

  /**
   * Delete a flow. Cannot delete flows with active sessions.
   *
   * @example
   * ```ts
   * await client.senders.agent.flows.delete('flowId', {
   *   senderId: 'senderId',
   * });
   * ```
   */
  delete(flowID: string, params: FlowDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { senderId } = params;
    return this._client.delete(path`/v1/senders/${senderId}/agent/flows/${flowID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Create a copy of an existing flow with a new name.
   *
   * @example
   * ```ts
   * const response = await client.senders.agent.flows.duplicate(
   *   'flowId',
   *   { senderId: 'senderId', newName: 'Lead Capture (Copy)' },
   * );
   * ```
   */
  duplicate(
    flowID: string,
    params: FlowDuplicateParams,
    options?: RequestOptions,
  ): APIPromise<FlowDuplicateResponse> {
    const { senderId, ...body } = params;
    return this._client.post(path`/v1/senders/${senderId}/agent/flows/${flowID}/duplicate`, {
      body,
      ...options,
    });
  }
}

export type AgentFlowsCursor = Cursor<AgentFlow>;

export interface AgentFlow {
  id: string;

  agentId: string;

  createdAt: string;

  enabled: boolean;

  name: string;

  /**
   * Priority when multiple flows match (higher = more priority).
   */
  priority: number;

  steps: Array<FlowStep>;

  trigger: FlowTrigger;

  updatedAt: string;

  description?: string | null;
}

export interface FlowStep {
  /**
   * Unique step identifier.
   */
  id: string;

  /**
   * Step configuration (varies by type).
   */
  config: { [key: string]: unknown };

  /**
   * Type of flow step.
   */
  type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer';

  /**
   * ID of the next step to execute.
   */
  nextStepId?: string | null;
}

export interface FlowTrigger {
  /**
   * What starts a flow.
   *
   * - `keyword`: the message contains one of the words listed in `keywords`. Plain
   *   substring matching, so a word inside another word still counts.
   * - `intent`: the message MEANS what `intent` describes, whatever words it uses.
   * - `always`: any message starts it.
   * - `manual`: reserved. Nothing starts a `manual` flow today — it is accepted and
   *   stored, and no message or endpoint runs it.
   */
  type: 'keyword' | 'intent' | 'always' | 'manual';

  /**
   * One plain sentence describing what the contact wants, for `intent` triggers. Any
   * language.
   *
   * The message is judged for meaning, not for words, so "kiero saber el presio"
   * starts a flow whose intent is "quiere saber precios o cotizar", and "no quiero
   * info de precios" starts nothing.
   *
   * A `keyword` or `always` flow with a higher `priority` is matched first and wins.
   * At most 12 intent flows are considered per message, highest priority first. When
   * the classification is unavailable or uncertain, the message is handled as if no
   * intent matched, so a flow never starts on a guess.
   */
  intent?: string;

  /**
   * Words that start the flow, for `keyword` triggers. Matched as substrings,
   * case-insensitively, against the whole message: a flow on `info` also starts on
   * "no quiero info". Use `intent` when that matters.
   */
  keywords?: Array<string>;
}

export interface FlowCreateResponse {
  flow: AgentFlow;
}

export interface FlowRetrieveResponse {
  flow: AgentFlow;
}

export interface FlowUpdateResponse {
  flow: AgentFlow;
}

export interface FlowDuplicateResponse {
  flow: AgentFlow;
}

export interface FlowCreateParams {
  name: string;

  steps: Array<FlowStep>;

  trigger: FlowTrigger;

  description?: string;

  enabled?: boolean;

  priority?: number;
}

export interface FlowRetrieveParams {
  senderId: string;
}

export interface FlowUpdateParams {
  /**
   * Path param
   */
  senderId: string;

  /**
   * Body param
   */
  description?: string;

  /**
   * Body param
   */
  enabled?: boolean;

  /**
   * Body param
   */
  name?: string;

  /**
   * Body param
   */
  priority?: number;

  /**
   * Body param
   */
  steps?: Array<FlowStep>;

  /**
   * Body param
   */
  trigger?: FlowTrigger;
}

export interface FlowListParams extends CursorParams {
  enabled?: boolean;
}

export interface FlowDeleteParams {
  senderId: string;
}

export interface FlowDuplicateParams {
  /**
   * Path param
   */
  senderId: string;

  /**
   * Body param
   */
  newName: string;
}

export declare namespace Flows {
  export {
    type AgentFlow as AgentFlow,
    type FlowStep as FlowStep,
    type FlowTrigger as FlowTrigger,
    type FlowCreateResponse as FlowCreateResponse,
    type FlowRetrieveResponse as FlowRetrieveResponse,
    type FlowUpdateResponse as FlowUpdateResponse,
    type FlowDuplicateResponse as FlowDuplicateResponse,
    type AgentFlowsCursor as AgentFlowsCursor,
    type FlowCreateParams as FlowCreateParams,
    type FlowRetrieveParams as FlowRetrieveParams,
    type FlowUpdateParams as FlowUpdateParams,
    type FlowListParams as FlowListParams,
    type FlowDeleteParams as FlowDeleteParams,
    type FlowDuplicateParams as FlowDuplicateParams,
  };
}
