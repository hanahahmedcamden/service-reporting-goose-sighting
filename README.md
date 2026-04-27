# Camden prototype kit

A small Express and Nunjucks prototype kit for Camden transactional services. It uses `lbcamden-frontend` for the Camden header, footer, button, CSS and static assets, with familiar prototype routes and session-backed data.

## Run it

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

If port `3000` is already in use, run it on `3010` instead:

```sh
npm run dev:3010
```

Open `http://localhost:3010`.

## Add a page

1. Create a Nunjucks view in `app/views`.
2. Add a GET route in `app/routes.js`.
3. For forms, add a POST route that validates input, writes to `req.session.data`, then redirects.

Views can read saved prototype data through the `data` object:

```njk
{{ data.postcode }}
```

## Camden frontend

The project imports `lbcamden-frontend` in `app/assets/sass/application.scss`, serves copied Camden assets from `/assets`, and exposes Camden component macros from `node_modules/lbcamden-frontend/lbcamden`.

Example:

```njk
{% from "components/button/macro.njk" import LBCamdenButton %}

{{ LBCamdenButton({
  text: "Continue",
  preventDoubleClick: true
}) }}
```

## Generating flows with Codex

Ask Codex to follow the existing sample flow:

> Add a Camden prototype journey for reporting a missed bin collection. Use pages for address lookup, collection type, contact details, check answers and confirmation. Store answers in `req.session.data`.

The important files for generated transactional journeys are:

- `app/routes.js`
- `app/views/layouts/main.njk`
- `app/views/macros/forms.njk`
- `app/views/<journey-name>/*.njk`
