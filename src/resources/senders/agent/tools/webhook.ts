// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as SendersAPI from '../../senders';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Webhook extends APIResource {
  /**
   * Generate a new signing secret for this tool. The previous one stops working on
   * the next call, with no overlap, so update your endpoint first. The tool keeps
   * its id, so flows that reference it by name are unaffected.
   *
   * @example
   * ```ts
   * const webhookSecretResponse =
   *   await client.senders.agent.tools.webhook.rotateSecret(
   *     'toolId',
   *     { senderId: 'senderId' },
   *   );
   * ```
   */
  rotateSecret(
    toolID: string,
    params: WebhookRotateSecretParams,
    options?: RequestOptions,
  ): APIPromise<SendersAPI.WebhookSecretResponse> {
    const { senderId } = params;
    return this._client.post(path`/v1/senders/${senderId}/agent/tools/${toolID}/webhook/secret`, options);
  }
}

export interface WebhookRotateSecretParams {
  senderId: string;
}

export declare namespace Webhook {
  export { type WebhookRotateSecretParams as WebhookRotateSecretParams };
}
