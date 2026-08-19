// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Telegram extends APIResource {
  /**
   * Connect a Telegram bot to a sender. Provide the bot token from @BotFather; Zavu
   * validates it, registers the webhook, and routes the sender's Telegram messages
   * through it.
   *
   * @example
   * ```ts
   * const response = await client.senders.telegram.connect(
   *   'senderId',
   *   { botToken: 'botToken' },
   * );
   * ```
   */
  connect(
    senderID: string,
    body: TelegramConnectParams,
    options?: RequestOptions,
  ): APIPromise<TelegramConnectResponse> {
    return this._client.post(path`/v1/senders/${senderID}/telegram`, { body, ...options });
  }

  /**
   * Disconnect Telegram from a sender and remove the webhook.
   *
   * @example
   * ```ts
   * await client.senders.telegram.disconnect('senderId');
   * ```
   */
  disconnect(senderID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/senders/${senderID}/telegram`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface TelegramConnectResponse {
  telegram: TelegramConnectResponse.Telegram;
}

export namespace TelegramConnectResponse {
  export interface Telegram {
    connected: boolean;

    botId?: string;

    botUsername?: string;
  }
}

export interface TelegramConnectParams {
  /**
   * Bot token from @BotFather.
   */
  botToken: string;
}

export declare namespace Telegram {
  export {
    type TelegramConnectResponse as TelegramConnectResponse,
    type TelegramConnectParams as TelegramConnectParams,
  };
}
