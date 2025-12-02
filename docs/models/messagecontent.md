# MessageContent

Content for non-text message types (WhatsApp only).

## Example Usage

```typescript
import { MessageContent } from "@zavu/sdk/models";

let value: MessageContent = {
  mediaUrl: "https://example.com/image.jpg",
  mimeType: "image/jpeg",
  filename: "invoice.pdf",
  templateVariables: {
    "1": "John",
    "2": "ORD-12345",
  },
};
```

## Fields

| Field                                                                       | Type                                                                        | Required                                                                    | Description                                                                 | Example                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `mediaUrl`                                                                  | *string*                                                                    | :heavy_minus_sign:                                                          | URL of the media file (for image, video, audio, document, sticker).         | https://example.com/image.jpg                                               |
| `mediaId`                                                                   | *string*                                                                    | :heavy_minus_sign:                                                          | WhatsApp media ID if already uploaded.                                      |                                                                             |
| `mimeType`                                                                  | *string*                                                                    | :heavy_minus_sign:                                                          | MIME type of the media.                                                     | image/jpeg                                                                  |
| `filename`                                                                  | *string*                                                                    | :heavy_minus_sign:                                                          | Filename for documents.                                                     | invoice.pdf                                                                 |
| `latitude`                                                                  | *number*                                                                    | :heavy_minus_sign:                                                          | Latitude for location messages.                                             |                                                                             |
| `longitude`                                                                 | *number*                                                                    | :heavy_minus_sign:                                                          | Longitude for location messages.                                            |                                                                             |
| `locationName`                                                              | *string*                                                                    | :heavy_minus_sign:                                                          | Name of the location.                                                       |                                                                             |
| `locationAddress`                                                           | *string*                                                                    | :heavy_minus_sign:                                                          | Address of the location.                                                    |                                                                             |
| `contacts`                                                                  | [models.MessageContentContact](../models/messagecontentcontact.md)[]        | :heavy_minus_sign:                                                          | Contact cards for contact messages.                                         |                                                                             |
| `buttons`                                                                   | [models.Button](../models/button.md)[]                                      | :heavy_minus_sign:                                                          | Interactive buttons (max 3).                                                |                                                                             |
| `listButton`                                                                | *string*                                                                    | :heavy_minus_sign:                                                          | Button text for list messages.                                              |                                                                             |
| `sections`                                                                  | [models.Section](../models/section.md)[]                                    | :heavy_minus_sign:                                                          | Sections for list messages.                                                 |                                                                             |
| `emoji`                                                                     | *string*                                                                    | :heavy_minus_sign:                                                          | Emoji for reaction messages.                                                |                                                                             |
| `reactToMessageId`                                                          | *string*                                                                    | :heavy_minus_sign:                                                          | Message ID to react to.                                                     |                                                                             |
| `templateId`                                                                | *string*                                                                    | :heavy_minus_sign:                                                          | Template ID for template messages.                                          |                                                                             |
| `templateVariables`                                                         | Record<string, *string*>                                                    | :heavy_minus_sign:                                                          | Variables for template rendering. Keys are variable positions (1, 2, 3...). | {<br/>"1": "John",<br/>"2": "ORD-12345"<br/>}                               |