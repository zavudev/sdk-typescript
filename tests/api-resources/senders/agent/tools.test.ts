// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tools', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.senders.agent.tools.create('senderId', {
      description: 'Get the status of a customer order',
      name: 'get_order_status',
      parameters: {
        properties: { order_id: {} },
        required: ['order_id'],
        type: 'object',
      },
      webhookUrl: 'https://api.example.com/webhooks/order-status',
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
    const response = await client.senders.agent.tools.create('senderId', {
      description: 'Get the status of a customer order',
      name: 'get_order_status',
      parameters: {
        properties: { order_id: { description: 'The order ID to look up', type: 'string' } },
        required: ['order_id'],
        type: 'object',
      },
      webhookUrl: 'https://api.example.com/webhooks/order-status',
      enabled: true,
      webhookSecret: 'whsec_...',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.senders.agent.tools.retrieve('toolId', { senderId: 'senderId' });
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
    const response = await client.senders.agent.tools.retrieve('toolId', { senderId: 'senderId' });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.senders.agent.tools.update('toolId', { senderId: 'senderId' });
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
    const response = await client.senders.agent.tools.update('toolId', {
      senderId: 'senderId',
      description: 'description',
      enabled: true,
      name: 'name',
      parameters: {
        properties: { foo: { description: 'description', type: 'type' } },
        required: ['string'],
        type: 'object',
      },
      webhookSecret: 'webhookSecret',
      webhookUrl: 'https://example.com',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.senders.agent.tools.list('senderId');
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
      client.senders.agent.tools.list(
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
    const responsePromise = client.senders.agent.tools.delete('toolId', { senderId: 'senderId' });
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
    const response = await client.senders.agent.tools.delete('toolId', { senderId: 'senderId' });
  });

  // Prism tests are disabled
  test.skip('test: only required params', async () => {
    const responsePromise = client.senders.agent.tools.test('toolId', {
      senderId: 'senderId',
      testParams: { order_id: 'bar' },
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
  test.skip('test: required and optional params', async () => {
    const response = await client.senders.agent.tools.test('toolId', {
      senderId: 'senderId',
      testParams: { order_id: 'bar' },
    });
  });
});
