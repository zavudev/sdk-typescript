// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as DocumentsAPI from './documents';
import {
  DocumentCreateParams,
  DocumentCreateResponse,
  DocumentDeleteParams,
  DocumentListParams,
  Documents,
} from './documents';
import { APIPromise } from '../../../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../../../core/pagination';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class KnowledgeBases extends APIResource {
  documents: DocumentsAPI.Documents = new DocumentsAPI.Documents(this._client);

  /**
   * Create a new knowledge base for an agent.
   *
   * @example
   * ```ts
   * const knowledgeBase =
   *   await client.senders.agent.knowledgeBases.create(
   *     'senderId',
   *     {
   *       name: 'Product FAQ',
   *       description:
   *         'Frequently asked questions about our products',
   *     },
   *   );
   * ```
   */
  create(
    senderID: string,
    body: KnowledgeBaseCreateParams,
    options?: RequestOptions,
  ): APIPromise<KnowledgeBaseCreateResponse> {
    return this._client.post(path`/v1/senders/${senderID}/agent/knowledge-bases`, { body, ...options });
  }

  /**
   * Get a specific knowledge base.
   *
   * @example
   * ```ts
   * const knowledgeBase =
   *   await client.senders.agent.knowledgeBases.retrieve(
   *     'kbId',
   *     { senderId: 'senderId' },
   *   );
   * ```
   */
  retrieve(
    kbID: string,
    params: KnowledgeBaseRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<KnowledgeBaseRetrieveResponse> {
    const { senderId } = params;
    return this._client.get(path`/v1/senders/${senderId}/agent/knowledge-bases/${kbID}`, options);
  }

  /**
   * Update a knowledge base.
   *
   * @example
   * ```ts
   * const knowledgeBase =
   *   await client.senders.agent.knowledgeBases.update('kbId', {
   *     senderId: 'senderId',
   *   });
   * ```
   */
  update(
    kbID: string,
    params: KnowledgeBaseUpdateParams,
    options?: RequestOptions,
  ): APIPromise<KnowledgeBaseUpdateResponse> {
    const { senderId, ...body } = params;
    return this._client.patch(path`/v1/senders/${senderId}/agent/knowledge-bases/${kbID}`, {
      body,
      ...options,
    });
  }

  /**
   * List knowledge bases for an agent.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agentKnowledgeBase of client.senders.agent.knowledgeBases.list(
   *   'senderId',
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    senderID: string,
    query: KnowledgeBaseListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AgentKnowledgeBasesCursor, AgentKnowledgeBase> {
    return this._client.getAPIList(
      path`/v1/senders/${senderID}/agent/knowledge-bases`,
      Cursor<AgentKnowledgeBase>,
      { query, ...options },
    );
  }

  /**
   * Delete a knowledge base and all its documents.
   *
   * @example
   * ```ts
   * await client.senders.agent.knowledgeBases.delete('kbId', {
   *   senderId: 'senderId',
   * });
   * ```
   */
  delete(kbID: string, params: KnowledgeBaseDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { senderId } = params;
    return this._client.delete(path`/v1/senders/${senderId}/agent/knowledge-bases/${kbID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AgentKnowledgeBasesCursor = Cursor<AgentKnowledgeBase>;

export type AgentDocumentsCursor = Cursor<AgentDocument>;

export interface AgentDocument {
  id: string;

  /**
   * Number of chunks created from this document.
   */
  chunkCount: number;

  /**
   * Length of the document content in characters.
   */
  contentLength: number;

  createdAt: string;

  /**
   * Whether the document has been processed for RAG.
   */
  isProcessed: boolean;

  knowledgeBaseId: string;

  title: string;

  updatedAt: string;
}

export interface AgentKnowledgeBase {
  id: string;

  agentId: string;

  createdAt: string;

  documentCount: number;

  name: string;

  totalChunks: number;

  updatedAt: string;

  description?: string | null;
}

export interface KnowledgeBaseCreateResponse {
  knowledgeBase: AgentKnowledgeBase;
}

export interface KnowledgeBaseRetrieveResponse {
  knowledgeBase: AgentKnowledgeBase;
}

export interface KnowledgeBaseUpdateResponse {
  knowledgeBase: AgentKnowledgeBase;
}

export interface KnowledgeBaseCreateParams {
  name: string;

  description?: string;
}

export interface KnowledgeBaseRetrieveParams {
  senderId: string;
}

export interface KnowledgeBaseUpdateParams {
  /**
   * Path param:
   */
  senderId: string;

  /**
   * Body param:
   */
  description?: string | null;

  /**
   * Body param:
   */
  name?: string;
}

export interface KnowledgeBaseListParams extends CursorParams {}

export interface KnowledgeBaseDeleteParams {
  senderId: string;
}

KnowledgeBases.Documents = Documents;

export declare namespace KnowledgeBases {
  export {
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

  export {
    Documents as Documents,
    type DocumentCreateResponse as DocumentCreateResponse,
    type DocumentCreateParams as DocumentCreateParams,
    type DocumentListParams as DocumentListParams,
    type DocumentDeleteParams as DocumentDeleteParams,
  };
}
