// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SendersAPI from './senders';
import { SenderConnectParams, SenderConnectResponse, SenderDisconnectParams, Senders } from './senders';
import * as AgentAPI from '../senders/agent/agent';
import { AgentsCursor } from '../senders/agent/agent';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Agents extends APIResource {
  senders: SendersAPI.Senders = new SendersAPI.Senders(this._client);

  /**
   * Create an agent without a sender. It is created disabled; connect a sender and
   * enable it when you are ready for it to answer.
   *
   * **Sub-resources.** An agent's tools, flows and knowledge bases are reachable at
   * `/v1/agents/{agentId}/tools`, `/v1/agents/{agentId}/flows` and
   * `/v1/agents/{agentId}/knowledge-bases`, mirroring the sender-scoped routes
   * documented under `/v1/senders/{senderId}/agent/...` exactly. Use the
   * agent-scoped form while the agent has no sender: the sender-scoped one cannot
   * address it.
   *
   * @example
   * ```ts
   * const agent = await client.agents.create({
   *   model: 'model',
   *   name: 'name',
   *   provider: 'openai',
   *   systemPrompt: 'systemPrompt',
   * });
   * ```
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<AgentCreateResponse> {
    return this._client.post('/v1/agents', { body, ...options });
  }

  /**
   * Get an agent
   *
   * @example
   * ```ts
   * const agent = await client.agents.retrieve('agentId');
   * ```
   */
  retrieve(agentID: string, options?: RequestOptions): APIPromise<AgentRetrieveResponse> {
    return this._client.get(path`/v1/agents/${agentID}`, options);
  }

  /**
   * Update an agent
   *
   * @example
   * ```ts
   * const agent = await client.agents.update('agentId');
   * ```
   */
  update(
    agentID: string,
    body: AgentUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AgentUpdateResponse> {
    return this._client.patch(path`/v1/agents/${agentID}`, { body, ...options });
  }

  /**
   * Every agent in the project, newest first — including agents that are not
   * connected to any sender yet, which the sender-scoped routes cannot reach. Each
   * item carries `senderIds`, the senders the agent answers on.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agent of client.agents.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentsCursor, AgentAPI.Agent> {
    return this._client.getAPIList('/v1/agents', Cursor<AgentAPI.Agent>, { query, ...options });
  }

  /**
   * Delete an agent
   *
   * @example
   * ```ts
   * await client.agents.delete('agentId');
   * ```
   */
  delete(agentID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/agents/${agentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * The voices an agent can speak with, for `voice.ttsVoiceId`. Filter by `language`
   * to get the ones that speak it; a voice can still be used with `language: auto`,
   * where the agent follows the caller and keeps the chosen voice.
   *
   * @example
   * ```ts
   * const response = await client.agents.listVoices();
   * ```
   */
  listVoices(
    query: AgentListVoicesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListVoicesResponse> {
    return this._client.get('/v1/agents/voices', { query, ...options });
  }

  /**
   * Run the agent's prompt, model and knowledge base against a message and return
   * the reply instead of delivering it. Writes nothing and charges nothing, so it is
   * safe to call repeatedly while iterating on a prompt.
   *
   * Note that a dry run never **executes** tools — running them would cause real
   * side effects. Live conversations on every channel do call them. When the agent
   * has enabled tools, that gap is reported in `warnings` rather than silently
   * producing an answer that looks like a tool call happened.
   *
   * @example
   * ```ts
   * const response = await client.agents.test('agentId', {
   *   message: 'Where is order ORD-12345?',
   * });
   * ```
   */
  test(agentID: string, body: AgentTestParams, options?: RequestOptions): APIPromise<AgentTestResponse> {
    return this._client.post(path`/v1/agents/${agentID}/test`, { body, ...options });
  }
}

export interface AgentCreateResponse {
  /**
   * AI Agent configuration for a sender.
   */
  agent: AgentAPI.Agent;
}

export interface AgentRetrieveResponse {
  /**
   * AI Agent configuration for a sender.
   */
  agent: AgentAPI.Agent;
}

export interface AgentUpdateResponse {
  /**
   * AI Agent configuration for a sender.
   */
  agent: AgentAPI.Agent;
}

export interface AgentListVoicesResponse {
  items: Array<AgentListVoicesResponse.Item>;

  /**
   * Languages an agent can be pinned to. `auto` follows the caller.
   */
  languages: Array<string>;

  /**
   * Voices in the catalog, before filtering.
   */
  total?: number;
}

export namespace AgentListVoicesResponse {
  export interface Item {
    /**
     * Value for `voice.ttsVoiceId`.
     */
    id: string;

    language: string;

    name: string;
  }
}

export interface AgentTestResponse {
  error: string | null;

  inputTokens: number;

  /**
   * Knowledge-base chunks retrieved for this message. Zero means the answer was not
   * grounded in your documents.
   */
  knowledgeChunksUsed: number;

  latencyMs: number;

  outputTokens: number;

  success: boolean;

  /**
   * What the agent would reply.
   */
  text: string | null;

  /**
   * Things that are true of this agent but that a dry run cannot prove. Surfaced so
   * a passing dry run is never mistaken for proof that the agent works live.
   *
   * - The agent being disabled.
   * - Enabled tools that were **not offered to the model** here — the model never
   *   saw them, so a reply that looks like a lookup was invented. Live conversations
   *   on every channel do offer them; running them here would cause real side
   *   effects.
   * - An agent whose sender has none of the channels it triggers on, which answers
   *   every dry run and no real message.
   * - Contact metadata that exists on a real conversation but not here.
   */
  warnings: Array<string>;

  /**
   * Tools that actually ran, in order, when the request set `executeTools`. Empty on
   * a normal dry run, where nothing is executed. An entry with `ok: false` means the
   * agent saw an error and answered around it, which is what a customer would have
   * received.
   */
  executedToolCalls?: Array<AgentTestResponse.ExecutedToolCall>;
}

export namespace AgentTestResponse {
  export interface ExecutedToolCall {
    name: string;

    ok: boolean;

    error?: string | null;
  }
}

export interface AgentCreateParams {
  model: string;

  name: string;

  /**
   * LLM provider for the AI agent.
   */
  provider: AgentAPI.AgentProvider;

  systemPrompt: string;

  contextWindowMessages?: number;

  includeContactMetadata?: boolean;

  maxTokens?: number;

  temperature?: number;

  triggerOnChannels?: Array<string>;

  triggerOnMessageTypes?: Array<string>;

  /**
   * Voice Agent configuration on a sender's AI agent. Controls how the agent behaves
   * on inbound and outbound phone calls through Zavu's managed voice pipeline
   * (speech recognition, the agent's LLM, and speech synthesis, with real-time
   * interruption handling). Requires the Voice Agents feature to be enabled for your
   * team.
   */
  voice?: AgentCreateParams.Voice;
}

export namespace AgentCreateParams {
  /**
   * Voice Agent configuration on a sender's AI agent. Controls how the agent behaves
   * on inbound and outbound phone calls through Zavu's managed voice pipeline
   * (speech recognition, the agent's LLM, and speech synthesis, with real-time
   * interruption handling). Requires the Voice Agents feature to be enabled for your
   * team.
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
  provider?: AgentAPI.AgentProvider;

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

export interface AgentListParams extends CursorParams {}

export interface AgentListVoicesParams {
  /**
   * BCP-47 tag (`en`, `es`, `pt-BR`). Omit, or pass `auto`, for every voice.
   */
  language?: string;
}

export interface AgentTestParams {
  /**
   * What to say to the agent.
   */
  message: string;

  /**
   * Run the tools the agent calls instead of reporting the choice and stopping.
   *
   * Off by default because a tool handler talks to the outside world: a rehearsal
   * that charges a card is not a rehearsal. Turn it on to exercise the loop that
   * actually matters — the model picks a tool, the handler answers, the model
   * replies with the result — without sending a message to anyone. What ran comes
   * back in `executedToolCalls`.
   */
  executeTools?: boolean;

  /**
   * Prior turns, oldest first, to exercise multi-turn behaviour without persisting a
   * thread. Trimmed to the agent's context window.
   */
  history?: Array<AgentTestParams.History>;

  /**
   * Set false to skip retrieval and isolate prompt behaviour from the knowledge
   * base.
   */
  useKnowledgeBase?: boolean;
}

export namespace AgentTestParams {
  export interface History {
    content: string;

    role: 'user' | 'assistant';
  }
}

Agents.Senders = Senders;

export declare namespace Agents {
  export {
    type AgentCreateResponse as AgentCreateResponse,
    type AgentRetrieveResponse as AgentRetrieveResponse,
    type AgentUpdateResponse as AgentUpdateResponse,
    type AgentListVoicesResponse as AgentListVoicesResponse,
    type AgentTestResponse as AgentTestResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
    type AgentListVoicesParams as AgentListVoicesParams,
    type AgentTestParams as AgentTestParams,
  };

  export {
    Senders as Senders,
    type SenderConnectResponse as SenderConnectResponse,
    type SenderConnectParams as SenderConnectParams,
    type SenderDisconnectParams as SenderDisconnectParams,
  };
}

export { type AgentsCursor };
