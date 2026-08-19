// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AgentAPI from '../senders/agent/agent';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Senders extends APIResource {
  /**
   * Make the agent answer on this sender. An agent can serve several senders; a
   * sender answers with at most one agent, so connecting one that is already in use
   * returns `400` naming the agent that holds it.
   *
   * @example
   * ```ts
   * const response = await client.agents.senders.connect(
   *   'agentId',
   *   { senderId: 'senderId' },
   * );
   * ```
   */
  connect(
    agentID: string,
    body: SenderConnectParams,
    options?: RequestOptions,
  ): APIPromise<SenderConnectResponse> {
    return this._client.post(path`/v1/agents/${agentID}/senders`, { body, ...options });
  }

  /**
   * Stop the agent answering on this sender. The agent's primary sender is part of
   * the agent itself and cannot be disconnected here.
   *
   * @example
   * ```ts
   * await client.agents.senders.disconnect('senderId', {
   *   agentId: 'agentId',
   * });
   * ```
   */
  disconnect(senderID: string, params: SenderDisconnectParams, options?: RequestOptions): APIPromise<void> {
    const { agentId } = params;
    return this._client.delete(path`/v1/agents/${agentId}/senders/${senderID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface SenderConnectResponse {
  /**
   * AI Agent configuration for a sender.
   */
  agent: AgentAPI.Agent;
}

export interface SenderConnectParams {
  /**
   * Sender to connect.
   */
  senderId: string;
}

export interface SenderDisconnectParams {
  /**
   * Agent ID.
   */
  agentId: string;
}

export declare namespace Senders {
  export {
    type SenderConnectResponse as SenderConnectResponse,
    type SenderConnectParams as SenderConnectParams,
    type SenderDisconnectParams as SenderDisconnectParams,
  };
}
