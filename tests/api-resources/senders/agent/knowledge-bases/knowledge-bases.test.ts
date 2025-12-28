// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource knowledgeBases', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.senders.agent.knowledgeBases.create('senderId', { name: 'Product FAQ' });
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
    const response = await client.senders.agent.knowledgeBases.create('senderId', {
      name: 'Product FAQ',
      description: 'Frequently asked questions about our products',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.senders.agent.knowledgeBases.retrieve('kbId', { senderId: 'senderId' });
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
    const response = await client.senders.agent.knowledgeBases.retrieve('kbId', { senderId: 'senderId' });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.senders.agent.knowledgeBases.update('kbId', { senderId: 'senderId' });
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
    const response = await client.senders.agent.knowledgeBases.update('kbId', {
      senderId: 'senderId',
      description: 'description',
      name: 'name',
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.senders.agent.knowledgeBases.list('senderId');
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
      client.senders.agent.knowledgeBases.list(
        'senderId',
        { cursor: 'cursor', limit: 100 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Zavudev.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.senders.agent.knowledgeBases.delete('kbId', { senderId: 'senderId' });
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
    const response = await client.senders.agent.knowledgeBases.delete('kbId', { senderId: 'senderId' });
  });
});
