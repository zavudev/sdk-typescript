# Channel

Delivery channel.

## Example Usage

```typescript
import { Channel } from "@zavudev/sdk/models";

let value: Channel = "sms";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"sms" | "whatsapp" | Unrecognized<string>
```