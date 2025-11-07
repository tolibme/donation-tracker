# Vercel KV Database Setup

This project uses **Vercel KV** for storing donators data in production, while using local JSON files for development.

## 📋 Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- Your project deployed on Vercel

## 🚀 Quick Setup Guide

### Step 1: Install Vercel KV Package

```bash
pnpm add @vercel/kv
```

### Step 2: Create Vercel KV Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your deployed project
3. Click on the **Storage** tab in the top navigation
4. Click **Create Database** button
5. Select **KV** (Key-Value Store)
6. Give it a name: `donation-tracker-kv`
7. Select your preferred region (choose closest to your users)
8. Click **Create**

✅ Vercel will automatically add these environment variables to your project:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### Step 3: Initial Data Migration

You need to migrate your initial donators data from `data/donators.json` to Vercel KV:

#### Option A: Using Vercel KV Dashboard (Easiest)

1. In your Vercel project, go to **Storage** → Select your KV database
2. Click on **Data** tab
3. Click **Set a Key**
4. Set:
   - **Key**: `donators`
   - **Value**: Copy the entire content from your `data/donators.json` file
5. Click **Save**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Set the donators data
vercel kv set donators "$(cat data/donators.json)"
```

#### Option C: Using REST API

```bash
# Get your KV_REST_API_URL and KV_REST_API_TOKEN from Vercel dashboard
# Then run:

curl -X POST "YOUR_KV_REST_API_URL/set/donators" \
  -H "Authorization: Bearer YOUR_KV_REST_API_TOKEN" \
  -d "$(cat data/donators.json)"
```

### Step 4: Deploy

```bash
git add .
git commit -m "Add Vercel KV support"
git push
```

Your app will automatically redeploy and use Vercel KV! 🎉

## 🔄 How It Works

The app automatically detects the environment:

- **Local Development** (`npm run dev`):
  - Uses `data/donators.json` file
  - No KV setup needed
  - Easy to test locally

- **Production** (Vercel):
  - Automatically uses Vercel KV if environment variables are present
  - Falls back to JSON file if KV is not configured (read-only)

## 🧪 Testing Locally with Vercel KV

If you want to test with Vercel KV locally:

1. Create a `.env.local` file in your project root:

```env
KV_URL="your-kv-url"
KV_REST_API_URL="your-rest-api-url"
KV_REST_API_TOKEN="your-token"
KV_REST_API_READ_ONLY_TOKEN="your-read-only-token"
```

2. Get these values from:
   - Vercel Dashboard → Your Project → Storage → Your KV Database → `.env.local` tab
   - Copy all the environment variables

3. Restart your dev server:

```bash
pnpm dev
```

## ✅ Verification

To verify everything is working:

1. Go to your deployed site's admin panel: `https://your-site.vercel.app/admin`
2. Login with your password
3. Try adding a test donator
4. Check if it appears on the main page
5. Verify in Vercel Dashboard → Storage → Data that the `donators` key is updated

## 🔍 Troubleshooting

### Error: "Failed to manage donators"

**Solution**: Make sure you've created the KV database and the environment variables are set.

### Data not persisting

**Solution**: 
1. Check Vercel Dashboard → Storage → Your KV Database → Data
2. Verify the `donators` key exists with valid JSON data
3. Redeploy your application

### Local development not working

**Solution**: 
- Make sure `data/donators.json` exists
- Check file permissions
- Try deleting `.next` folder and rebuilding

## 💰 Pricing

Vercel KV Free Tier includes:
- 256 MB storage
- 3000 commands per day
- More than enough for this donation tracker!

## 📚 Resources

- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Vercel KV Quickstart](https://vercel.com/docs/storage/vercel-kv/quickstart)
- [@vercel/kv Package](https://www.npmjs.com/package/@vercel/kv)

