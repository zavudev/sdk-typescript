// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource phoneNumbers', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.phoneNumbers.retrieve('phoneNumberId');
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
    const responsePromise = client.phoneNumbers.update('phoneNumberId', {});
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
    const responsePromise = client.phoneNumbers.list();
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
      client.phoneNumbers.list(
        {
          cursor: 'cursor',
          limit: 100,
          status: 'active',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Zavudev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('purchase: only required params', async () => {
    const responsePromise = client.phoneNumbers.purchase({ phoneNumber: '+15551234567' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('purchase: required and optional params', async () => {
    const response = await client.phoneNumbers.purchase({
      phoneNumber: '+15551234567',
      name: 'Primary Line',
      regulatoryRequirements: [
        { fieldValue: 'jd7x2k3m4n5p6q7r8s9t0abc', requirementType: '8c5b1a2e-0f3d-4f5b-9a61-2c7e4d9b1f10' },
      ],
      type: 'local',
    });
  });

  // Mock server tests are disabled
  test.skip('release', async () => {
    const responsePromise = client.phoneNumbers.release('phoneNumberId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('requirements', async () => {
    const responsePromise = client.phoneNumbers.requirements();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('requirements: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.phoneNumbers.requirements(
        {
          countryCode: 'xx',
          phoneNumber: 'phoneNumber',
          type: 'local',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Zavudev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('searchAvailable: only required params', async () => {
    const responsePromise = client.phoneNumbers.searchAvailable({ countryCode: 'xx' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('searchAvailable: required and optional params', async () => {
    const response = await client.phoneNumbers.searchAvailable({
      countryCode: 'xx',
      capabilities: 'voice,sms',
      contains: 'contains',
      limit: 50,
      type: 'local',
    });
  });
});
