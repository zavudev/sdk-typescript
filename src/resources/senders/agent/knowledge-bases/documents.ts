// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as KnowledgeBasesAPI from './knowledge-bases';
import { AgentDocumentsCursor } from './knowledge-bases';
import { APIPromise } from '../../../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../../../core/pagination';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Documents extends APIResource {
  /**
   * Add a document to a knowledge base. The document will be automatically processed
   * for RAG.
   *
   * @example
   * ```ts
   * const document =
   *   await client.senders.agent.knowledgeBases.documents.create(
   *     'kbId',
   *     {
   *       senderId: 'senderId',
   *       content:
   *         'Our return policy allows returns within 30 days of purchase...',
   *       title: 'Return Policy',
   *     },
   *   );
   * ```
   */
  create(
    kbID: string,
    params: DocumentCreateParams,
    options?: RequestOptions,
  ): APIPromise<DocumentCreateResponse> {
    const { senderId, ...body } = params;
    return this._client.post(path`/v1/senders/${senderId}/agent/knowledge-bases/${kbID}/documents`, {
      body,
      ...options,
    });
  }

  /**
   * List documents in a knowledge base.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const agentDocument of client.senders.agent.knowledgeBases.documents.list(
   *   'kbId',
   *   { senderId: 'senderId' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    kbID: string,
    params: DocumentListParams,
    options?: RequestOptions,
  ): PagePromise<AgentDocumentsCursor, KnowledgeBasesAPI.AgentDocument> {
    const { senderId, ...query } = params;
    return this._client.getAPIList(
      path`/v1/senders/${senderId}/agent/knowledge-bases/${kbID}/documents`,
      Cursor<KnowledgeBasesAPI.AgentDocument>,
      { query, ...options },
    );
  }

  /**
   * Delete a document from a knowledge base.
   *
   * @example
   * ```ts
   * await client.senders.agent.knowledgeBases.documents.delete(
   *   'docId',
   *   { senderId: 'senderId', kbId: 'kbId' },
   * );
   * ```
   */
  delete(docID: string, params: DocumentDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { senderId, kbId } = params;
    return this._client.delete(
      path`/v1/senders/${senderId}/agent/knowledge-bases/${kbId}/documents/${docID}`,
      { ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
    );
  }
}

export interface DocumentCreateResponse {
  document: KnowledgeBasesAPI.AgentDocument;
}

export interface DocumentCreateParams {
  /**
   * Path param:
   */
  senderId: string;

  /**
   * Body param:
   */
  content: string;

  /**
   * Body param:
   */
  title: string;
}

export interface DocumentListParams extends CursorParams {
  /**
   * Path param:
   */
  senderId: string;
}

export interface DocumentDeleteParams {
  senderId: string;

  kbId: string;
}

export declare namespace Documents {
  export {
    type DocumentCreateResponse as DocumentCreateResponse,
    type DocumentCreateParams as DocumentCreateParams,
    type DocumentListParams as DocumentListParams,
    type DocumentDeleteParams as DocumentDeleteParams,
  };
}

export { type AgentDocumentsCursor };
