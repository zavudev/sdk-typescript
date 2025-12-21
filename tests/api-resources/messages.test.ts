// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.messages.retrieve('messageId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.messages.list();
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
      client.messages.list(
        { channel: 'auto', cursor: 'cursor', limit: 100, status: 'queued', to: 'to' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Zavudev.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('react: only required params', async () => {
    const responsePromise = client.messages.react('messageId', { emoji: '👍' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('react: required and optional params', async () => {
    const response = await client.messages.react('messageId', { emoji: '👍', 'Zavu-Sender': 'sender_12345' });
  });

  // Prism tests are disabled
  test.skip('send: only required params', async () => {
    const responsePromise = client.messages.send({ to: '+56912345678' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: required and optional params', async () => {
    const response = await client.messages.send({
      to: '+56912345678',
      channel: 'auto',
      content: {
        buttons: [{ id: 'id', title: 'title' }],
        contacts: [{ name: 'name', phones: ['string'] }],
        emoji: 'emoji',
        filename: 'invoice.pdf',
        latitude: 0,
        listButton: 'listButton',
        locationAddress: 'locationAddress',
        locationName: 'locationName',
        longitude: 0,
        mediaId: 'mediaId',
        mediaUrl: 'https://example.com/image.jpg',
        mimeType: 'image/jpeg',
        reactToMessageId: 'reactToMessageId',
        sections: [{ rows: [{ id: 'id', title: 'title', description: 'description' }], title: 'title' }],
        templateId: 'templateId',
        templateVariables: { '1': 'John', '2': 'ORD-12345' },
      },
      fallbackEnabled: true,
      htmlBody: 'htmlBody',
      idempotencyKey: 'msg_01HZY4ZP7VQY2J3BRW7Z6G0QGE',
      messageType: 'text',
      metadata: { foo: 'string' },
      replyTo: 'support@example.com',
      subject: 'Your order confirmation',
      text: 'Your verification code is 123456',
      'Zavu-Sender': 'sender_12345',
    });
  });
});
