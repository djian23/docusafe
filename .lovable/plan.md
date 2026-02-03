

# DocuSafe - Secure Document Management SaaS

## Overview
A premium digital vault where users organize important documents in "Spheres" (categories), with an encrypted password manager and AI assistant. Target users: freelancers, families, and small businesses.

---

## Phase 1: Foundation

### 1.1 Landing Page
- Modern, premium hero section: "Votre coffre-fort numérique intelligent"
- 3 feature highlight cards (Security, AI Assistant, Password Manager)
- Pricing section with 3 tiers: Gratuit (500MB), Starter (9€/mois, 5GB), Pro (29€/mois, 50GB)
- Header with logo, login/signup buttons
- Smooth animations and gradient accents

### 1.2 Authentication
- Email/password signup with email verification
- Login with password reset flow
- Protected routes (redirect to login if not authenticated)
- On signup: auto-create 11 system spheres with file templates

### 1.3 Database Setup (Lovable Cloud)
- **spheres** table: user categories with icons, colors, positions
- **sphere_file_templates**: pre-defined document slots per sphere
- **user_sphere_files**: uploaded documents linked to templates
- Row-Level Security on all tables (users access only their data)

---

## Phase 2: Core Document Management

### 2.1 Main Dashboard
- Left sidebar: user info, navigation (Dashboard, Spheres list, AI Assistant, Settings), storage meter
- Top bar: global search, "New document" button
- Alert cards: urgent actions, upcoming expirations
- Sphere grid (3 columns) showing name, icon, completion percentage

### 2.2 Sphere Detail View
- Breadcrumb navigation
- List of file template cards showing:
  - Empty slots: upload prompt with help text
  - Filled slots: file info, view/download/rename/delete actions
- "Add custom file" option

### 2.3 File Management
- Drag & drop upload to Lovable Cloud Storage
- File organization: `{user_id}/{sphere_name}/{filename}`
- Secure signed URLs (5-minute expiration) for viewing/downloading
- Rename files (custom display name)
- Soft delete (archive) with restore option
- Upload progress indicator

---

## Phase 3: Password Manager

### 3.1 Encrypted Password Storage
- Master password setup (required on first access)
- Client-side AES-256-GCM encryption using Web Crypto API
- Master key derivation with PBKDF2 (100,000 iterations)
- Passwords encrypted before storing in database
- **No plaintext passwords ever stored**

### 3.2 Password Manager UI (Special Sphere)
- Search and filter passwords
- Category tabs: All, Personal, Professional, Banking
- Password cards showing service icon, username, strength score, last modified
- Quick actions: view (masked), copy, edit, delete

### 3.3 Password Generator
- Length slider (8-32 characters)
- Toggle options: uppercase, lowercase, numbers, symbols
- Live preview of generated password
- Strength score calculation (0-100)

### 3.4 Pre-populated Services
- Quick-add popular services: Netflix, Gmail, LinkedIn, Amazon, Facebook, Instagram, Spotify, PayPal

---

## Phase 4: AI Assistant

### 4.1 Chat Interface
- Sidebar or modal chat interface
- Natural language queries: "Donne-moi mon RIB"
- AI parses intent, searches user's documents
- Returns file with secure link (5-min expiration)

### 4.2 Edge Function
- Receives user message
- Calls AI API to understand intent (document type, sphere)
- Queries user's files based on parsed intent
- **No document content sent to external APIs**
- Returns response with secure file link

---

## Phase 5: Payments & Premium Features

### 5.1 Stripe Integration
- Subscription management for 3 tiers
- Checkout flow for upgrades
- Customer portal for billing management
- Storage limits enforced based on plan

### 5.2 Storage Enforcement
- Track storage usage per user
- Block uploads when limit reached
- Upgrade prompts when approaching limit

---

## Phase 6: Settings & GDPR Compliance

### 6.1 Settings Tabs
- **Profile**: Name, email, avatar
- **Security**: Change password, master password management
- **Privacy (GDPR)**: Data location info, export data, delete account
- **Subscription**: Current plan, upgrade options, billing history

### 6.2 GDPR Features
- "Export all my data" → ZIP file with all documents + JSON metadata
- "Delete my account" → Confirmation flow, deletes all data
- Access logs viewer
- Data location disclosure (EU servers)

---

## Phase 7: Polish & Alerts

### 7.1 Smart Alerts
- Documents expiring soon (passport, ID card dates)
- Weak passwords (strength score < 50)
- Passwords unchanged for 90+ days
- Missing mandatory documents

### 7.2 Search
- Global search across all document names
- Results grouped by sphere
- Instant filtering as you type

### 7.3 Mobile Responsive
- Sidebar collapses to bottom navigation on mobile
- Touch-friendly file management
- Responsive grid layouts

---

## Design System
- **Primary color**: #3B82F6 (blue)
- **Style**: Modern, premium with subtle shadows
- **Animations**: 200ms smooth transitions
- **Corners**: 8px cards, 6px buttons
- **Icons**: Emoji-based (🔵, 📄, 🔑, etc.)
- **Feel**: Professional, trustworthy - this is a security product

---

## Security Highlights
✅ Row-Level Security on all database tables
✅ Client-side AES-256-GCM password encryption
✅ Signed URLs expire in 5 minutes
✅ Master password never stored (only derived key salt)
✅ No document content sent to external APIs
✅ GDPR-compliant data handling

