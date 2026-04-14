// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Balance extends APIResource {
  /**
   * Get balance for the API key's team. If the API key belongs to a sub-account,
   * also includes the sub-account's total spending and credit limit.
   */
  retrieve(options?: RequestOptions): APIPromise<BalanceRetrieveResponse> {
    return this._client.get('/v1/balance', options);
  }
}

export interface BalanceRetrieveResponse {
  /**
   * Team balance in cents. All charges are billed to the parent team.
   */
  balance: number;

  currency: string;

  /**
   * Spending cap in cents (only for sub-accounts).
   */
  creditLimit?: number | null;

  /**
   * Whether this API key belongs to a sub-account.
   */
  isSubAccount?: boolean;

  /**
   * Total amount spent by this sub-account in cents (only for sub-accounts).
   */
  totalSpent?: number | null;
}

export declare namespace Balance {
  export { type BalanceRetrieveResponse as BalanceRetrieveResponse };
}
