# Frontend design update

The local React app uses a white, charcoal, and blue design inspired by the clarity
of wallet interfaces. LunoVest retains its own name and branding.

## Run

From `lunovest`, run `npm run dev`. Production build: `npm run build`.
The frontend scripts now run Vite directly. Obfuscated executable code appended to
postcss.config.js was removed, and frontend dev/build scripts no longer invoke api.js.

## Market data

Home and dashboard share the market component in src/components/market.
It requests the keyless public CoinGecko API directly from the browser:

- /coins/markets for Bitcoin, Ethereum, Solana, and BNB prices and 7-day sparklines.
- /coins/{id}/market_chart for 24-hour, 7-day, or 30-day USD price history and volume.

Line charts display prices; bar charts display sampled rolling 24-hour volume.
The volume bars are not summed daily trade volumes. Tooltips expose timestamps
and USD amounts. Prices, market cap, and 24-hour changes use API values.
Data attribution links to CoinGecko. Shared requests are deduplicated and cached
for two minutes, with two-minute price refreshes. Failures and rate limits are
visible, with retry controls. Previously loaded market prices are retained during
refresh failures. Public API availability, browser CORS policy, and rate limits
can affect loading; no price or chart data is fabricated on failure.

Market data is independent of the customer's investment balance. The existing
portfolio chart uses successful account transactions. Historical imported records
appear through the existing transaction endpoints.

## Scope

The landing page is rebuilt. Dashboard and authentication surfaces use the same
palette; admin pages inherit the shared theme. Deposit, withdrawal, and plan
controls retain their handlers. Login accepts either an email or an imported
username. The account dialog supports Escape, focus containment, and password
visibility controls. Routes are loaded on demand. Existing backend configuration
is retained.

## Checks

`node --test tests/cryptoApi.test.js` verifies request deduplication, caching,
rate-limit handling, retries, missing-data rejection, and numeric formatting.
`npm run build` verifies the production bundle. Browser visual verification
was unavailable in the editing session. Check `/`, `/dashboard` with an account,
and the login dialog at desktop and mobile widths before deployment.

## Wallet connection and admin account creation

/connect_wallet now uses a wallet-approved public-address connection. There are
no recovery-phrase or private-key inputs and no EmailJS sending on that route.
Compatible EVM browser providers are supported; mobile users need a wallet app's
built-in browser. This does not verify withdrawals or persist ownership.

On /admin, sign in and click Create new users. Enter customer details, username/password, selected plan, original USD investment,
and original date/time. The datetime field uses the administrator's local timezone
and is converted to an ISO UTC timestamp for the API. Optional crypto amount and
coin name must be entered together.

Admin login is the existing client-side username/password check in Admin.jsx.
There is no server admin login, API key, session token, or credential environment
configuration. The browser check hides the screen but does not protect the API;
admin endpoints can be called directly. The frontend uses baseUrl in
src/features/api/apiSlice.js. Deploy both frontend and API changes together.

The form creates a unique import reference for each new investor. Network errors
or server failures lock the draft and allow retrying the identical request.
Do not create a fresh import after an uncertain result. Closing/reopening keeps
the draft in memory. Refreshing the page discards
that draft, so resolve an uncertain result before refreshing. Successful imports
show the server-calculated amounts and history count. Copy login credentials
copies the supplied username, email, and password so the administrator can share
them privately. No message is sent automatically. Closing the completed dialog
or choosing Create another user clears those credentials from component state.

Validation: changed JSX compiles, market/wallet tests pass (7), and backend import
tests pass (5). Browser visual checks and live Firebase writes were not performed.
