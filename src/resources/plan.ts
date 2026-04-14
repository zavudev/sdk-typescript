// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Plan extends APIResource {
  /**
   * Get the current subscription plan for the API key's team, including tier,
   * billing interval, and period dates.
   */
  retrieve(options?: RequestOptions): APIPromise<PlanRetrieveResponse> {
    return this._client.get('/v1/plan', options);
  }
}

export interface PlanRetrieveResponse {
  billingInterval: 'monthly' | 'annual';

  status: 'active' | 'past_due' | 'canceled' | 'trialing';

  /**
   * Current subscription tier.
   */
  tier: 'free' | 'pro' | 'scale' | 'enterprise';

  cancelAtPeriodEnd?: boolean;

  currentPeriodEnd?: string;

  currentPeriodStart?: string;

  limits?: PlanRetrieveResponse.Limits;
}

export namespace PlanRetrieveResponse {
  export interface Limits {
    broadcasts?: boolean;

    /**
     * Monthly email limit.
     */
    emails?: number;

    /**
     * Monthly A2P message limit.
     */
    messagesA2P?: number;

    phoneNumbers?: number;

    senders?: number;

    subAccounts?: boolean;

    wabaConnections?: number;
  }
}

export declare namespace Plan {
  export { type PlanRetrieveResponse as PlanRetrieveResponse };
}
