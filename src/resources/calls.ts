// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Calls extends APIResource {
  /**
   * Place an outbound voice call answered by the voice agent configured on the
   * sender. Zavu dials the recipient and runs the conversation through its managed
   * voice pipeline (speech recognition, the agent's LLM, and speech synthesis, with
   * real-time interruption handling).
   *
   * **Requirements:**
   *
   * - The Voice Agents feature must be enabled for your team (otherwise `403`).
   * - An account that has verified nothing may only call the phone numbers the
   *   project has verified (`403` with code `destination_not_verified`, and
   *   `details.verifiedNumbers` lists them), and at most 5 calls a day (`429` with
   *   code `daily_limit_exceeded`). A number is verified from the dashboard's
   *   Sandbox screen by sending the pre-filled WhatsApp message from that phone; the
   *   same verification covers SMS and calls. Verify your identity, add a payment
   *   method, settle a deposit or subscribe to call any destination. That raises the
   *   ceiling to 50 calls a day on Free; paid plans have no daily call ceiling. Full
   *   reference: https://docs.zavu.dev/concepts/sending-limits
   * - The sender's agent must have `voice.enabled` set to `true`.
   * - Not available with test-mode API keys.
   *
   * **Billing:** Voice calls are billed per minute of connected time plus telephony,
   * deducted from your prepaid balance. A short-duration estimate is reserved when
   * the call is placed; you are charged for the actual duration when the call ends.
   *
   * @example
   * ```ts
   * const call = await client.calls.create({
   *   to: '+56912345678',
   * });
   * ```
   */
  create(body: CallCreateParams, options?: RequestOptions): APIPromise<CallCreateResponse> {
    return this._client.post('/v1/calls', { body, ...options });
  }

  /**
   * Retrieve a single voice call, including its full transcript once the
   * conversation has produced turns.
   *
   * @example
   * ```ts
   * const call = await client.calls.retrieve('callId');
   * ```
   */
  retrieve(callID: string, options?: RequestOptions): APIPromise<CallRetrieveResponse> {
    return this._client.get(path`/v1/calls/${callID}`, options);
  }

  /**
   * List voice calls for this project, most recent first. Transcripts are omitted
   * from the list; fetch a single call to get its transcript.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const callListResponse of client.calls.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CallListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CallListResponsesCursor, CallListResponse> {
    return this._client.getAPIList('/v1/calls', Cursor<CallListResponse>, { query, ...options });
  }

  /**
   * End an active voice call. The call must still be ringing or in progress. Not
   * available with test-mode API keys.
   *
   * @example
   * ```ts
   * const response = await client.calls.hangup('callId');
   * ```
   */
  hangup(callID: string, options?: RequestOptions): APIPromise<CallHangupResponse> {
    return this._client.post(path`/v1/calls/${callID}/hangup`, options);
  }
}

export type CallListResponsesCursor = Cursor<CallListResponse>;

export interface CallCreateResponse {
  call: CallCreateResponse.Call;
}

export namespace CallCreateResponse {
  export interface Call {
    id: string;

    createdAt: string;

    /**
     * Whether the call was placed by Zavu (outbound) or received from a caller
     * (inbound).
     */
    direction: 'inbound' | 'outbound';

    /**
     * Caller phone number in E.164 format. Your sender's number for outbound calls;
     * the caller's number for inbound calls.
     */
    from: string;

    /**
     * Lifecycle status of a voice call.
     *
     * - `queued`: outbound call created, not yet dialing.
     * - `ringing`: dialing (outbound) or received and ringing (inbound).
     * - `in_progress`: answered, the agent is connected.
     * - `completed`: ended after a conversation.
     * - `failed`: could not be completed.
     * - `busy`: the line was busy.
     * - `no_answer`: rang but was not answered.
     * - `canceled`: canceled before it was answered.
     */
    status: 'queued' | 'ringing' | 'in_progress' | 'completed' | 'failed' | 'busy' | 'no_answer' | 'canceled';

    /**
     * Callee phone number in E.164 format.
     */
    to: string;

    /**
     * When the call was answered.
     */
    answeredAt?: string | null;

