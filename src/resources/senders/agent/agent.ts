// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ExecutionsAPI from './executions';
import {
  ExecutionListParams,
  ExecutionRetrieveParams,
  ExecutionRetrieveResponse,
  Executions,
} from './executions';
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
  FlowStep,
  FlowTrigger,
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
  ToolParameters,
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
   * Covers the messaging channels only. Voice calls are not counted here: a call is
   * a multi-turn conversation rather than one inbound message and one reply, so it
   * is recorded as a call, not an execution. An agent that only answers phone calls
   * reports zeros on every field. Use `GET /v1/calls` for voice activity, duration,
   * and cost.
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

  /**
   * Senders this agent answers on. An agent can serve several; `senderId` remains
   * the primary one, for compatibility.
   */
  senderIds?: Array<string>;

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

  /**
   * Voice Agent configuration. When present and enabled, the agent can answer
   * inbound phone calls and place outbound calls with Zavu's managed voice pipeline.
   * Requires the Voice Agents feature to be enabled for your team.
   */
  voice?: Agent.Voice;
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

  /**
   * Voice Agent configuration. When present and enabled, the agent can answer
   * inbound phone calls and place outbound calls with Zavu's managed voice pipeline.
   * Requires the Voice Agents feature to be enabled for your team.
   */
  export interface Voice {
    /**
     * Whether the agent handles voice calls. When false, the sender's number is not
     * answered by the voice agent and outbound calls are rejected.
     */
    enabled: boolean;

    /**
     * Opening line the agent speaks when the call connects. If omitted, the agent
     * waits for the caller to speak first.
     */
    greeting?: string;

    /**
     * Greeting per language, keyed by language code. Used when the caller's language
     * differs from the one `greeting` is written in.
     */
    greetings?: { [key: string]: string };

    /**
     * Whether the caller can interrupt the agent while it is speaking (barge-in). When
     * true, the agent stops talking as soon as the caller starts.
     */
    interruptible?: boolean;

    /**
     * BCP-47 language code used for both speech recognition and speech synthesis (e.g.
     * `en`, `es`, `pt-BR`). Auto-detected from the recipient when omitted.
     */
    language?: string;

    /**
     * Hard limit on call length in minutes. The call ends automatically when reached.
     */
    maxCallDurationMinutes?: number;

    /**
     * How long the agent waits during silence before ending the call.
     */
    maxIdleSeconds?: number;

    /**
     * Model that runs the conversation, co-located in the voice network for lowest
     * latency. Independent of the model used for text messaging. Derived from the
     * agent's text model when omitted.
     */
    model?: string;

    /**
     * Whether the call audio is recorded.
     */
    recordCalls?: boolean;

    /**
     * Speech-recognition model. Uses the default when omitted.
     */
    sttModel?: string;

    /**
     * Speech-recognition provider. Uses the default when omitted.
     */
    sttProvider?: string;

    /**
     * E.164 phone number the agent can transfer the call to. When set, the agent is
     * given a transfer tool it can use to hand the call to a human.
     */
    transferPhoneNumber?: string;

    /**
     * Speech-synthesis provider. Uses the default when omitted.
     */
    ttsProvider?: string;

    /**
     * Identifier of the synthesized voice that speaks. Choose from the voices
     * available in the dashboard. Uses a neutral default when omitted.
     */
    ttsVoiceId?: string;

    /**
     * What the agent does when an answering machine or voicemail is detected on an
     * outbound call.
     */
    voicemailAction?: 'hangup' | 'leave_message';

    /**
     * Message spoken when `voicemailAction` is `leave_message`. Falls back to
     * `greeting` when omitted.
     */
    voicemailMessage?: string;

    /**
     * Speech rate. 1.0 is natural. Only honoured by voices that support rate control;
     * ignored by the others.
     */
    voiceSpeed?: number;
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

  /**
   * Knowledge-base chunks retrieved for this answer. Zero on an agent that has
   * documents attached means the reply was not grounded in them, which is otherwise
   * indistinguishable from a correct answer in this record. Absent on executions
   * recorded before this field existed, which is not the same as zero.
   */
  knowledgeChunksUsed?: number | null;

  responseMessageId?: string | null;

  responseText?: string | null;

  /**
   * Tools the agent called while producing this reply. Zero on an agent that has
   * tools configured means it answered without calling any — the case where a reply
   * says it will look something up and nothing ever reaches your endpoint. Absent on
   * executions recorded before this field existed, which is not the same as zero.
   */
  toolCalls?: number | null;
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

  /**
   * Voice Agent configuration. Enable this to let the agent answer and place phone
   * calls with Zavu's managed voice pipeline. Requires the Voice Agents feature to
   * be enabled for your team.
   */
  voice?: AgentCreateParams.Voice;
}

export namespace AgentCreateParams {
  /**
   * Voice Agent configuration. Enable this to let the agent answer and place phone
   * calls with Zavu's managed voice pipeline. Requires the Voice Agents feature to
   * be enabled for your team.
   */
  export interface Voice {
    /**
     * Whether the agent handles voice calls. When false, the sender's number is not
     * answered by the voice agent and outbound calls are rejected.
     */
    enabled: boolean;

    /**
     * Opening line the agent speaks when the call connects. If omitted, the agent
     * waits for the caller to speak first.
     */
    greeting?: string;

    /**
     * Greeting per language, keyed by language code. Used when the caller's language
     * differs from the one `greeting` is written in.
     */
    greetings?: { [key: string]: string };

