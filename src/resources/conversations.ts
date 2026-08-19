// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MessagesAPI from './messages';
import { MessagesCursor } from './messages';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Conversations extends APIResource {
  /**
   * Get conversation
   */
  retrieve(conversationID: string, options?: RequestOptions): APIPromise<ConversationRetrieveResponse> {
    return this._client.get(path`/v1/conversations/${conversationID}`, options);
  }

  /**
   * List inbox threads, most recently active first. A conversation groups every
   * message with one contact across channels, which is what you need to build an
   * inbox: `GET /v1/messages` returns a flat log with no thread to hang it on.
   *
   * Use `senderId` to scope the list to a single number, and `channel` to keep only
   * threads that have carried that channel.
   */
  list(
    query: ConversationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ConversationListResponsesCursor, ConversationListResponse> {
    return this._client.getAPIList('/v1/conversations', Cursor<ConversationListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Messages in this thread, newest first, across every channel it has carried.
   * Reply with `POST /v1/messages`, passing the conversation's `senderId` as the
   * `Zavu-Sender` header so the answer leaves from the number the contact already
   * knows.
   */
  listMessages(
    conversationID: string,
    query: ConversationListMessagesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessagesCursor, MessagesAPI.Message> {
    return this._client.getAPIList(
      path`/v1/conversations/${conversationID}/messages`,
      Cursor<MessagesAPI.Message>,
      { query, ...options },
    );
  }

  /**
   * Reset the thread's `unreadCount` to zero. Marks the thread read in your own
   * inbox only: it does not send a read receipt to the contact.
   */
  markAsRead(conversationID: string, options?: RequestOptions): APIPromise<ConversationMarkAsReadResponse> {
    return this._client.post(path`/v1/conversations/${conversationID}/read`, options);
  }
}

export type ConversationListResponsesCursor = Cursor<ConversationListResponse>;

export interface ConversationRetrieveResponse {
  /**
   * An inbox thread with one contact. A conversation groups every message exchanged
   * with that contact across channels, so a contact who writes on WhatsApp and later
   * by email stays in one thread.
   */
  conversation: ConversationRetrieveResponse.Conversation;
}

export namespace ConversationRetrieveResponse {
  /**
   * An inbox thread with one contact. A conversation groups every message exchanged
   * with that contact across channels, so a contact who writes on WhatsApp and later
   * by email stays in one thread.
   */
  export interface Conversation {
    id: string;

    /**
     * Every channel this thread has carried messages on.
     */
    channels: Array<string>;

    /**
     * The key this thread is filed under: a phone number in E.164, a WhatsApp
     * business-scoped user ID (BSUID), a numeric chat ID
     * (Telegram/Instagram/Messenger), or a group JID. It is not always a phone number,
     * so do not parse it as one.
     */
    contactIdentifier: string;

    createdAt: string;

    /**
     * Denormalized preview of the most recent message, so a thread list needs no extra
     * fetch.
     */
    lastMessage: Conversation.LastMessage;

    messageCount: number;

    /**
     * Inbound messages not yet marked read. Reset with POST
     * /v1/conversations/{conversationId}/read.
     */
    unreadCount: number;

    updatedAt: string;

    /**
     * ID of the contact this thread belongs to. Absent on group threads and on threads
     * whose contact has not been resolved yet.
     */
    contactId?: string;

    /**
     * Email address of the thread, when the contact was reached by email.
     */
    email?: string;

    /**
     * Present when the thread is a group chat rather than a one-to-one conversation.
     */
    group?: Conversation.Group;

    /**
     * Sender that last handled this thread. Use it as the `Zavu-Sender` header when
     * replying so the answer leaves from the same number the contact knows.
     */
    senderId?: string;

    /**
     * WhatsApp identity, present when the contact adopted a username.
     */
    whatsapp?: Conversation.Whatsapp;
  }

  export namespace Conversation {
    /**
     * Denormalized preview of the most recent message, so a thread list needs no extra
     * fetch.
     */
    export interface LastMessage {
      id: string;

      at: string;

      /**
       * Delivery channel. Use 'auto' for intelligent routing.
       */
      channel: MessagesAPI.Channel;

      direction: 'inbound' | 'outbound';

      /**
       * Text or caption. Empty when the last message carried no text (e.g. media).
       */
      text: string;
    }

    /**
     * Present when the thread is a group chat rather than a one-to-one conversation.
     */
    export interface Group {
      id: string;

      participantCount?: number;

      subject?: string;
    }

    /**
     * WhatsApp identity, present when the contact adopted a username.
     */
    export interface Whatsapp {
      /**
       * Business-scoped user ID. Can be used as `to` when sending.
       */
      bsuid?: string;

      username?: string;
    }
  }
}

/**
 * An inbox thread with one contact. A conversation groups every message exchanged
 * with that contact across channels, so a contact who writes on WhatsApp and later
 * by email stays in one thread.
 */
export interface ConversationListResponse {
  id: string;

  /**
   * Every channel this thread has carried messages on.
   */
  channels: Array<string>;

  /**
   * The key this thread is filed under: a phone number in E.164, a WhatsApp
   * business-scoped user ID (BSUID), a numeric chat ID
   * (Telegram/Instagram/Messenger), or a group JID. It is not always a phone number,
   * so do not parse it as one.
   */
  contactIdentifier: string;

  createdAt: string;

  /**
   * Denormalized preview of the most recent message, so a thread list needs no extra
   * fetch.
   */
  lastMessage: ConversationListResponse.LastMessage;

  messageCount: number;

  /**
   * Inbound messages not yet marked read. Reset with POST
   * /v1/conversations/{conversationId}/read.
   */
  unreadCount: number;

  updatedAt: string;

  /**
   * ID of the contact this thread belongs to. Absent on group threads and on threads
   * whose contact has not been resolved yet.
   */
  contactId?: string;

  /**
   * Email address of the thread, when the contact was reached by email.
   */
  email?: string;

  /**
   * Present when the thread is a group chat rather than a one-to-one conversation.
   */
  group?: ConversationListResponse.Group;

  /**
   * Sender that last handled this thread. Use it as the `Zavu-Sender` header when
   * replying so the answer leaves from the same number the contact knows.
   */
  senderId?: string;

  /**
   * WhatsApp identity, present when the contact adopted a username.
   */
  whatsapp?: ConversationListResponse.Whatsapp;
}

export namespace ConversationListResponse {
  /**
   * Denormalized preview of the most recent message, so a thread list needs no extra
   * fetch.
   */
  export interface LastMessage {
    id: string;

    at: string;

    /**
     * Delivery channel. Use 'auto' for intelligent routing.
     */
    channel: MessagesAPI.Channel;

    direction: 'inbound' | 'outbound';

    /**
     * Text or caption. Empty when the last message carried no text (e.g. media).
     */
    text: string;
  }

  /**
   * Present when the thread is a group chat rather than a one-to-one conversation.
   */
  export interface Group {
    id: string;

    participantCount?: number;

    subject?: string;
  }

  /**
   * WhatsApp identity, present when the contact adopted a username.
   */
  export interface Whatsapp {
    /**
     * Business-scoped user ID. Can be used as `to` when sending.
     */
    bsuid?: string;

    username?: string;
  }
}

export interface ConversationMarkAsReadResponse {
  /**
   * An inbox thread with one contact. A conversation groups every message exchanged
   * with that contact across channels, so a contact who writes on WhatsApp and later
   * by email stays in one thread.
   */
  conversation: ConversationMarkAsReadResponse.Conversation;
}

export namespace ConversationMarkAsReadResponse {
  /**
   * An inbox thread with one contact. A conversation groups every message exchanged
   * with that contact across channels, so a contact who writes on WhatsApp and later
   * by email stays in one thread.
   */
  export interface Conversation {
    id: string;

    /**
     * Every channel this thread has carried messages on.
     */
    channels: Array<string>;

    /**
     * The key this thread is filed under: a phone number in E.164, a WhatsApp
     * business-scoped user ID (BSUID), a numeric chat ID
     * (Telegram/Instagram/Messenger), or a group JID. It is not always a phone number,
     * so do not parse it as one.
     */
    contactIdentifier: string;

    createdAt: string;

    /**
     * Denormalized preview of the most recent message, so a thread list needs no extra
     * fetch.
     */
    lastMessage: Conversation.LastMessage;

    messageCount: number;

    /**
     * Inbound messages not yet marked read. Reset with POST
     * /v1/conversations/{conversationId}/read.
     */
    unreadCount: number;

    updatedAt: string;

    /**
     * ID of the contact this thread belongs to. Absent on group threads and on threads
     * whose contact has not been resolved yet.
     */
    contactId?: string;

    /**
     * Email address of the thread, when the contact was reached by email.
     */
    email?: string;

    /**
     * Present when the thread is a group chat rather than a one-to-one conversation.
     */
    group?: Conversation.Group;

    /**
     * Sender that last handled this thread. Use it as the `Zavu-Sender` header when
     * replying so the answer leaves from the same number the contact knows.
     */
    senderId?: string;

    /**
     * WhatsApp identity, present when the contact adopted a username.
     */
    whatsapp?: Conversation.Whatsapp;
  }

  export namespace Conversation {
    /**
     * Denormalized preview of the most recent message, so a thread list needs no extra
     * fetch.
     */
    export interface LastMessage {
      id: string;

      at: string;

      /**
       * Delivery channel. Use 'auto' for intelligent routing.
       */
      channel: MessagesAPI.Channel;

      direction: 'inbound' | 'outbound';

      /**
       * Text or caption. Empty when the last message carried no text (e.g. media).
       */
      text: string;
    }

    /**
     * Present when the thread is a group chat rather than a one-to-one conversation.
     */
    export interface Group {
      id: string;

      participantCount?: number;

      subject?: string;
    }

    /**
     * WhatsApp identity, present when the contact adopted a username.
     */
    export interface Whatsapp {
      /**
       * Business-scoped user ID. Can be used as `to` when sending.
       */
      bsuid?: string;

      username?: string;
    }
  }
}

export interface ConversationListParams extends CursorParams {
  /**
   * Keep only threads that have carried this channel.
   */
  channel?: 'sms' | 'sms_oneway' | 'whatsapp' | 'email' | 'telegram' | 'instagram' | 'messenger' | 'voice';

  /**
   * Search threads by identity: phone number (any format — `+1 (555) 123-4567` and
   * `15551234567` both match), email address (full or local part), WhatsApp group
   * subject, WhatsApp username, or BSUID. Matching is by whole word, with prefix
   * matching on the last term, so `mar` finds `maria@example.com` and `+1555` finds
   * `+15551234567`; a fragment from the middle or end of a number (`4567`) does not
   * match.
   *
   * It does **not** search message bodies — only who the thread is with.
   *
   * Results come back ranked by relevance rather than by recency, so the usual "most
   * recently active first" ordering does not apply while `q` is set. `senderId` and
   * `channel` still narrow the results, and `cursor` paginates them as usual. An
   * empty or whitespace-only `q` returns no items rather than the full list.
   */
  search?: string;

  /**
   * Keep only threads last handled by this sender.
   */
  senderId?: string;
}

export interface ConversationListMessagesParams extends CursorParams {}

export declare namespace Conversations {
  export {
    type ConversationRetrieveResponse as ConversationRetrieveResponse,
    type ConversationListResponse as ConversationListResponse,
    type ConversationMarkAsReadResponse as ConversationMarkAsReadResponse,
    type ConversationListResponsesCursor as ConversationListResponsesCursor,
    type ConversationListParams as ConversationListParams,
    type ConversationListMessagesParams as ConversationListMessagesParams,
  };
}

export { type MessagesCursor };
