// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SecretsAPI from './secrets';
import {
  SecretListResponse,
  SecretSetParams,
  SecretSetResponse,
  SecretUnsetParams,
  Secrets,
} from './secrets';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Functions extends APIResource {
  secrets: SecretsAPI.Secrets = new SecretsAPI.Secrets(this._client);

  /**
   * Create a new Zavu Function. The function starts in `draft` status. A dedicated
   * API key is auto-provisioned and injected as the `ZAVU_API_KEY` secret so the
   * function can call back into the Zavu API without manual setup.
   *
   * Provide `sourceCode` to seed the draft. Call
   * `POST /v1/functions/{functionId}/deploy` afterwards to publish.
   *
   * @example
   * ```ts
   * const _function = await client.functions.create({
   *   name: 'Order Bot',
   *   slug: 'order-bot',
   *   dependencies: { openai: '^4.20.0' },
   *   description:
   *     'Replies to order status questions on WhatsApp.',
   *   sourceCode:
   *     "import { defineFunction } from '@zavu/functions';\n\nexport default defineFunction(async (event, ctx) => {\n  ctx.log('received', event.type);\n});\n",
   * });
   * ```
   */
  create(body: FunctionCreateParams, options?: RequestOptions): APIPromise<FunctionCreateResponse> {
    return this._client.post('/v1/functions', { body, ...options });
  }

  /**
   * Get function
   *
   * @example
   * ```ts
   * const _function = await client.functions.retrieve(
   *   'functionId',
   * );
   * ```
   */
  retrieve(functionID: string, options?: RequestOptions): APIPromise<FunctionRetrieveResponse> {
    return this._client.get(path`/v1/functions/${functionID}`, options);
  }

  /**
   * Update the draft source code and/or dependency map without triggering a build.
   * Visible in the dashboard immediately, but the live (deployed) function does not
   * change until `POST /v1/functions/{functionId}/deploy` runs.
   *
   * @example
   * ```ts
   * const _function = await client.functions.update(
   *   'functionId',
   * );
   * ```
   */
  update(
    functionID: string,
    body: FunctionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<FunctionUpdateResponse> {
    return this._client.patch(path`/v1/functions/${functionID}`, { body, ...options });
  }

  /**
   * Permanently delete a function and cascade: triggers, secrets, deployment
   * history, managed agents+tools, and revoke the auto-provisioned API key. The AWS
   * Lambda + log group are torn down asynchronously.
   *
   * @example
   * ```ts
   * const _function = await client.functions.delete(
   *   'functionId',
   * );
   * ```
   */
  delete(functionID: string, options?: RequestOptions): APIPromise<FunctionDeleteResponse> {
    return this._client.delete(path`/v1/functions/${functionID}`, options);
  }

  /**
   * Publish the function. If `sourceCode` or `dependencies` are provided in the
   * body, they replace the current draft before deployment. Returns immediately with
   * a deployment ID — poll `GET /v1/functions/deployments/{deploymentId}` until
   * status is `active` or `failed`.
   *
   * @example
   * ```ts
   * const response = await client.functions.deploy(
   *   'functionId',
   * );
   * ```
   */
  deploy(
    functionID: string,
    body: FunctionDeployParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FunctionDeployResponse> {
    return this._client.post(path`/v1/functions/${functionID}/deploy`, { body, ...options });
  }

  /**
   * Fetch a deployment to poll its status during a deploy.
   *
   * @example
   * ```ts
   * const response = await client.functions.getDeployment(
   *   'deploymentId',
   * );
   * ```
   */
  getDeployment(deploymentID: string, options?: RequestOptions): APIPromise<FunctionGetDeploymentResponse> {
    return this._client.get(path`/v1/functions/deployments/${deploymentID}`, options);
  }

  /**
   * Fetch invocation logs for a function. Logs are paginated via `nextToken`. Pass
   * `startTime` / `endTime` (Unix epoch milliseconds) to bound the window, or
   * `filterPattern` to filter messages.
   *
   * @example
   * ```ts
   * const response = await client.functions.tailLogs(
   *   'functionId',
   * );
   * ```
   */
  tailLogs(
    functionID: string,
    query: FunctionTailLogsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FunctionTailLogsResponse> {
    return this._client.get(path`/v1/functions/${functionID}/logs`, { query, ...options });
  }
}

export interface FunctionCreateResponse {
  /**
   * A Zavu Function — user-supplied TypeScript that runs in Zavu Cloud and reacts to
   * messaging events or HTTP requests.
   */
  function: FunctionCreateResponse.Function;
}

export namespace FunctionCreateResponse {
  /**
   * A Zavu Function — user-supplied TypeScript that runs in Zavu Cloud and reacts to
   * messaging events or HTTP requests.
   */
  export interface Function {
    id: string;

    createdAt: string;

    /**
     * npm dependencies installed in the function bundle. Keys are package names,
     * values are semver ranges.
     */
    dependencies: { [key: string]: string };

    /**
     * Whether the function can be invoked over HTTPS via its public URL.
     */
    httpEnabled: boolean;

    /**
     * Memory allocation in MB.
     */
    memoryMb: number;

    name: string;

    /**
     * Runtime the function is deployed on.
     */
    runtime: 'nodejs24';

    /**
     * URL-safe identifier, unique per project.
     */
    slug: string;

    /**
     * Lifecycle status of a Zavu Function.
     */
    status: 'draft' | 'bundling' | 'deploying' | 'active' | 'failed' | 'disabled';

    /**
     * Per-invocation timeout in seconds.
     */
    timeoutSec: number;

    updatedAt: string;

    /**
     * ID of the deployment currently serving traffic.
     */
    activeDeploymentId?: string | null;

    description?: string | null;

    /**
     * HTTPS endpoint when httpEnabled is true.
     */
    publicUrl?: string | null;
  }
}

export interface FunctionRetrieveResponse {
  /**
   * A Zavu Function — user-supplied TypeScript that runs in Zavu Cloud and reacts to
   * messaging events or HTTP requests.
   */
  function: FunctionRetrieveResponse.Function;
}

export namespace FunctionRetrieveResponse {
  /**
   * A Zavu Function — user-supplied TypeScript that runs in Zavu Cloud and reacts to
   * messaging events or HTTP requests.
   */
  export interface Function {
    id: string;

    createdAt: string;

    /**
     * npm dependencies installed in the function bundle. Keys are package names,
     * values are semver ranges.
     */
    dependencies: { [key: string]: string };

    /**
     * Whether the function can be invoked over HTTPS via its public URL.
     */
    httpEnabled: boolean;

    /**
     * Memory allocation in MB.
     */
    memoryMb: number;

    name: string;

    /**
     * Runtime the function is deployed on.
     */
    runtime: 'nodejs24';

    /**
     * URL-safe identifier, unique per project.
     */
    slug: string;

    /**
     * Lifecycle status of a Zavu Function.
     */
    status: 'draft' | 'bundling' | 'deploying' | 'active' | 'failed' | 'disabled';

    /**
     * Per-invocation timeout in seconds.
     */
    timeoutSec: number;

    updatedAt: string;

    /**
     * ID of the deployment currently serving traffic.
     */
    activeDeploymentId?: string | null;

    description?: string | null;

    /**
     * HTTPS endpoint when httpEnabled is true.
     */
    publicUrl?: string | null;
  }
}

export interface FunctionUpdateResponse {
  /**
   * A Zavu Function — user-supplied TypeScript that runs in Zavu Cloud and reacts to
   * messaging events or HTTP requests.
   */
  function: FunctionUpdateResponse.Function;
}

export namespace FunctionUpdateResponse {
  /**
   * A Zavu Function — user-supplied TypeScript that runs in Zavu Cloud and reacts to
   * messaging events or HTTP requests.
   */
  export interface Function {
    id: string;

    createdAt: string;

    /**
     * npm dependencies installed in the function bundle. Keys are package names,
     * values are semver ranges.
     */
    dependencies: { [key: string]: string };

    /**
     * Whether the function can be invoked over HTTPS via its public URL.
     */
    httpEnabled: boolean;

    /**
     * Memory allocation in MB.
     */
    memoryMb: number;

    name: string;

    /**
     * Runtime the function is deployed on.
     */
    runtime: 'nodejs24';

    /**
     * URL-safe identifier, unique per project.
     */
    slug: string;

    /**
     * Lifecycle status of a Zavu Function.
     */
    status: 'draft' | 'bundling' | 'deploying' | 'active' | 'failed' | 'disabled';

    /**
     * Per-invocation timeout in seconds.
     */
    timeoutSec: number;

    updatedAt: string;

    /**
     * ID of the deployment currently serving traffic.
     */
    activeDeploymentId?: string | null;

    description?: string | null;

    /**
     * HTTPS endpoint when httpEnabled is true.
     */
    publicUrl?: string | null;
  }
}

export interface FunctionDeleteResponse {
  deleted: boolean;

  name?: string;

  slug?: string;
}

export interface FunctionDeployResponse {
  deployment: FunctionDeployResponse.Deployment;
}

export namespace FunctionDeployResponse {
  export interface Deployment {
    id: string;

    createdAt: string;

    functionId: string;

    /**
     * Stage of a function deployment.
     */
    status: 'pending' | 'bundling' | 'uploading' | 'publishing' | 'active' | 'failed' | 'superseded';

    /**
     * Monotonically increasing deployment version, starting at 1.
     */
    version: number;

    bundleBytes?: number | null;

    deployedAt?: string | null;

    /**
     * Failure reason when status is 'failed'.
     */
    errorMessage?: string | null;

    sourceCodeBytes?: number | null;
  }
}

export interface FunctionGetDeploymentResponse {
  deployment: FunctionGetDeploymentResponse.Deployment;
}

export namespace FunctionGetDeploymentResponse {
  export interface Deployment {
    id: string;

    createdAt: string;

    functionId: string;

    /**
     * Stage of a function deployment.
     */
    status: 'pending' | 'bundling' | 'uploading' | 'publishing' | 'active' | 'failed' | 'superseded';

    /**
     * Monotonically increasing deployment version, starting at 1.
     */
    version: number;

    bundleBytes?: number | null;

    deployedAt?: string | null;

    /**
     * Failure reason when status is 'failed'.
     */
    errorMessage?: string | null;

    sourceCodeBytes?: number | null;
  }
}

export interface FunctionTailLogsResponse {
  events: Array<FunctionTailLogsResponse.Event>;

  /**
   * Pass to the next request to fetch the following page of logs.
   */
  nextToken?: string | null;
}

export namespace FunctionTailLogsResponse {
  export interface Event {
    message: string;

    timestamp: string;
  }
}

export interface FunctionCreateParams {
  name: string;

  /**
   * URL-safe identifier (lowercase, digits, hyphens). Must be unique per project.
   */
  slug: string;

  /**
   * npm dependencies. Keys are package names, values are semver ranges.
   */
  dependencies?: { [key: string]: string };

  description?: string;

  /**
   * Whether to expose a public HTTPS URL for this function.
   */
  httpEnabled?: boolean;

  memoryMb?: 128 | 256 | 512 | 1024;

  /**
   * Runtime the function is deployed on.
   */
  runtime?: 'nodejs24';

  /**
   * TypeScript source code for the function entry point (max ~900KB).
   */
  sourceCode?: string;

  timeoutSec?: number;
}

export interface FunctionUpdateParams {
  /**
   * New dependency map (replaces existing dependencies).
   */
  dependencies?: { [key: string]: string };

  /**
   * New source code to publish (replaces the draft).
   */
  sourceCode?: string;
}

export interface FunctionDeployParams {
  /**
   * New dependency map (replaces existing dependencies).
   */
  dependencies?: { [key: string]: string };

  /**
   * New source code to publish (replaces the draft).
   */
  sourceCode?: string;
}

export interface FunctionTailLogsParams {
  /**
   * End of the log window in Unix epoch milliseconds.
   */
  endTime?: number;

  filterPattern?: string;

  limit?: number;

  nextToken?: string;

  /**
   * Start of the log window in Unix epoch milliseconds.
   */
  startTime?: number;
}

Functions.Secrets = Secrets;

export declare namespace Functions {
  export {
    type FunctionCreateResponse as FunctionCreateResponse,
    type FunctionRetrieveResponse as FunctionRetrieveResponse,
    type FunctionUpdateResponse as FunctionUpdateResponse,
    type FunctionDeleteResponse as FunctionDeleteResponse,
    type FunctionDeployResponse as FunctionDeployResponse,
    type FunctionGetDeploymentResponse as FunctionGetDeploymentResponse,
    type FunctionTailLogsResponse as FunctionTailLogsResponse,
    type FunctionCreateParams as FunctionCreateParams,
    type FunctionUpdateParams as FunctionUpdateParams,
    type FunctionDeployParams as FunctionDeployParams,
    type FunctionTailLogsParams as FunctionTailLogsParams,
  };

  export {
    Secrets as Secrets,
    type SecretListResponse as SecretListResponse,
    type SecretSetResponse as SecretSetResponse,
    type SecretSetParams as SecretSetParams,
    type SecretUnsetParams as SecretUnsetParams,
  };
}
