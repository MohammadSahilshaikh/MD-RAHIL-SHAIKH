# 🚀 Deployment Guide — Rahil's Portfolio

## Overview
Is guide mein Supabase (free database) + Vercel (free hosting) setup ka pura process hai.
**Koi credit card nahi chahiye. Sab kuch free hai.**

---

## Step 1: Supabase Setup (Database)

### 1.1 Account Banao
1. [supabase.com](https://supabase.com) pe jao
2. **"Start your project"** click karo
3. GitHub ya email se sign up karo

### 1.2 New Project Banao
1. **"New project"** click karo
2. Name: `rahil-portfolio` (koi bhi naam)
3. Database password: koi strong password set karo (save karke rakho)
4. Region: **Southeast Asia (Singapore)** — India ke sabse kareeb
5. **"Create new project"** click karo (2-3 minute lagenge)

### 1.3 Table Banao
1. Left sidebar mein **"Table Editor"** click karo
2. **"New table"** click karo
3. Fill karo:
   - **Name:** `portfolio_data`
   - **Enable Row Level Security (RLS):** OFF rakho (uncheck karo)
4. Columns add karo:

| Column Name  | Type      | Default Value           | Primary Key |
|-------------|-----------|------------------------|-------------|
| `id`        | `int8`    | —                      | ✅ Yes       |
| `data`      | `jsonb`   | `'{}'`                 | No          |
| `updated_at`| `timestamptz` | `now()`           | No          |

5. **"Save"** click karo

### 1.4 API Keys Copy Karo
1. Left sidebar mein **Settings (⚙)** → **API** pe jao
2. Ye do cheezein copy karke safe jagah rakho:
   - **Project URL** (e.g. `https://abcxyz.supabase.co`)
   - **anon / public** key (lamba string hai)

---

## Step 2: GitHub Pe Code Upload Karo

### 2.1 Git Install Karo (agar nahi hai)
[git-scm.com](https://git-scm.com) se download karo aur install karo.

### 2.2 GitHub Account Banao
[github.com](https://github.com) pe sign up karo.

### 2.3 Repository Banao
1. GitHub pe **"New repository"** click karo
2. Name: `rahil-portfolio`
3. **Public** rakho (Vercel free tier ke liye)
4. **"Create repository"** click karo

### 2.4 Code Push Karo
PowerShell mein ye commands run karo:

```powershell
cd c:\portfolio\rahil
git init
git add .
git commit -m "Initial portfolio with cloud sync"
git branch -M main
git remote add origin https://github.com/TUMHARA_USERNAME/rahil-portfolio.git
git push -u origin main
```
> `TUMHARA_USERNAME` ki jagah apna GitHub username daalo

---

## Step 3: Vercel Pe Deploy Karo

### 3.1 Vercel Account Banao
1. [vercel.com](https://vercel.com) pe jao
2. **"Sign Up"** → **"Continue with GitHub"** click karo

### 3.2 Project Import Karo
1. Dashboard pe **"Add New → Project"** click karo
2. `rahil-portfolio` repository select karo
3. **"Import"** click karo
4. Framework Preset: **Other** (ya auto-detect)
5. Root Directory: leave as is (`.`)

### 3.3 Environment Variables Set Karo ⚠️ IMPORTANT
"Environment Variables" section mein ye **3 variables** add karo:

| Key                | Value                              |
|-------------------|------------------------------------|
| `SUPABASE_URL`    | Step 1.4 ka Project URL            |
| `SUPABASE_ANON_KEY` | Step 1.4 ka anon/public key     |
| `ADMIN_PASSWORD`  | `admin123` (ya jo bhi password chahiye) |

6. **"Deploy"** click karo!

### 3.4 Site Live! 🎉
Kuch minute mein site live ho jayegi:
`https://rahil-portfolio.vercel.app` (ya kuch aisa URL)

---

## Step 4: Pehli Baar Data Save Karo

1. Apni live site pe jao: `https://rahil-portfolio.vercel.app/admin`
2. Password enter karo (jo Step 3.3 mein set kiya)
3. Sab content fill karo (photo, CV, experience, etc.)
4. **"Save Changes"** click karo
5. "✅ Saved & Synced across all devices!" dikhega

Ab **duniya mein kahin se bhi** site khologe — same content dikhega! ✅

---

## Future Updates Kaise Karo

### Content Update (Admin Panel se):
1. `https://tumhara-site.vercel.app/admin` kholo
2. Changes karo → **Save Changes** click karo
3. Done! Turant sab ko dikhega.

### Code Update (New Features):
```powershell
cd c:\portfolio\rahil
git add .
git commit -m "Update: kya change kiya"
git push
```
Vercel automatically redeploy kar dega.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cloud sync: ..." error aaya save pe | Supabase URL/Key check karo Vercel mein |
| Site blank aa rahi hai | Browser console (F12) mein error dekho |
| Admin password kaam nahi kar raha | Vercel → Settings → Environment Variables mein `ADMIN_PASSWORD` check karo |
| Table not found error | Step 1.3 dobara karo — `portfolio_data` table exact name hona chahiye |
