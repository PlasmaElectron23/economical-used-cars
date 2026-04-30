=== Economical Used Cars Project Overview ===


# Economical Used Cars - Project Workflow

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
- [x] Update SQL Schema
    - [x] Add description column
    - [x] Add featured column (0 for no, 1 for yes)
- [x] Update src/worker.js logic
    - [x] Update the POST handler to accept the description
    - [x] New PATCH handler so Eduardo can toggle a car as "Featured" without re-uploading it.

## 5. The Frontend - Customer
- [x] Home page with name of the business, a brief description and message, the top 3 cars, and contact info.
- [x] Inventory page that will show all the cars and their description.

## 6. Architecture & Refactoring
- [x] Decouple Components
    - [x] Make new folders and files.
    - [x] Extract `Navbar`, `CarCard`, `Footer`, and `DetailModal` into `src/components/`.
    - [x] Create dedicated page files in `src/pages/` (Home.jsx, Inventory.jsx, Admin.jsx).
- [x] Localization Architecture
    - [x] Move `text` dictionary to `src/constants/translations.js`.
    - [x] Implement `LanguageContext` to avoid prop-drilling the `lang` state.
- [x] Changed language button to toggle.
- [x] Routing
    - [x] Integrate `react-router-dom` for clean URLs (e.g., `/inventory` instead of state-based views).

## 7. Provisional Production Version
- [x] Do some housekeeping with folders and files.
- [x] Remove the Admin page from the navigation bar on the Home page.
- [x] Make a secret URL for the Admin page.
- [ ] Optimize for mobile screens

## 8. Advanced Enhancements
- [ ] Admin Authentication
	- [ ] Make the Admin page only accessible to the owner and the developer by means of a password. 
- [ ] Implement the ability to edit posted car cards in the Admin page.
- [ ] Search & Filtering: Add a search bar to the inventory page to filter by Make/Model.
- [ ] Image Optimization: Implement client-side compression before uploading to R2.
- [ ] Persistence: Store `lang` preference in `localStorage`.
- [ ] SEO: Add meta tags and titles for better visibility in Ocala local search.

## 9. Deployment
- [ ] Production Push
    - [ ] Run `schema.sql` on production: `npx wrangler d1 execute economical-db --remote --file=./schema.sql`.
    - [ ] Deploy Worker: `npx wrangler deploy`.
    - [ ] Deploy React App to Cloudflare Pages.
- [ ] Production Hardening (Security)
    - [ ] Restrict CORS: Update R2 settings from * to the production domain.
- [ ] Automated Deployment Script (Optional Bash/PowerShell)
    - [ ] Create deploy.sh or deploy.ps1 for one-click launches.

## Other Changes To Be Made At Some Undetermined Point:
- [ ] Translate description in car card.


# Economical Used Cars - File Structure

economical-used-cars
----
\.wrangler
\dist
\node_modules
\public         
                    
\scripts                                 
\src                                     
\src\api                                 
\src\components                          
\src\components\common                   
\src\components\common\Footer.jsx        
\src\components\common\LanguageToggle.jsx
\src\components\common\Navbar.jsx        
\src\components\inventory                
\src\components\inventory\CarCard.jsx    
\src\components\inventory\DetailModal.jsx
\src\constants                           
\src\constants\translations.js           
\src\context                             
\src\context\LanguageContext.jsx         
\src\pages                               
\src\pages\Admin.jsx                     
\src\pages\Home.jsx                      
\src\pages\Inventory.jsx                 
\src\App.jsx                             
\src\index.css                           
\src\main.jsx                            
\worker                                  
\worker\src                              
\worker\src\index.js                     
\worker\package.json                     
\worker\wrangler.toml                    
\.gitignore                              
\cors.json                               
\eslint.config.js                        
\index.html                              
\package-lock.json                       
\package.json                            
\postcss.config.js                       
\README.md                               
\schema.sql                              
\tailwind.config.js                      
\vite.config.js                          
