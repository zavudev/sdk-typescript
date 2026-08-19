// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class GitLink extends APIResource {
  /**
   * The link and its last deploy. Never returns the webhook secret.
   *
   * @example
   * ```ts
   * const gitLink = await client.functions.gitLink.retrieve(
   *   'functionId',
   * );
   * ```
   */
  retrieve(functionID: string, options?: RequestOptions): APIPromise<GitLinkRetrieveResponse> {
    return this._client.get(path`/v1/functions/${functionID}/git-link`, options);
  }

  /**
   * Change the branch, the root directory, or whether pushes deploy. Pass at least
   * one field. `rootDir: null` clears the subdirectory.
   *
   * @example
   * ```ts
   * const gitLink = await client.functions.gitLink.update(
   *   'functionId',
   * );
   * ```
   */
  update(
    functionID: string,
    body: GitLinkUpdateParams,
    options?: RequestOptions,
  ): APIPromise<GitLinkUpdateResponse> {
    return this._client.patch(path`/v1/functions/${functionID}/git-link`, { body, ...options });
  }

  /**
   * Fetch the linked branch and deploy it without waiting for a push. Returns
   * immediately; follow the outcome with `GET /v1/functions/{functionId}/git-link`,
   * whose `lastStatus` and `lastError` describe the run.
   *
   * @example
   * ```ts
   * const response = await client.functions.gitLink.deployNow(
   *   'functionId',
   * );
   * ```
   */
  deployNow(functionID: string, options?: RequestOptions): APIPromise<GitLinkDeployNowResponse> {
    return this._client.post(path`/v1/functions/${functionID}/git-link/deploy`, options);
  }

  /**
   * Bind a repository to this function so every push to `branch` deploys it. A
   * function holds at most one link; linking again returns 400.
   *
   * **The server decides how the link authenticates.** If the project has the Zavu
   * GitHub App installed, the link uses that installation: private repositories work
   * and there is nothing to configure in the repository. Otherwise it falls back to
   * a manual link and the response carries a `webhookSecret` you add to the
   * repository yourself. `connection` says which one you got.
   *
   * The repository is not checked against GitHub here, because it cannot be: an
   * owner/repo that does not exist, or that the installation cannot see, is accepted
   * and fails on the first deploy with a fetch error.
   *
   * @example
   * ```ts
   * const response = await client.functions.gitLink.link(
   *   'functionId',
   *   {
   *     owner: 'acme',
   *     repo: 'order-bot',
   *     branch: 'main',
   *   },
   * );
   * ```
   */
  link(
    functionID: string,
    body: GitLinkLinkParams,
    options?: RequestOptions,
  ): APIPromise<GitLinkLinkResponse> {
    return this._client.post(path`/v1/functions/${functionID}/git-link`, { body, ...options });
  }

  /**
   * Remove the link. The function and its deployments stay. A manual webhook left in
   * the repository stops being accepted, so remove it there too.
   *
   * @example
   * ```ts
   * await client.functions.gitLink.unlink('functionId');
   * ```
   */
  unlink(functionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/functions/${functionID}/git-link`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface GitLinkRetrieveResponse {
  /**
   * A GitHub repository bound to a function. A push to `branch` deploys the
   * function. A function holds at most one link.
   */
  link: GitLinkRetrieveResponse.Link;

  /**
   * Endpoint that receives GitHub's push deliveries. Only needed on a `manual` link,
   * where you add it to the repository yourself.
   */
  webhookUrl: string;

  /**
   * Shared secret for the repository's webhook. **Returned only when creating a
   * `manual` link, and only there** — every later read strips it, and re-linking
   * mints a new one. Absent entirely on an `app` link, which needs no secret of its
   * own.
   */
  webhookSecret?: string;
}

export namespace GitLinkRetrieveResponse {
  /**
   * A GitHub repository bound to a function. A push to `branch` deploys the
   * function. A function holds at most one link.
   */
  export interface Link {
    id: string;

    /**
     * When false the link is kept and pushes are ignored.
     */
    autoDeploy: boolean;

    /**
     * Only pushes to this branch deploy.
     */
    branch: string;

    /**
     * How this link authenticates, decided by the server rather than by the caller.
     *
     * - `app`: the Zavu GitHub App is installed on the account. Pushes arrive on the
     *   app's webhook and private repositories work. Nothing to configure in the
     *   repository.
     * - `manual`: no installation. The link carries its own secret and you add the
     *   webhook to the repository yourself.
     */
    connection: 'app' | 'manual';

    createdAt: string;

    functionId: string;

    owner: string;

    provider: 'github';

    repo: string;

    updatedAt: string;

    lastCommitMessage?: string | null;

    lastCommitSha?: string | null;

    lastDeployAt?: string | null;

    /**
     * Why the last deploy failed. Null otherwise.
     */
    lastError?: string | null;

    lastStatus?: 'deploying' | 'deployed' | 'failed' | null;

    /**
     * Subdirectory holding the project, for monorepos. Null when the project is at the
     * repository root.
     */
    rootDir?: string | null;
  }
}

export interface GitLinkUpdateResponse {
  /**
   * A GitHub repository bound to a function. A push to `branch` deploys the
   * function. A function holds at most one link.
   */
  link: GitLinkUpdateResponse.Link;

  /**
   * Endpoint that receives GitHub's push deliveries. Only needed on a `manual` link,
   * where you add it to the repository yourself.
   */
  webhookUrl: string;

  /**
   * Shared secret for the repository's webhook. **Returned only when creating a
   * `manual` link, and only there** — every later read strips it, and re-linking
   * mints a new one. Absent entirely on an `app` link, which needs no secret of its
   * own.
   */
  webhookSecret?: string;
}

export namespace GitLinkUpdateResponse {
  /**
   * A GitHub repository bound to a function. A push to `branch` deploys the
   * function. A function holds at most one link.
   */
  export interface Link {
    id: string;

    /**
     * When false the link is kept and pushes are ignored.
     */
    autoDeploy: boolean;

    /**
     * Only pushes to this branch deploy.
     */
    branch: string;

    /**
     * How this link authenticates, decided by the server rather than by the caller.
     *
     * - `app`: the Zavu GitHub App is installed on the account. Pushes arrive on the
     *   app's webhook and private repositories work. Nothing to configure in the
     *   repository.
     * - `manual`: no installation. The link carries its own secret and you add the
     *   webhook to the repository yourself.
     */
    connection: 'app' | 'manual';

    createdAt: string;

    functionId: string;

    owner: string;

    provider: 'github';

    repo: string;

    updatedAt: string;

    lastCommitMessage?: string | null;

    lastCommitSha?: string | null;

    lastDeployAt?: string | null;

    /**
     * Why the last deploy failed. Null otherwise.
     */
    lastError?: string | null;

    lastStatus?: 'deploying' | 'deployed' | 'failed' | null;

    /**
     * Subdirectory holding the project, for monorepos. Null when the project is at the
     * repository root.
     */
    rootDir?: string | null;
  }
}

export interface GitLinkDeployNowResponse {
  scheduled: boolean;
}

export interface GitLinkLinkResponse {
  /**
   * A GitHub repository bound to a function. A push to `branch` deploys the
   * function. A function holds at most one link.
   */
  link: GitLinkLinkResponse.Link;

  /**
   * Endpoint that receives GitHub's push deliveries. Only needed on a `manual` link,
   * where you add it to the repository yourself.
   */
  webhookUrl: string;

  /**
   * Shared secret for the repository's webhook. **Returned only when creating a
   * `manual` link, and only there** — every later read strips it, and re-linking
   * mints a new one. Absent entirely on an `app` link, which needs no secret of its
   * own.
   */
  webhookSecret?: string;
}

export namespace GitLinkLinkResponse {
  /**
   * A GitHub repository bound to a function. A push to `branch` deploys the
   * function. A function holds at most one link.
   */
  export interface Link {
    id: string;

    /**
     * When false the link is kept and pushes are ignored.
     */
    autoDeploy: boolean;

    /**
     * Only pushes to this branch deploy.
     */
    branch: string;

    /**
     * How this link authenticates, decided by the server rather than by the caller.
     *
     * - `app`: the Zavu GitHub App is installed on the account. Pushes arrive on the
     *   app's webhook and private repositories work. Nothing to configure in the
     *   repository.
     * - `manual`: no installation. The link carries its own secret and you add the
     *   webhook to the repository yourself.
     */
    connection: 'app' | 'manual';

    createdAt: string;

    functionId: string;

    owner: string;

    provider: 'github';

    repo: string;

    updatedAt: string;

    lastCommitMessage?: string | null;

    lastCommitSha?: string | null;

    lastDeployAt?: string | null;

    /**
     * Why the last deploy failed. Null otherwise.
     */
    lastError?: string | null;

    lastStatus?: 'deploying' | 'deployed' | 'failed' | null;

    /**
     * Subdirectory holding the project, for monorepos. Null when the project is at the
     * repository root.
     */
    rootDir?: string | null;
  }
}

export interface GitLinkUpdateParams {
  autoDeploy?: boolean;

  branch?: string;

  rootDir?: string | null;
}

export interface GitLinkLinkParams {
  owner: string;

  repo: string;

  autoDeploy?: boolean;

  branch?: string;

  /**
   * Subdirectory holding the project, for monorepos.
   */
  rootDir?: string;
}

export declare namespace GitLink {
  export {
    type GitLinkRetrieveResponse as GitLinkRetrieveResponse,
    type GitLinkUpdateResponse as GitLinkUpdateResponse,
    type GitLinkDeployNowResponse as GitLinkDeployNowResponse,
    type GitLinkLinkResponse as GitLinkLinkResponse,
    type GitLinkUpdateParams as GitLinkUpdateParams,
    type GitLinkLinkParams as GitLinkLinkParams,
  };
}
