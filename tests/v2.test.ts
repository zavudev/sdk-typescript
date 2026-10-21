import Zavudev from '@zavudev/sdk';
import { V2, type MessageSendParams } from '@zavudev/sdk/v2';

type Call = { method: string; url: string; body: unknown; headers: Headers };

/** A client whose fetch records each request and answers from `responses`, in order. */
function recorder(responses: Array<() => Response> = []) {
  const calls: Call[] = [];
  const fetch = async (url: string | URL | Request, init: RequestInit = {}): Promise<Response> => {
    calls.push({
      method: init.method ?? 'GET',
      url: String(url),
      body: typeof init.body === 'string' ? JSON.parse(init.body) : undefined,
      headers: new Headers(init.headers),
    });
    const next = responses.shift();
    return next ? next() : json({});
  };
  const client = new Zavudev({ apiKey: 'zv_test', baseURL: 'http://localhost:4010', fetch, maxRetries: 1 });
  return { client, calls };
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

const BASE = 'http://localhost:4010';

describe('client.v2', () => {
  test('is the V2 class from @zavudev/sdk/v2', () => {
    const { client } = recorder();
    expect(client.v2).toBeInstanceOf(V2);
    expect(client.v2.messages).toBeInstanceOf(V2.Messages);
  });

  test('messages.send posts the body to /v2/messages with the API key', async () => {
    const { client, calls } = recorder([() => json({ message: { id: 'msg_1' } }, 202)]);
    const params: MessageSendParams = { to: '+56912345678', text: 'Hola' };
    const res = await client.v2.messages.send(params);
    expect(res).toEqual({ message: { id: 'msg_1' } });
    expect(calls).toHaveLength(1);
    expect(calls[0]!.method).toBe('POST');
    expect(calls[0]!.url).toBe(`${BASE}/v2/messages`);
    expect(calls[0]!.body).toEqual({ to: '+56912345678', text: 'Hola' });
    expect(calls[0]!.headers.get('authorization')).toBe('Bearer zv_test');
  });

  // Every path id is positional, in path order. `+` and `@` are valid in a path
  // segment (RFC 3986) and go as they are, the way v1's ids always have; the API
  // accepts them and `%2B` alike.
  test.each<[string, (c: Zavudev) => Promise<unknown>, string, string]>([
    ['channels.retrieve', (c) => c.v2.channels.retrieve('+13125551212'), 'GET', '/v2/channels/+13125551212'],
    [
      'channels.activate',
      (c) => c.v2.channels.activate('+13125551212', 'whatsapp'),
      'POST',
      '/v2/channels/+13125551212/whatsapp/activate',
    ],
    ['channels.retrieve (encoded)', (c) => c.v2.channels.retrieve('a/b c'), 'GET', '/v2/channels/a%2Fb%20c'],
    [
      'channels.deactivate',
      (c) => c.v2.channels.deactivate('hello@acme.com', 'email'),
      'POST',
      '/v2/channels/hello@acme.com/email/deactivate',
    ],
    [
      'channels.disconnect',
      (c) => c.v2.channels.disconnect('@acme_bot', 'telegram'),
      'DELETE',
      '/v2/channels/@acme_bot/telegram',
    ],
    [
      'agents.channels.disconnect',
      (c) => c.v2.agents.channels.disconnect('agent_1', '+13125551212', 'sms'),
      'DELETE',
      '/v2/agents/agent_1/channels/+13125551212/sms',
    ],
    [
      'agents.channels.connect',
      (c) => c.v2.agents.channels.connect('agent_1', { address: '+13125551212', type: 'sms' }),
      'POST',
      '/v2/agents/agent_1/channels',
    ],
    ['messages.retrieve', (c) => c.v2.messages.retrieve('msg_1'), 'GET', '/v2/messages/msg_1'],
    [
      'conversations.retrieve',
      (c) => c.v2.conversations.retrieve('conv_1'),
      'GET',
      '/v2/conversations/conv_1',
    ],
    [
      'conversations.markAsRead',
      (c) => c.v2.conversations.markAsRead('conv_1'),
      'POST',
      '/v2/conversations/conv_1/read',
    ],
    [
      'contacts.create',
      (c) => c.v2.contacts.create({ channels: [{ channel: 'sms', identifier: '+56912345678' }] }),
      'POST',
      '/v2/contacts',
    ],
    [
      'contacts.update',
      (c) => c.v2.contacts.update('ct_1', { displayName: 'Ana' }),
      'PATCH',
      '/v2/contacts/ct_1',
    ],
    ['contacts.delete', (c) => c.v2.contacts.delete('ct_1'), 'DELETE', '/v2/contacts/ct_1'],
    [
      'channels.connect',
      (c) => c.v2.channels.connect({ type: 'telegram', botToken: '123:abc' }),
      'POST',
      '/v2/channels',
    ],
    [
      'templates.submit',
      (c) => c.v2.templates.submit('tpl_1', { from: '+13125551212' }),
      'POST',
      '/v2/templates/tpl_1/submit',
    ],
    ['templates.delete', (c) => c.v2.templates.delete('tpl_1'), 'DELETE', '/v2/templates/tpl_1'],
    [
      'campaigns.create',
      (c) => c.v2.campaigns.create({ name: 'Launch', channel: 'sms', text: 'Hi' }),
      'POST',
      '/v2/campaigns',
    ],
    [
      'campaigns.recipients.add',
      (c) => c.v2.campaigns.recipients.add('cmp_1', { contacts: [{ recipient: '+56912345678' }] }),
      'POST',
      '/v2/campaigns/cmp_1/recipients',
    ],
    ['campaigns.send', (c) => c.v2.campaigns.send('cmp_1'), 'POST', '/v2/campaigns/cmp_1/send'],
    ['campaigns.progress', (c) => c.v2.campaigns.progress('cmp_1'), 'GET', '/v2/campaigns/cmp_1/progress'],
    ['campaigns.cancel', (c) => c.v2.campaigns.cancel('cmp_1'), 'POST', '/v2/campaigns/cmp_1/cancel'],
    ['webhook.retrieve', (c) => c.v2.webhook.retrieve(), 'GET', '/v2/webhook'],
    [
      'webhook.set',
      (c) => c.v2.webhook.set({ url: 'https://acme.com/hooks', events: ['message.inbound'] }),
      'PUT',
      '/v2/webhook',
    ],
    ['webhook.rotateSecret', (c) => c.v2.webhook.rotateSecret(), 'POST', '/v2/webhook/secret'],
    [
      'agents.create',
      (c) =>
        c.v2.agents.create({
          name: 'Ada',
          provider: 'zavu',
          model: 'gpt-4o-mini',
          systemPrompt: 'Be brief.',
        }),
      'POST',
      '/v2/agents',
    ],
    [
      'agents.test',
      (c) => c.v2.agents.test('agent_1', { message: 'hola' }),
      'POST',
      '/v2/agents/agent_1/test',
    ],
    [
      'numbers.searchAvailable',
      (c) => c.v2.numbers.searchAvailable({ countryCode: 'US' }),
      'GET',
      '/v2/numbers/available?countryCode=US',
    ],
    [
      'numbers.purchase',
      (c) => c.v2.numbers.purchase({ phoneNumber: '+13125551212' }),
      'POST',
      '/v2/numbers',
    ],
    ['emailDomains.list', (c) => c.v2.emailDomains.list(), 'GET', '/v2/email-domains'],
    [
      'emailDomains.create',
      (c) => c.v2.emailDomains.create({ domain: 'acme.com' }),
      'POST',
      '/v2/email-domains',
    ],
    ['emailDomains.verify', (c) => c.v2.emailDomains.verify('ed_1'), 'POST', '/v2/email-domains/ed_1/verify'],
    ['functions.retrieve', (c) => c.v2.functions.retrieve('fn_1'), 'GET', '/v2/functions/fn_1'],
    [
      'functions.update',
      (c) => c.v2.functions.update('fn_1', { enabled: false }),
      'PATCH',
      '/v2/functions/fn_1',
    ],
  ])('%s', async (_name, call, method, path) => {
    const { client, calls } = recorder();
    await call(client);
    expect(calls).toHaveLength(1);
    expect(calls[0]!.method).toBe(method);
    expect(calls[0]!.url).toBe(`${BASE}${path}`);
  });

  test('a list follows nextCursor across pages', async () => {
    const { client, calls } = recorder([
      () => json({ items: [{ id: 'msg_1' }, { id: 'msg_2' }], nextCursor: 'c2' }),
      () => json({ items: [{ id: 'msg_3' }], nextCursor: null }),
    ]);
    const ids: string[] = [];
    for await (const message of client.v2.messages.list({ limit: 2 })) {
      ids.push(message.id);
    }
    expect(ids).toEqual(['msg_1', 'msg_2', 'msg_3']);
    expect(calls.map((c) => c.url)).toEqual([
      `${BASE}/v2/messages?limit=2`,
      `${BASE}/v2/messages?limit=2&cursor=c2`,
    ]);
  });

  // api-v2/errors.mdx promises these two behaviours.
  test('a 409 is a ConflictError and is not retried', async () => {
    const { client, calls } = recorder([
      () => json({ code: 'conflict', message: 'Already connected.' }, 409, { 'x-should-retry': 'false' }),
    ]);
    const error = await client.v2.channels.connect({ type: 'sms_oneway' }).catch((e) => e);
    expect(error).toBeInstanceOf(Zavudev.ConflictError);
    expect(error.status).toBe(409);
    // A v2 error body sits at the root, and the SDK keeps it on `error`.
    expect(error.error).toEqual({ code: 'conflict', message: 'Already connected.' });
    expect(calls).toHaveLength(1);
  });

  test('x-should-retry: false stops a retry the status would allow', async () => {
    const { client, calls } = recorder([
      () => json({ code: 'unavailable', message: 'Try later.' }, 503, { 'x-should-retry': 'false' }),
    ]);
    const error = await client.v2.webhook.retrieve().catch((e) => e);
    expect(error).toBeInstanceOf(Zavudev.InternalServerError);
    expect(calls).toHaveLength(1);
  });

  test('without x-should-retry the same 503 is retried', async () => {
    const { client, calls } = recorder([
      () => json({ code: 'unavailable', message: 'Try later.' }, 503, { 'retry-after-ms': '1' }),
      () => json({ webhook: null }),
    ]);
    await client.v2.webhook.retrieve();
    expect(calls).toHaveLength(2);
  });
});
