## 0.6: New note in Single page app diagram

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User adds new note in form and clicks submit
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: browser adds note to notes list immediately
    Note left of server: Server adds new note to notes list
    server-->>browser: Status 201: Sends confirmation message
    deactivate server

    Note right of browser: Event handler prints confirmation message to console
```