<!-- Start SDK Example Usage [usage] -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.sendMessage({
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