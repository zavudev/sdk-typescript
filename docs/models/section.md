# Section

## Example Usage

```typescript
import { Section } from "@zavudev/sdk/models";

let value: Section = {
  title: "<value>",
  rows: [
    {
      id: "<id>",
      title: "<value>",
    },
  ],
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `title`                          | *string*                         | :heavy_check_mark:               | N/A                              |
| `rows`                           | [models.Row](../models/row.md)[] | :heavy_check_mark:               | N/A                              |