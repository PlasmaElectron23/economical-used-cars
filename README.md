# Economical Used Cars - Web Project Workflow

## 1. The Environment Setup
- [x] Initialize Vite & Tailwind
    - [x] `npm create vite@latest` (Choose React)
    - [x] `npm install -D tailwindcss postcss autoprefixer`
    - [x] `npx tailwindcss init -p`
- [x] Enable R2 & Create Bucket
    - [x] Log into Cloudflare Dashboard -> R2 -> "Enable".
    - [x] Run `npx wrangler r2 bucket create economical-images`.
- [x] Initialize SQL Schema
    - [x] Create `schema.sql` with `CREATE TABLE` logic.
    - [x] Run `npx wrangler d1 execute economical-db --local --file=./schema.sql`.
- [x] Configure Wrangler Bindings
    - [x] Update `wrangler.toml` to link the D1 `database_id` and R2 `bucket_name`.

## 2. The Backend - Admin
- [x] Develop Cloudflare Worker
- [x] CORS Middleware Allow Frontend access.
- [x] Admin Auth Secure the `/admin` logic with an API Key.
- [x] POST Handler:
- [x] D1 Integration: Check that all fields (Make, Model, Price) exist.
- [x] R2 Integration: Stream to R2 and save metadata to D1.
- [x] GET Handler: Fetch inventory list from D1.
- [x] Image Server: Generate public links or routing for R2 files.
- [x] DELETE Handler: Cleanup D1 and R2 simultaneously.

## 3. The Frontend - Admin
- [x] Build Admin Dashboard Form
    - [x] Form Logic: Inputs for Year, Make, Model, Price, Miles.
    - [x] Image Preview: Display photo before hitting "Upload."
    - [x] Feedback: Implement loading spinners and success notifications.
- [x] Build Public Pages
    - [x] Home: Implement featured car logic.
    - [x] Inventory: Grid view of all available stock.
    - [x] State Sync: Ensure UI updates immediately after actions.

## 4. The Backend - Customer
- [ ] Update SQL Schema
    - [ ] Add description column
    - [ ] Add featured column (0 for no, 1 for yes)
- [ ] Update src/worker.js logic
    - [ ] Update the POST handler to accept the description
    - [ ] New PATCH handler so Eduardo can toggle a car as "Featured" without re-uploading it.

## 5. The Frontend - Customer
- [ ] Home page with name of the business, a brief description and message, the top 3 cars, and contact info.
- [ ] Inventory page that will show all the cars and their description.

## 6. Deployment
- [ ] Production Push
    - [ ] Run `schema.sql` on production: `npx wrangler d1 execute economical-db --remote --file=./schema.sql`.
    - [ ] Deploy Worker: `npx wrangler deploy`.
    - [ ] Deploy React App to Cloudflare Pages.
    - [ ] Production Hardening (Security)
        - [ ] Restrict CORS: Update R2 settings from * to the production domain.
    - [ ] Automated Deployment Script (Optional Bash/PowerShell)
        - [ ] Create deploy.sh or deploy.ps1 for one-click launches: