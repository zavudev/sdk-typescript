// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource campaigns', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.number10dlc.campaigns.create({
      affiliateMarketing: false,
      ageGated: false,
      brandId: 'brand_abc123',
      description: 'Send order status updates and shipping notifications to customers who opted in.',
      directLending: false,
      embeddedLink: true,
      embeddedPhone: false,
      name: 'Order Notifications',
      numberPooling: false,
      sampleMessages: [
        'Hi {{name}}, your order #{{order_id}} has shipped! Track it at {{url}}',
        'Your order #{{order_id}} has been delivered. Thank you for your purchase!',
      ],
      subscriberHelp: true,
      subscriberOptIn: true,
      subscriberOptOut: true,
      useCase: 'ACCOUNT_NOTIFICATION',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.number10dlc.campaigns.create({
      affiliateMarketing: false,
      ageGated: false,
      brandId: 'brand_abc123',
      description: 'Send order status updates and shipping notifications to customers who opted in.',
      directLending: false,
      embeddedLink: true,
      embeddedPhone: false,
      name: 'Order Notifications',
      numberPooling: false,
      sampleMessages: [
        'Hi {{name}}, your order #{{order_id}} has shipped! Track it at {{url}}',
        'Your order #{{order_id}} has been delivered. Thank you for your purchase!',
      ],
      subscriberHelp: true,
      subscriberOptIn: true,
      subscriberOptOut: true,
      useCase: 'ACCOUNT_NOTIFICATION',
      helpMessage: 'helpMessage',
      messageFlow: 'messageFlow',
      optInKeywords: ['string'],
      optOutKeywords: ['string'],
      subUseCases: ['string'],
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.number10dlc.campaigns.retrieve('campaignId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.number10dlc.campaigns.update('campaignId', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.number10dlc.campaigns.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.number10dlc.campaigns.list(
        {
          brandId: 'brandId',
          cursor: 'cursor',
          limit: 100,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Zavudev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.number10dlc.campaigns.delete('campaignId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('submit', async () => {
    const responsePromise = client.number10dlc.campaigns.submit('campaignId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('syncStatus', async () => {
    const responsePromise = client.number10dlc.campaigns.syncStatus('campaignId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
