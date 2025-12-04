// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as IntrospectAPI from './introspect';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Introspect extends APIResource {
  /**
   * Validate a phone number and check if a WhatsApp conversation window is open.
   *
   * @example
   * ```ts
   * const response = await client.introspect.validatePhone({
   *   phoneNumber: '+56912345678',
   * });
   * ```
   */
  validatePhone(
    body: IntrospectValidatePhoneParams,
    options?: RequestOptions,
  ): APIPromise<IntrospectValidatePhoneResponse> {
    return this._client.post('/v1/introspect/phone', { body, ...options });
  }
}

/**
 * Type of phone line.
 */
export type LineType = 'mobile' | 'landline' | 'voip' | 'toll_free' | 'unknown';

export interface IntrospectValidatePhoneResponse {
  countryCode: string;

  phoneNumber: string;

  validNumber: boolean;

  /**
   * Carrier information for the phone number.
   */
  carrier?: IntrospectValidatePhoneResponse.Carrier;

  /**
   * Type of phone line.
   */
  lineType?: LineType;

  /**
   * Phone number in national format.
   */
  nationalFormat?: string;

  /**
   * Whether a 24h WhatsApp window is open for this number.
   */
  whatsappWindowOpen?: boolean;
}

export namespace IntrospectValidatePhoneResponse {
  /**
   * Carrier information for the phone number.
   */
  export interface Carrier {
    /**
     * Carrier name.
     */
    name?: string | null;

    /**
     * Type of phone line.
     */
    type?: IntrospectAPI.LineType;
  }
}

export interface IntrospectValidatePhoneParams {
  phoneNumber: string;
}

export declare namespace Introspect {
  export {
    type LineType as LineType,
    type IntrospectValidatePhoneResponse as IntrospectValidatePhoneResponse,
    type IntrospectValidatePhoneParams as IntrospectValidatePhoneParams,
  };
}
