# Vercel Blob Storage Setup

This project uses **Vercel Blob** for storing donators data in production, while using local JSON files for development.

## 📋 Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- Your project deployed on Vercel

## 🚀 Quick Setup Guide

### Step 1: Install Vercel Blob Package

```bash
pnpm add @vercel/blob
```

✅ Already done in this project!

### Step 2: Create Vercel Blob Store

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your deployed project: **donation-tracker**
3. Click on the **Storage** tab in the top navigation
4. Click **Create Store** or **Create Database**
5. Select **Blob** (Fast object storage)
6. Give it a name: `donation-tracker-blob`
7. Click **Create**

✅ Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` environment variable to your project!

### Step 3: Upload Initial Data

After creating the Blob store, you need to upload your initial donators data.

#### Option A: Using Admin Panel (Easiest)

The first time you add a donator through the admin panel in production, it will automatically create the blob file with your data.

1. Go to your deployed site: `https://your-site.vercel.app/admin`
2. Login with password: `warmsteps2025`
3. Add your first donator
4. The system will automatically create `donators.json` in Blob storage

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables (including BLOB_READ_WRITE_TOKEN)
vercel env pull .env.local
```

Then you can manually upload via the Vercel Blob dashboard.

#### Option C: Pre-populate via Dashboard

1. In your Blob store dashboard, look for upload/create file option
2. Create a file named: `donators.json`
3. Copy the content from your local `data/donators.json`
4. Save

### Step 4: Verify Setup

1. Go to **Settings** → **Environment Variables**
2. Confirm `BLOB_READ_WRITE_TOKEN` is present
3. Your app should auto-redeploy with the new environment variable

### Step 5: Test It!

1. Visit: `https://your-site.vercel.app/admin`
2. Login with your admin password
3. Try adding/editing/deleting a donator
4. Check the main page to see updated stats

## 🔄 How It Works

The app automatically detects the environment:

- **Local Development** (`npm run dev`):
  - Uses `data/donators.json` file
  - No Blob setup needed
  - Easy to test locally

- **Production** (Vercel):
  - Automatically uses Vercel Blob if `BLOB_READ_WRITE_TOKEN` is present
  - Creates/updates `donators.json` blob file
  - Falls back to JSON file if Blob is not configured (read-only)

## 🧪 Testing Locally with Vercel Blob

If you want to test with Vercel Blob locally:

1. Create a `.env.local` file in your project root:

```env
BLOB_READ_WRITE_TOKEN="your-token-here"
```

2. Get this value from:
   - Vercel Dashboard → Your Project → Storage → Your Blob Store → `.env.local` tab
   - Copy the `BLOB_READ_WRITE_TOKEN` variable

3. Restart your dev server:

```bash
pnpm dev
```

## ✅ Verification

To verify everything is working:

1. Go to your deployed site's admin panel: `https://your-site.vercel.app/admin`
2. Login with password: `warmsteps2025`
3. Try adding a test donator
4. Check if it appears on the main page with updated stats
5. Verify in Vercel Dashboard → Storage → Blob → Browse files that `donators.json` exists

## 🔍 Troubleshooting

### Error: "Vercel Blob is not configured"

**Solution**: 
1. Make sure you've created the Blob store in Vercel Dashboard
2. Check that `BLOB_READ_WRITE_TOKEN` environment variable exists
3. Redeploy your application after creating the Blob store

### Data not persisting

**Solution**: 
1. Check Vercel Dashboard → Storage → Your Blob Store → Browse
2. Verify `donators.json` file exists
3. Check the file content is valid JSON
4. Try deleting and re-adding through admin panel

### Local development not working

**Solution**: 
- Make sure `data/donators.json` exists
- Check file permissions
- Try deleting `.next` folder and rebuilding: `pnpm build`

### 503 Service Unavailable

**Solution**:
- This means Blob storage is not configured
- Follow Step 2 to create Blob store
- Wait for auto-redeploy or manually redeploy

## 💰 Pricing

Vercel Blob Free Tier (Hobby) includes:
- **500 MB storage**
- **1 GB bandwidth per month**
- More than enough for this donation tracker!

For reference:
- Each donator entry is ~100 bytes
- You can store thousands of donators easily
- JSON file typically < 1 MB even with hundreds of donators

## 📚 Resources

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Blob Quickstart](https://vercel.com/docs/storage/vercel-blob/quickstart)
- [@vercel/blob Package](https://www.npmjs.com/package/@vercel/blob)

