// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AgentAPI from './agent';
import { AgentExecutionsCursor } from './agent';
import { APIPromise } from '../../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Executions extends APIResource {
  /**
   * Fetch full details for one execution — including `errorMessage`, `errorCode`,
   * and `responseText`. Use this to debug failures surfaced by the list endpoint.
   *
   * @example
   * ```ts
   * const execution =
   *   await client.senders.agent.executions.retrieve(
   *     'executionId',
   *     { senderId: 'senderId' },
   *   );
   * ```
   */
  retrieve(
    executionID: string,
    params: ExecutionRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<ExecutionRetrieveResponse> {
    const { senderId } = params;
    return this._client.get(path`/v1/senders/${senderId}/agent/executions/${executionID}`, options);
  }

  /**
   * List recent agent executions with pagination.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agentExecution of client.senders.agent.executions.list(
   *   'senderId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    senderID: string,
    query: ExecutionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentExecutionsCursor, AgentAPI.AgentExecution> {
    return this._client.getAPIList(
      path`/v1/senders/${senderID}/agent/executions`,
      Cursor<AgentAPI.AgentExecution>,
      { query, ...options },
    );
  }
}

export interface ExecutionRetrieveResponse {
  execution: AgentAPI.AgentExecution;
}

export interface ExecutionRetrieveParams {
  senderId: string;
}

export interface ExecutionListParams extends CursorParams {
  /**
   * Status of an agent execution.
   */
  status?: AgentAPI.AgentExecutionStatus;
}

export declare namespace Executions {
  export {
    type ExecutionRetrieveResponse as ExecutionRetrieveResponse,
    type ExecutionRetrieveParams as ExecutionRetrieveParams,
    type ExecutionListParams as ExecutionListParams,
  };
}

export { type AgentExecutionsCursor };