    /**
     * Total cost of the call in USD, combining the managed voice pipeline per-minute
     * charge and telephony. Available once the call has ended.
     */
    cost?: number | null;

    /**
     * Billable talk time in seconds, measured from answer to hangup.
     */
    durationSeconds?: number | null;

    /**
     * When the call ended.
     */
    endedAt?: string | null;

    /**
     * Why the call ended (e.g. `agent_ended`, `max_duration`, `transfer`, `hangup`).
     * Present once the call is no longer active.
     */
    endReason?: string | null;

    /**
     * Arbitrary metadata you attached when creating the call.
     */
    metadata?: { [key: string]: string };

    /**
     * Ordered transcript of the call. Included when retrieving a single call; omitted
     * from list responses.
     */
    transcript?: Array<Call.Transcript>;

    /**
     * Number of conversation turns exchanged during the call.
     */
    turnCount?: number | null;

    updatedAt?: string;
  }

  export namespace Call {
    /**
     * A single turn in a voice call transcript.
     */
    export interface Transcript {
      /**
       * Who produced the turn. `tool` records a tool call the agent made during the
       * conversation.
       */
      role: 'user' | 'assistant' | 'tool';

      /**
       * Ordinal position of the turn within the call, starting at 0.
       */
      seq: number;

      /**
       * Transcribed speech for `user` and `assistant` turns, or a JSON summary of the
       * tool call for `tool` turns.
       */
      text: string;

      /**
       * When the turn ended.
       */
      endedAt?: string | null;

      /**
       * When the turn started.
       */
      startedAt?: string | null;
    }
  }
}

export interface CallRetrieveResponse {
  call: CallRetrieveResponse.Call;
}

export namespace CallRetrieveResponse {
  export interface Call {
    id: string;

    createdAt: string;

    /**
     * Whether the call was placed by Zavu (outbound) or received from a caller
     * (inbound).
     */
    direction: 'inbound' | 'outbound';

    /**
     * Caller phone number in E.164 format. Your sender's number for outbound calls;
     * the caller's number for inbound calls.
     */
    from: string;

    /**
     * Lifecycle status of a voice call.
     *
     * - `queued`: outbound call created, not yet dialing.
     * - `ringing`: dialing (outbound) or received and ringing (inbound).
     * - `in_progress`: answered, the agent is connected.
     * - `completed`: ended after a conversation.
     * - `failed`: could not be completed.
     * - `busy`: the line was busy.
     * - `no_answer`: rang but was not answered.
     * - `canceled`: canceled before it was answered.
     */
    status: 'queued' | 'ringing' | 'in_progress' | 'completed' | 'failed' | 'busy' | 'no_answer' | 'canceled';

    /**
     * Callee phone number in E.164 format.
     */
    to: string;

    /**
     * When the call was answered.
     */
    answeredAt?: string | null;

    /**
     * Total cost of the call in USD, combining the managed voice pipeline per-minute
     * charge and telephony. Available once the call has ended.
     */
    cost?: number | null;

    /**
     * Billable talk time in seconds, measured from answer to hangup.
     */
    durationSeconds?: number | null;

    /**
     * When the call ended.
     */
    endedAt?: string | null;

    /**
     * Why the call ended (e.g. `agent_ended`, `max_duration`, `transfer`, `hangup`).
     * Present once the call is no longer active.
     */
    endReason?: string | null;

    /**
     * Arbitrary metadata you attached when creating the call.
     */
    metadata?: { [key: string]: string };

    /**
     * Ordered transcript of the call. Included when retrieving a single call; omitted
     * from list responses.
     */
    transcript?: Array<Call.Transcript>;

    /**
     * Number of conversation turns exchanged during the call.
     */
    turnCount?: number | null;

    updatedAt?: string;
  }

  export namespace Call {
    /**
     * A single turn in a voice call transcript.
     */
    export interface Transcript {
      /**
       * Who produced the turn. `tool` records a tool call the agent made during the
       * conversation.
       */
      role: 'user' | 'assistant' | 'tool';

