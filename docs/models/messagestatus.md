# MessageStatus

## Example Usage

```typescript
import { MessageStatus } from "@zavudev/sdk/models";

let value: MessageStatus = "read";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"queued" | "sending" | "sent" | "delivered" | "read" | "failed" | Unrecognized<string>
```