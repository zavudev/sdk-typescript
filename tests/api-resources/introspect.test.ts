// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource introspect', () => {
  // Prism tests are disabled
  test.skip('validatePhone: only required params', async () => {
    const responsePromise = client.introspect.validatePhone({ phoneNumber: '+56912345678' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('validatePhone: required and optional params', async () => {
    const response = await client.introspect.validatePhone({ phoneNumber: '+56912345678' });
  });
});