      /**
       * Ordinal position of the turn within the call, starting at 0.
       */
      seq: number;

      /**
       * Transcribed speech for `user` and `assistant` turns, or a JSON summary of the
       * tool call for `tool` turns.
       */
      text: string;

      /**
       * When the turn ended.
       */
      endedAt?: string | null;

      /**
       * When the turn started.
       */
      startedAt?: string | null;
    }
  }
}

export interface CallListResponse {
  id: string;

  createdAt: string;

  /**
   * Whether the call was placed by Zavu (outbound) or received from a caller
   * (inbound).
   */
  direction: 'inbound' | 'outbound';

  /**
   * Caller phone number in E.164 format. Your sender's number for outbound calls;
   * the caller's number for inbound calls.
   */
  from: string;

  /**
   * Lifecycle status of a voice call.
   *
   * - `queued`: outbound call created, not yet dialing.
   * - `ringing`: dialing (outbound) or received and ringing (inbound).
   * - `in_progress`: answered, the agent is connected.
   * - `completed`: ended after a conversation.
   * - `failed`: could not be completed.
   * - `busy`: the line was busy.
   * - `no_answer`: rang but was not answered.
   * - `canceled`: canceled before it was answered.
   */
  status: 'queued' | 'ringing' | 'in_progress' | 'completed' | 'failed' | 'busy' | 'no_answer' | 'canceled';

  /**
   * Callee phone number in E.164 format.
   */
  to: string;

  /**
   * When the call was answered.
   */
  answeredAt?: string | null;

  /**
   * Total cost of the call in USD, combining the managed voice pipeline per-minute
   * charge and telephony. Available once the call has ended.
   */
  cost?: number | null;

  /**
   * Billable talk time in seconds, measured from answer to hangup.
   */
  durationSeconds?: number | null;

  /**
   * When the call ended.
   */
  endedAt?: string | null;

  /**
   * Why the call ended (e.g. `agent_ended`, `max_duration`, `transfer`, `hangup`).
   * Present once the call is no longer active.
   */
  endReason?: string | null;

  /**
   * Arbitrary metadata you attached when creating the call.
   */
  metadata?: { [key: string]: string };

  /**
   * Ordered transcript of the call. Included when retrieving a single call; omitted
   * from list responses.
   */
  transcript?: Array<CallListResponse.Transcript>;

  /**
   * Number of conversation turns exchanged during the call.
   */
  turnCount?: number | null;

  updatedAt?: string;
}

export namespace CallListResponse {
  /**
   * A single turn in a voice call transcript.
   */
  export interface Transcript {
    /**
     * Who produced the turn. `tool` records a tool call the agent made during the
     * conversation.
     */
    role: 'user' | 'assistant' | 'tool';

    /**
     * Ordinal position of the turn within the call, starting at 0.
     */
    seq: number;

    /**
     * Transcribed speech for `user` and `assistant` turns, or a JSON summary of the
     * tool call for `tool` turns.
     */
    text: string;

    /**
     * When the turn ended.
     */
    endedAt?: string | null;

    /**
     * When the turn started.
     */
    startedAt?: string | null;
  }
}

export interface CallHangupResponse {
  call: CallHangupResponse.Call;
}

export namespace CallHangupResponse {
  export interface Call {
    id: string;

    createdAt: string;

    /**
     * Whether the call was placed by Zavu (outbound) or received from a caller
     * (inbound).
     */
    direction: 'inbound' | 'outbound';

    /**
     * Caller phone number in E.164 format. Your sender's number for outbound calls;
     * the caller's number for inbound calls.
     */
    from: string;

    /**
     * Lifecycle status of a voice call.
     *
     * - `queued`: outbound call created, not yet dialing.
     * - `ringing`: dialing (outbound) or received and ringing (inbound).
     * - `in_progress`: answered, the agent is connected.
     * - `completed`: ended after a conversation.
     * - `failed`: could not be completed.
     * - `busy`: the line was busy.
     * - `no_answer`: rang but was not answered.
     * - `canceled`: canceled before it was answered.
     */
    status: 'queued' | 'ringing' | 'in_progress' | 'completed' | 'failed' | 'busy' | 'no_answer' | 'canceled';

