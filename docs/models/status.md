# Status

## Example Usage

```typescript
import { Status } from "@zavu/sdk/models";

let value: Status = "approved";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"pending" | "approved" | "rejected" | Unrecognized<string>
```