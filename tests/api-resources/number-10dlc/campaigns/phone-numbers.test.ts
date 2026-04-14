// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource phoneNumbers', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.number10dlc.campaigns.phoneNumbers.list('campaignId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('assign: only required params', async () => {
    const responsePromise = client.number10dlc.campaigns.phoneNumbers.assign('campaignId', {
      phoneNumberId: 'pn_abc123',
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
  test.skip('assign: required and optional params', async () => {
    const response = await client.number10dlc.campaigns.phoneNumbers.assign('campaignId', {
      phoneNumberId: 'pn_abc123',
    });
  });

  // Mock server tests are disabled
  test.skip('unassign: only required params', async () => {
    const responsePromise = client.number10dlc.campaigns.phoneNumbers.unassign('assignmentId', {
      campaignId: 'campaignId',
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
  test.skip('unassign: required and optional params', async () => {
    const response = await client.number10dlc.campaigns.phoneNumbers.unassign('assignmentId', {
      campaignId: 'campaignId',
    });
  });
});
