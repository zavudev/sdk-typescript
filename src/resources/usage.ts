// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Usage extends APIResource {
  /**
   * Get the current month's usage counters for A2P messages and emails, along with
   * the tier limits.
   */
  retrieve(options?: RequestOptions): APIPromise<UsageRetrieveResponse> {
    return this._client.get('/v1/usage', options);
  }
}

export interface UsageRetrieveResponse {
  /**
   * Emails sent this month.
   */
  emailsSent: number;

  limits: UsageRetrieveResponse.Limits;

  /**
   * A2P messages sent this month (WhatsApp replies + Telegram).
   */
  messagesA2P: number;

  /**
   * Current month in YYYY-MM format.
   */
  monthKey: string;

  tier: 'free' | 'pro' | 'scale' | 'enterprise';
}

export namespace UsageRetrieveResponse {
  export interface Limits {
    emails?: number;

    messagesA2P?: number;
  }
}

export declare namespace Usage {
  export { type UsageRetrieveResponse as UsageRetrieveResponse };
}