    /**
     * Whether the caller can interrupt the agent while it is speaking (barge-in). When
     * true, the agent stops talking as soon as the caller starts.
     */
    interruptible?: boolean;

    /**
     * BCP-47 language code used for both speech recognition and speech synthesis (e.g.
     * `en`, `es`, `pt-BR`). Auto-detected from the recipient when omitted.
     */
    language?: string;

    /**
     * Hard limit on call length in minutes. The call ends automatically when reached.
     */
    maxCallDurationMinutes?: number;

    /**
     * How long the agent waits during silence before ending the call.
     */
    maxIdleSeconds?: number;

    /**
     * Model that runs the conversation, co-located in the voice network for lowest
     * latency. Independent of the model used for text messaging. Derived from the
     * agent's text model when omitted.
     */
    model?: string;

    /**
     * Whether the call audio is recorded.
     */
    recordCalls?: boolean;

    /**
     * Speech-recognition model. Uses the default when omitted.
     */
    sttModel?: string;

    /**
     * Speech-recognition provider. Uses the default when omitted.
     */
    sttProvider?: string;

    /**
     * E.164 phone number the agent can transfer the call to. When set, the agent is
     * given a transfer tool it can use to hand the call to a human.
     */
    transferPhoneNumber?: string;

    /**
     * Speech-synthesis provider. Uses the default when omitted.
     */
    ttsProvider?: string;

    /**
     * Identifier of the synthesized voice that speaks. Choose from the voices
     * available in the dashboard. Uses a neutral default when omitted.
     */
    ttsVoiceId?: string;

    /**
     * What the agent does when an answering machine or voicemail is detected on an
     * outbound call.
     */
    voicemailAction?: 'hangup' | 'leave_message';

    /**
     * Message spoken when `voicemailAction` is `leave_message`. Falls back to
     * `greeting` when omitted.
     */
    voicemailMessage?: string;

    /**
     * Speech rate. 1.0 is natural. Only honoured by voices that support rate control;
     * ignored by the others.
     */
    voiceSpeed?: number;
  }
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

  /**
   * Voice Agent configuration. Patch this object to enable voice, change the
   * greeting, or adjust call limits. Requires the Voice Agents feature to be enabled
   * for your team.
   */
  voice?: AgentUpdateParams.Voice;
}

export namespace AgentUpdateParams {
  /**
   * Voice Agent configuration. Patch this object to enable voice, change the
   * greeting, or adjust call limits. Requires the Voice Agents feature to be enabled
   * for your team.
   */
  export interface Voice {
    /**
     * Whether the agent handles voice calls. When false, the sender's number is not
     * answered by the voice agent and outbound calls are rejected.
     */
    enabled: boolean;

    /**
     * Opening line the agent speaks when the call connects. If omitted, the agent
     * waits for the caller to speak first.
     */
    greeting?: string;

    /**
     * Greeting per language, keyed by language code. Used when the caller's language
     * differs from the one `greeting` is written in.
     */
    greetings?: { [key: string]: string };

    /**
     * Whether the caller can interrupt the agent while it is speaking (barge-in). When
     * true, the agent stops talking as soon as the caller starts.
     */
    interruptible?: boolean;

    /**
     * BCP-47 language code used for both speech recognition and speech synthesis (e.g.
     * `en`, `es`, `pt-BR`). Auto-detected from the recipient when omitted.
     */
    language?: string;

    /**
     * Hard limit on call length in minutes. The call ends automatically when reached.
     */
    maxCallDurationMinutes?: number;

    /**
     * How long the agent waits during silence before ending the call.
     */
    maxIdleSeconds?: number;

    /**
     * Model that runs the conversation, co-located in the voice network for lowest
     * latency. Independent of the model used for text messaging. Derived from the
     * agent's text model when omitted.
     */
    model?: string;

    /**
     * Whether the call audio is recorded.
     */
    recordCalls?: boolean;

    /**
     * Speech-recognition model. Uses the default when omitted.
     */
    sttModel?: string;

    /**
     * Speech-recognition provider. Uses the default when omitted.
     */
    sttProvider?: string;

    /**
     * E.164 phone number the agent can transfer the call to. When set, the agent is
     * given a transfer tool it can use to hand the call to a human.
     */
    transferPhoneNumber?: string;

    /**
     * Speech-synthesis provider. Uses the default when omitted.
     */
    ttsProvider?: string;

    /**
     * Identifier of the synthesized voice that speaks. Choose from the voices
     * available in the dashboard. Uses a neutral default when omitted.
     */
    ttsVoiceId?: string;

    /**
     * What the agent does when an answering machine or voicemail is detected on an
     * outbound call.
     */
    voicemailAction?: 'hangup' | 'leave_message';

    /**
     * Message spoken when `voicemailAction` is `leave_message`. Falls back to
     * `greeting` when omitted.
     */
    voicemailMessage?: string;

    /**
     * Speech rate. 1.0 is natural. Only honoured by voices that support rate control;
     * ignored by the others.
     */
    voiceSpeed?: number;
  }
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

  export {
    Executions as Executions,
    type ExecutionRetrieveResponse as ExecutionRetrieveResponse,
    type ExecutionRetrieveParams as ExecutionRetrieveParams,
    type ExecutionListParams as ExecutionListParams,
  };

  export {
    Flows as Flows,
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

  export {
    Tools as Tools,
    type AgentTool as AgentTool,
    type ToolParameters as ToolParameters,
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
