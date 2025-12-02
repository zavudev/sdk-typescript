<!-- Start SDK Example Usage [usage] -->
```typescript
import { SDK } from "@zavu/sdk";

const sdk = new SDK({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await sdk.sendMessage({
    zavuSender: "sender_12345",
    body: {
      to: "+56912345678",
      text: "Your verification code is 123456",
    },
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->