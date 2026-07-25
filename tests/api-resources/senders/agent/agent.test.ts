// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Zavudev from '@zavudev/sdk';

const client = new Zavudev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agent', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.senders.agent.create('senderId', {
      model: 'gpt-4o-mini',
      name: 'Customer Support',
      provider: 'openai',
      systemPrompt: 'You are a helpful customer support agent. Be friendly and concise.',
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
    const response = await client.senders.agent.create('senderId', {
      model: 'gpt-4o-mini',
      name: 'Customer Support',
      provider: 'openai',
      systemPrompt: 'You are a helpful customer support agent. Be friendly and concise.',
      apiKey: 'sk-...',
      contextWindowMessages: 1,
      includeContactMetadata: true,
      maxTokens: 1,
      temperature: 0,
      triggerOnChannels: ['string'],
      triggerOnMessageTypes: ['string'],
      voice: {
        enabled: true,
        greeting: 'Hi, thanks for calling Acme. How can I help you today?',
        greetings: { es: 'Hola, soy Atlas. Preguntame lo que quieras.' },
        interruptible: true,
        language: 'en',
        maxCallDurationMinutes: 1,
        maxIdleSeconds: 5,
        model: 'openai/gpt-4o',
        recordCalls: true,
        sttModel: 'sttModel',
        sttProvider: 'sttProvider',
        transferPhoneNumber: '+14155551234',
        ttsProvider: 'ttsProvider',
        ttsVoiceId: 'aria',
        voicemailAction: 'hangup',
        voicemailMessage: 'voicemailMessage',
        voiceSpeed: 0.5,
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.senders.agent.retrieve('senderId');
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
    const responsePromise = client.senders.agent.update('senderId', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.senders.agent.delete('senderId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('stats', async () => {
    const responsePromise = client.senders.agent.stats('senderId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