    /**
     * Callee phone number in E.164 format.
     */
    to: string;

    /**
     * When the call was answered.
     */
    answeredAt?: string | null;

    /**
     * Total cost of the call in USD, combining the managed voice pipeline per-minute
     * charge and telephony. Available once the call has ended.
     */
    cost?: number | null;

    /**
     * Billable talk time in seconds, measured from answer to hangup.
     */
    durationSeconds?: number | null;

    /**
     * When the call ended.
     */
    endedAt?: string | null;

    /**
     * Why the call ended (e.g. `agent_ended`, `max_duration`, `transfer`, `hangup`).
     * Present once the call is no longer active.
     */
    endReason?: string | null;

    /**
     * Arbitrary metadata you attached when creating the call.
     */
    metadata?: { [key: string]: string };

    /**
     * Ordered transcript of the call. Included when retrieving a single call; omitted
     * from list responses.
     */
    transcript?: Array<Call.Transcript>;

    /**
     * Number of conversation turns exchanged during the call.
     */
    turnCount?: number | null;

    updatedAt?: string;
  }

  export namespace Call {
    /**
     * A single turn in a voice call transcript.
     */
    export interface Transcript {
      /**
       * Who produced the turn. `tool` records a tool call the agent made during the
       * conversation.
       */
      role: 'user' | 'assistant' | 'tool';

      /**
       * Ordinal position of the turn within the call, starting at 0.
       */
      seq: number;

      /**
       * Transcribed speech for `user` and `assistant` turns, or a JSON summary of the
       * tool call for `tool` turns.
       */
      text: string;

      /**
       * When the turn ended.
       */
      endedAt?: string | null;

      /**
       * When the turn started.
       */
      startedAt?: string | null;
    }
  }
}

export interface CallCreateParams {
  /**
   * Recipient phone number in E.164 format.
   */
  to: string;

  /**
   * Overrides the agent's configured greeting for this call only.
   */
  greeting?: string;

  /**
   * Language the agent speaks on this call only, as a BCP-47 tag (`en`, `es`,
   * `es-ES`, `pt-BR`), or `auto` to detect the caller's language and follow it.
   * Overrides the agent's configured language for speech recognition, the agent's
   * replies, and the synthesized voice. If the agent uses a custom voice you
   * supplied, that voice is kept and only the language changes. When omitted, the
   * agent's configured language is used.
   */
  language?: string;

  /**
   * Overrides the agent's maximum call duration for this call only.
   */
  maxDurationMinutes?: number;

  /**
   * Arbitrary metadata to associate with the call. Returned on the call object and
   * included in voice webhooks.
   */
  metadata?: { [key: string]: string };

  /**
   * Sender profile that places the call. Uses the project's default sender if
   * omitted. The sender's agent must have voice enabled.
   */
  senderId?: string;
}

export interface CallListParams extends CursorParams {
  /**
   * Whether the call was placed by Zavu (outbound) or received from a caller
   * (inbound).
   */
  direction?: 'inbound' | 'outbound';

  /**
   * Lifecycle status of a voice call.
   *
   * - `queued`: outbound call created, not yet dialing.
   * - `ringing`: dialing (outbound) or received and ringing (inbound).
   * - `in_progress`: answered, the agent is connected.
   * - `completed`: ended after a conversation.
   * - `failed`: could not be completed.
   * - `busy`: the line was busy.
   * - `no_answer`: rang but was not answered.
   * - `canceled`: canceled before it was answered.
   */
  status?: 'queued' | 'ringing' | 'in_progress' | 'completed' | 'failed' | 'busy' | 'no_answer' | 'canceled';
}

export declare namespace Calls {
  export {
    type CallCreateResponse as CallCreateResponse,
    type CallRetrieveResponse as CallRetrieveResponse,
    type CallListResponse as CallListResponse,
    type CallHangupResponse as CallHangupResponse,
    type CallListResponsesCursor as CallListResponsesCursor,
    type CallCreateParams as CallCreateParams,
    type CallListParams as CallListParams,
  };
}
