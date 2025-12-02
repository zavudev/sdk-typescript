# MessageType

Type of message. Non-text types are WhatsApp only.

## Example Usage

```typescript
import { MessageType } from "@zavudev/sdk/models";

let value: MessageType = "reaction";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"text" | "image" | "video" | "audio" | "document" | "sticker" | "location" | "contact" | "buttons" | "list" | "reaction" | "template" | Unrecognized<string>
```