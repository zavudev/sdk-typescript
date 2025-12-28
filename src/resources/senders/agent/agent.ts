// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ExecutionsAPI from './executions';
import { ExecutionListParams, Executions } from './executions';
import * as FlowsAPI from './flows';
import {
  AgentFlow,
  AgentFlowsCursor,
  FlowCreateParams,
  FlowCreateResponse,
  FlowDeleteParams,
  FlowDuplicateParams,
  FlowDuplicateResponse,
  FlowListParams,
  FlowRetrieveParams,
  FlowRetrieveResponse,
  FlowUpdateParams,
  FlowUpdateResponse,
  Flows,
} from './flows';
import * as ToolsAPI from './tools';
import {
  AgentTool,
  AgentToolsCursor,
  ToolCreateParams,
  ToolCreateResponse,
  ToolDeleteParams,
  ToolListParams,
  ToolRetrieveParams,
  ToolRetrieveResponse,
  ToolTestParams,
  ToolTestResponse,
  ToolUpdateParams,
  ToolUpdateResponse,
  Tools,
} from './tools';
import * as KnowledgeBasesAPI from './knowledge-bases/knowledge-bases';
import {
  AgentDocument,
  AgentKnowledgeBase,
  AgentKnowledgeBasesCursor,
  KnowledgeBaseCreateParams,
  KnowledgeBaseCreateResponse,
  KnowledgeBaseDeleteParams,
  KnowledgeBaseListParams,
  KnowledgeBaseRetrieveParams,
  KnowledgeBaseRetrieveResponse,
  KnowledgeBaseUpdateParams,
  KnowledgeBaseUpdateResponse,
  KnowledgeBases,
} from './knowledge-bases/knowledge-bases';
import { APIPromise } from '../../../core/api-promise';
import { Cursor } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class AgentResource extends APIResource {
  executions: ExecutionsAPI.Executions = new ExecutionsAPI.Executions(this._client);
  flows: FlowsAPI.Flows = new FlowsAPI.Flows(this._client);
  tools: ToolsAPI.Tools = new ToolsAPI.Tools(this._client);
  knowledgeBases: KnowledgeBasesAPI.KnowledgeBases = new KnowledgeBasesAPI.KnowledgeBases(this._client);

  /**
   * Create an AI agent for a sender. Each sender can have at most one agent.
   *
   * @example
   * ```ts
   * const agentResponse = await client.senders.agent.create(
   *   'senderId',
   *   {
   *     model: 'gpt-4o-mini',
   *     name: 'Customer Support',
   *     provider: 'openai',
   *     systemPrompt:
   *       'You are a helpful customer support agent. Be friendly and concise.',
   *     apiKey: 'sk-...',
   *   },
   * );
   * ```
   */
  create(senderID: string, body: AgentCreateParams, options?: RequestOptions): APIPromise<AgentResponse> {
    return this._client.post(path`/v1/senders/${senderID}/agent`, { body, ...options });
  }

  /**
   * Get the AI agent configuration for a sender.
   *
   * @example
   * ```ts
   * const agentResponse = await client.senders.agent.retrieve(
   *   'senderId',
   * );
   * ```
   */
  retrieve(senderID: string, options?: RequestOptions): APIPromise<AgentResponse> {
    return this._client.get(path`/v1/senders/${senderID}/agent`, options);
  }

  /**
   * Update an AI agent's configuration.
   *
   * @example
   * ```ts
   * const agentResponse = await client.senders.agent.update(
   *   'senderId',
   * );
   * ```
   */
  update(senderID: string, body: AgentUpdateParams, options?: RequestOptions): APIPromise<AgentResponse> {
    return this._client.patch(path`/v1/senders/${senderID}/agent`, { body, ...options });
  }

  /**
   * Delete an AI agent.
   *
   * @example
   * ```ts
   * await client.senders.agent.delete('senderId');
   * ```
   */
  delete(senderID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/senders/${senderID}/agent`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get statistics for an AI agent including invocations, tokens, and costs.
   *
   * @example
   * ```ts
   * const agentStats = await client.senders.agent.stats(
   *   'senderId',
   * );
   * ```
   */
  stats(senderID: string, options?: RequestOptions): APIPromise<AgentStats> {
    return this._client.get(path`/v1/senders/${senderID}/agent/stats`, options);
  }
}

export type AgentExecutionsCursor = Cursor<AgentExecution>;

/**
 * AI Agent configuration for a sender.
 */
export interface Agent {
  id: string;

  createdAt: string;

  /**
   * Whether the agent is active.
   */
  enabled: boolean;

  /**
   * Model ID (e.g., gpt-4o-mini, claude-3-5-sonnet).
   */
  model: string;

  name: string;

  /**
   * LLM provider for the AI agent.
   */
  provider: AgentProvider;

  senderId: string;

  /**
   * System prompt for the agent.
   */
  systemPrompt: string;

  updatedAt: string;

  /**
   * Number of previous messages to include as context.
   */
  contextWindowMessages?: number;

  /**
   * Whether to include contact metadata in context.
   */
  includeContactMetadata?: boolean;

  /**
   * Maximum tokens for LLM response.
   */
  maxTokens?: number | null;

  stats?: Agent.Stats;

  /**
   * LLM temperature (0-2).
   */
  temperature?: number | null;

  /**
   * Channels that trigger the agent.
   */
  triggerOnChannels?: Array<string>;

  /**
   * Message types that trigger the agent.
   */
  triggerOnMessageTypes?: Array<string>;
}

export namespace Agent {
  export interface Stats {
    /**
     * Total cost in USD.
     */
    totalCost?: number;

    totalInvocations?: number;

    totalTokensUsed?: number;
  }
}

export interface AgentExecution {
  id: string;

  agentId: string;

  /**
   * Cost in USD.
   */
  cost: number;

  createdAt: string;

  inputTokens: number;

  latencyMs: number;

  outputTokens: number;

  /**
   * Status of an agent execution.
   */
  status: AgentExecutionStatus;

  errorMessage?: string | null;

  inboundMessageId?: string;

  responseMessageId?: string | null;

  responseText?: string | null;
}

/**
 * Status of an agent execution.
 */
export type AgentExecutionStatus = 'success' | 'error' | 'filtered' | 'rate_limited' | 'balance_insufficient';

/**
 * LLM provider for the AI agent.
 */
export type AgentProvider = 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu';

export interface AgentResponse {
  /**
   * AI Agent configuration for a sender.
   */
  agent: Agent;
}

export interface AgentStats {
  errorCount: number;

  successCount: number;

  /**
   * Total cost in USD.
   */
  totalCost: number;

  totalInvocations: number;

  totalTokensUsed: number;

  avgLatencyMs?: number | null;
}

export interface AgentCreateParams {
  model: string;

  name: string;

  /**
   * LLM provider for the AI agent.
   */
  provider: AgentProvider;

  systemPrompt: string;

  /**
   * API key for the LLM provider. Required unless provider is 'zavu'.
   */
  apiKey?: string;

  contextWindowMessages?: number;

  includeContactMetadata?: boolean;

  maxTokens?: number;

  temperature?: number;

  triggerOnChannels?: Array<string>;

  triggerOnMessageTypes?: Array<string>;
}

export interface AgentUpdateParams {
  apiKey?: string;

  contextWindowMessages?: number;

  enabled?: boolean;

  includeContactMetadata?: boolean;

  maxTokens?: number | null;

  model?: string;

  name?: string;

  /**
   * LLM provider for the AI agent.
   */
  provider?: AgentProvider;

  systemPrompt?: string;

  temperature?: number | null;

  triggerOnChannels?: Array<string>;

  triggerOnMessageTypes?: Array<string>;
}

AgentResource.Executions = Executions;
AgentResource.Flows = Flows;
AgentResource.Tools = Tools;
AgentResource.KnowledgeBases = KnowledgeBases;

export declare namespace AgentResource {
  export {
    type Agent as Agent,
    type AgentExecution as AgentExecution,
    type AgentExecutionStatus as AgentExecutionStatus,
    type AgentProvider as AgentProvider,
    type AgentResponse as AgentResponse,
    type AgentStats as AgentStats,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
  };

  export { Executions as Executions, type ExecutionListParams as ExecutionListParams };

  export {
    Flows as Flows,
    type AgentFlow as AgentFlow,
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

  export {
    Tools as Tools,
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

  export {
    KnowledgeBases as KnowledgeBases,
    type AgentDocument as AgentDocument,
    type AgentKnowledgeBase as AgentKnowledgeBase,
    type KnowledgeBaseCreateResponse as KnowledgeBaseCreateResponse,
    type KnowledgeBaseRetrieveResponse as KnowledgeBaseRetrieveResponse,
    type KnowledgeBaseUpdateResponse as KnowledgeBaseUpdateResponse,
    type AgentKnowledgeBasesCursor as AgentKnowledgeBasesCursor,
    type KnowledgeBaseCreateParams as KnowledgeBaseCreateParams,
    type KnowledgeBaseRetrieveParams as KnowledgeBaseRetrieveParams,
    type KnowledgeBaseUpdateParams as KnowledgeBaseUpdateParams,
    type KnowledgeBaseListParams as KnowledgeBaseListParams,
    type KnowledgeBaseDeleteParams as KnowledgeBaseDeleteParams,
  };
}
