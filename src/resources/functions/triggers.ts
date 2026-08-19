// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Triggers extends APIResource {
  /**
   * Subscribe a function to one or more event types, optionally scoped to specific
   * senders. Provide eventTypes and senderIds (use null in senderIds for all
   * senders); a trigger is created for each event type and sender combination.
   *
   * The special event type `cron` runs the function on a schedule instead of a
   * messaging event: include a `cron` field with a 5-field UTC cron expression
   * (minimum granularity one minute). A cron trigger ignores the sender axis, and a
   * function may hold several cron triggers with different expressions. The function
   * receives an event with `type: "cron"` and `data.cron`.
   *
   * @example
   * ```ts
   * const trigger = await client.functions.triggers.create(
   *   'functionId',
   *   { eventTypes: ['message.inbound'], senderIds: [null] },
   * );
   * ```
   */
  create(
    functionID: string,
    body: TriggerCreateParams,
    options?: RequestOptions,
  ): APIPromise<TriggerCreateResponse> {
    return this._client.post(path`/v1/functions/${functionID}/triggers`, { body, ...options });
  }

  /**
   * Enable or disable a trigger
   *
   * @example
   * ```ts
   * const trigger = await client.functions.triggers.update(
   *   'triggerId',
   *   { active: true },
   * );
   * ```
   */
  update(
    triggerID: string,
    body: TriggerUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TriggerUpdateResponse> {
    return this._client.patch(path`/v1/functions/triggers/${triggerID}`, { body, ...options });
  }

  /**
   * List function triggers
   *
   * @example
   * ```ts
   * const triggers = await client.functions.triggers.list(
   *   'functionId',
   * );
   * ```
   */
  list(functionID: string, options?: RequestOptions): APIPromise<TriggerListResponse> {
    return this._client.get(path`/v1/functions/${functionID}/triggers`, options);
  }

  /**
   * Delete a trigger
   *
   * @example
   * ```ts
   * await client.functions.triggers.delete('triggerId');
   * ```
   */
  delete(triggerID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/functions/triggers/${triggerID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface TriggerCreateResponse {
  added: number;

  /**
   * Number of triggers that already existed.
   */
  skipped: number;

  triggers: Array<TriggerCreateResponse.Trigger>;
}

export namespace TriggerCreateResponse {
  /**
   * A subscription that runs a Zavu Function when a messaging event fires.
   */
  export interface Trigger {
    id: string;

    active: boolean;

    createdAt: string;

    /**
     * Event type that fires the function. See GET /v1/functions/event-types for the
     * supported list. The special type `cron` fires on a schedule instead of a
     * messaging event and carries a `cron` expression.
     */
    eventType: string;

    functionId: string;

    updatedAt: string;

    /**
     * 5-field cron expression (minute hour day-of-month month day-of-week), evaluated
     * in UTC. Present only on `cron` triggers.
     */
    cron?: string | null;

    /**
     * Last time the schedule fired. Null until the first fire.
     */
    lastRunAt?: string | null;

    /**
     * Next scheduled fire time. Present only on `cron` triggers.
     */
    nextRunAt?: string | null;

    /**
     * Restrict the trigger to a single sender. Null means all senders in the project.
     */
    senderId?: string | null;
  }
}

export interface TriggerUpdateResponse {
  active: boolean;

  ok: boolean;
}

export interface TriggerListResponse {
  triggers: Array<TriggerListResponse.Trigger>;
}

export namespace TriggerListResponse {
  /**
   * A subscription that runs a Zavu Function when a messaging event fires.
   */
  export interface Trigger {
    id: string;

    active: boolean;

    createdAt: string;

    /**
     * Event type that fires the function. See GET /v1/functions/event-types for the
     * supported list. The special type `cron` fires on a schedule instead of a
     * messaging event and carries a `cron` expression.
     */
    eventType: string;

    functionId: string;

    updatedAt: string;

    /**
     * 5-field cron expression (minute hour day-of-month month day-of-week), evaluated
     * in UTC. Present only on `cron` triggers.
     */
    cron?: string | null;

    /**
     * Last time the schedule fired. Null until the first fire.
     */
    lastRunAt?: string | null;

    /**
     * Next scheduled fire time. Present only on `cron` triggers.
     */
    nextRunAt?: string | null;

    /**
     * Restrict the trigger to a single sender. Null means all senders in the project.
     */
    senderId?: string | null;
  }
}

export interface TriggerCreateParams {
  /**
   * Event types to subscribe to.
   */
  eventTypes: Array<string>;

  /**
   * Senders to scope the triggers to. Use null for all senders.
   */
  senderIds: Array<string | null>;

  /**
   * Required when eventTypes includes `cron`: a 5-field cron expression (minute hour
   * day-of-month month day-of-week), evaluated in UTC.
   */
  cron?: string;
}

export interface TriggerUpdateParams {
  active: boolean;
}

export declare namespace Triggers {
  export {
    type TriggerCreateResponse as TriggerCreateResponse,
    type TriggerUpdateResponse as TriggerUpdateResponse,
    type TriggerListResponse as TriggerListResponse,
    type TriggerCreateParams as TriggerCreateParams,
    type TriggerUpdateParams as TriggerUpdateParams,
  };
}
