// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class WhatsappSync extends APIResource {
  /**
   * Get the current sync status for a sender's WhatsApp coexistence account. Only
   * available for senders connected in coexistence mode (WhatsApp Business App +
   * Cloud API).
   *
   * @example
   * ```ts
   * const whatsappSync =
   *   await client.senders.whatsappSync.retrieve('senderId');
   * ```
   */
  retrieve(senderID: string, options?: RequestOptions): APIPromise<WhatsappSyncRetrieveResponse> {
    return this._client.get(path`/v1/senders/${senderID}/whatsapp-sync`, options);
  }

  /**
   * Initiate contact names sync from the WhatsApp Business App. This imports contact
   * names stored in the app to Zavu. Only available for coexistence accounts with
   * active status.
   *
   * @example
   * ```ts
   * const response =
   *   await client.senders.whatsappSync.startContactsSync(
   *     'senderId',
   *   );
   * ```
   */
  startContactsSync(
    senderID: string,
    options?: RequestOptions,
  ): APIPromise<WhatsappSyncStartContactsSyncResponse> {
    return this._client.post(path`/v1/senders/${senderID}/whatsapp-sync/contacts`, options);
  }

  /**
   * Initiate message history sync from the WhatsApp Business App. This sends a
   * request to the account owner to approve sharing their conversation history. Only
   * available for coexistence accounts with active status.
   *
   * @example
   * ```ts
   * const response =
   *   await client.senders.whatsappSync.startHistorySync(
   *     'senderId',
   *   );
   * ```
   */
  startHistorySync(
    senderID: string,
    options?: RequestOptions,
  ): APIPromise<WhatsappSyncStartHistorySyncResponse> {
    return this._client.post(path`/v1/senders/${senderID}/whatsapp-sync/history`, options);
  }
}

/**
 * Contacts sync status details.
 */
export interface WhatsAppSyncContacts {
  /**
   * Whether contacts sync can be initiated.
   */
  canSync: boolean;

  /**
   * Status of WhatsApp contacts sync.
   */
  status: 'not_requested' | 'pending' | 'syncing' | 'completed';

  /**
   * When the sync was last requested.
   */
  requestedAt?: string | null;
}

/**
 * History sync status details.
 */
export interface WhatsAppSyncHistory {
  /**
   * Whether history sync can be initiated.
   */
  canSync: boolean;

  /**
   * Status of WhatsApp message history sync.
   */
  status: 'not_requested' | 'pending' | 'syncing' | 'completed' | 'rejected';

  /**
   * When the sync was completed.
   */
  completedAt?: string | null;

  /**
   * When the sync was last requested.
   */
  requestedAt?: string | null;
}

/**
 * WhatsApp coexistence sync status.
 */
export interface WhatsAppSyncStatus {
  /**
   * Contacts sync status details.
   */
  contacts: WhatsAppSyncContacts;

  /**
   * History sync status details.
   */
  history: WhatsAppSyncHistory;

  /**
   * Whether the account is in coexistence mode.
   */
  isCoexistence: boolean;

  /**
   * WhatsApp account status.
   */
  status: 'pending_verification' | 'pending_registration' | 'active' | 'disconnected' | 'error';
}

export interface WhatsappSyncRetrieveResponse {
  /**
   * WhatsApp coexistence sync status.
   */
  sync: WhatsAppSyncStatus;
}

export interface WhatsappSyncStartContactsSyncResponse {
  /**
   * Success message.
   */
  message: string;

  /**
   * WhatsApp coexistence sync status.
   */
  sync: WhatsAppSyncStatus;
}

export interface WhatsappSyncStartHistorySyncResponse {
  /**
   * Success message.
   */
  message: string;

  /**
   * WhatsApp coexistence sync status.
   */
  sync: WhatsAppSyncStatus;
}

export declare namespace WhatsappSync {
  export {
    type WhatsAppSyncContacts as WhatsAppSyncContacts,
    type WhatsAppSyncHistory as WhatsAppSyncHistory,
    type WhatsAppSyncStatus as WhatsAppSyncStatus,
    type WhatsappSyncRetrieveResponse as WhatsappSyncRetrieveResponse,
    type WhatsappSyncStartContactsSyncResponse as WhatsappSyncStartContactsSyncResponse,
    type WhatsappSyncStartHistorySyncResponse as WhatsappSyncStartHistorySyncResponse,
  };
}
