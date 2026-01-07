// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource flows', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.senders.agent.flows.create('senderId', {
      name: 'Lead Capture',
      steps: [
        {
          id: 'welcome',
          config: { text: 'bar' },
          type: 'message',
        },
        {
          id: 'ask_name',
          config: { variable: 'bar', prompt: 'bar' },
          type: 'collect',
        },
      ],
      trigger: { type: 'keyword' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.senders.agent.flows.create('senderId', {
      name: 'Lead Capture',
      steps: [
        {
          id: 'welcome',
          config: { text: 'bar' },
          type: 'message',
          nextStepId: 'ask_name',
        },
        {
          id: 'ask_name',
          config: { variable: 'bar', prompt: 'bar' },
          type: 'collect',
          nextStepId: 'nextStepId',
        },
      ],
      trigger: {
        type: 'keyword',
        intent: 'intent',
        keywords: ['info', 'pricing', 'demo'],
      },
      description: 'Capture lead information',
      enabled: true,
      priority: 0,
    });
  });

  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.senders.agent.flows.retrieve('flowId', { senderId: 'senderId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.senders.agent.flows.retrieve('flowId', { senderId: 'senderId' });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.senders.agent.flows.update('flowId', { senderId: 'senderId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.senders.agent.flows.update('flowId', {
      senderId: 'senderId',
      description: 'description',
      enabled: true,
      name: 'name',
      priority: 0,
      steps: [
        {
          id: 'id',
          config: { foo: 'bar' },
          type: 'message',
          nextStepId: 'nextStepId',
        },
      ],
      trigger: {
        type: 'keyword',
        intent: 'intent',
        keywords: ['string'],
      },
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.senders.agent.flows.list('senderId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.senders.agent.flows.list(
        'senderId',
        {
          cursor: 'cursor',
          enabled: true,
          limit: 100,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Zavudev.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.senders.agent.flows.delete('flowId', { senderId: 'senderId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.senders.agent.flows.delete('flowId', { senderId: 'senderId' });
  });

  // Prism tests are disabled
  test.skip('duplicate: only required params', async () => {
    const responsePromise = client.senders.agent.flows.duplicate('flowId', {
      senderId: 'senderId',
      newName: 'Lead Capture (Copy)',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('duplicate: required and optional params', async () => {
    const response = await client.senders.agent.flows.duplicate('flowId', {
      senderId: 'senderId',
      newName: 'Lead Capture (Copy)',
    });
  });
});
