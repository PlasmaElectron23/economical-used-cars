# Economical Used Cars - Web Project Workflow

## 1. The Environment Setup (The Foundation)
- [ ] **Initialize Vite & Tailwind**
    - [ ] `npm create vite@latest` (Choose React)
    - [ ] `npm install -D tailwindcss postcss autoprefixer`
    - [ ] `npx tailwindcss init -p`
- [ ] **Enable R2 & Create Bucket**
    - [ ] Log into Cloudflare Dashboard -> R2 -> "Enable".
    - [ ] Run `npx wrangler r2 bucket create economical-images`.
- [ ] **Initialize SQL Schema**
    - [ ] Create `schema.sql` with `CREATE TABLE` logic.
    - [ ] Run `npx wrangler d1 execute economical-db --local --file=./schema.sql`.
- [ ] **Configure Wrangler Bindings**
    - [ ] Update `wrangler.toml` to link the D1 `database_id` and R2 `bucket_name`.

## 2. The Backend (The Bridge)
- [ ] **Develop Cloudflare Worker**
    - [ ] **CORS Middleware:** Allow Frontend access.
    - [ ] **Admin Auth:** Secure the `/admin` logic with an API Key.
    - [ ] **POST Handler:**
        - [ ] **Validation:** Check that all fields (Make, Model, Price) exist.
        - [ ] **Storage:** Stream to R2 and save metadata to D1.
    - [ ] **GET Handler:** Fetch inventory list from D1.
    - [ ] **Image Server:** Generate public links or routing for R2 files.
    - [ ] **DELETE Handler:** Cleanup D1 and R2 simultaneously.

## 3. The Frontend (The User Experience)
- [ ] **Build Admin Dashboard Form**
    - [ ] **Form Logic:** Inputs for Year, Make, Model, Price, Miles.
    - [ ] **Image Preview:** Display photo before hitting "Upload."
    - [ ] **Feedback:** Implement loading spinners and success notifications.
- [ ] **Build Public Pages**
    - [ ] **Home:** Implement featured car logic.
    - [ ] **Inventory:** Grid view of all available stock.
    - [ ] **State Sync:** Ensure UI updates immediately after actions.

## 4. Deployment (Going Live)
- [ ] **Production Push**
    - [ ] Run `schema.sql` on production: `npx wrangler d1 execute economical-db --remote --file=./schema.sql`.
    - [ ] Deploy Worker: `npx wrangler deploy`.
    - [ ] Deploy React App to Cloudflare Pages or Netlify.