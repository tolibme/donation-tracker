# MongoDB Atlas Setup

This project uses **MongoDB Atlas** for storing donators data in production, while using local JSON files for development.

## 📋 Prerequisites

- A [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (free)
- Your project deployed on Vercel

## 🚀 Quick Setup Guide

### Method 1: Using Vercel's MongoDB Integration (Easiest)

**Vercel has a direct integration with MongoDB Atlas!**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **donation-tracker** project
3. Go to **Storage** tab
4. Click **"Create Database"** or **"Connect Store"**
5. Select **"MongoDB Atlas"** from the marketplace
6. Click **"Continue"** and follow the prompts
7. Vercel will automatically:
   - Set up MongoDB Atlas cluster
   - Add `MONGODB_URI` environment variable
   - Configure everything for you
8. Choose database name: **`warmsteps`** (recommended)
9. Done! No manual setup needed! 🎉

### Method 2: Manual MongoDB Atlas Setup

If you prefer to set it up manually or already have a MongoDB Atlas account:

### Step 1: Create MongoDB Atlas Account

**Note:** Skip this if you used Vercel's integration above.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Free Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
   - 512 MB storage
   - Shared RAM
   - Perfect for this project!
3. Select a **Cloud Provider & Region** (choose closest to your users)
4. Name your cluster (e.g., `donation-tracker`)
5. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create Database User

1. In the **Security** section, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username: `admin` (or any name you prefer)
5. Click **"Autogenerate Secure Password"** and **SAVE IT**
6. Set permissions to **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Configure Network Access

1. Go to **"Network Access"** in Security section
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This is safe for Vercel deployments
   - Or add specific Vercel IPs if you prefer
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go back to **"Database"** view
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Choose **"Driver: Node.js"** and **"Version: 5.5 or later"**
5. Copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` with your database username
7. Replace `<password>` with your database password
8. The final connection string should look like:
   ```
   mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Add to Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **donation-tracker** project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name:** `MONGODB_URI`
   - **Value:** Your connection string from Step 5
   - **Environment:** Production, Preview, Development (select all)
5. **Optional:** Add database name (if you want to customize it):
   - **Name:** `MONGODB_DB`
   - **Value:** `warmsteps` (or any name you prefer)
   - **Environment:** Production, Preview, Development (select all)
6. Click **"Save"**

**Note:** If you don't set `MONGODB_DB`, it defaults to `warmsteps`.

### Step 7: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Or just push a new commit to trigger auto-deploy

### Step 8: Test It!

1. Visit your deployed site: `https://your-site.vercel.app/admin`
2. Login with password: `warmsteps2025`
3. Try adding a test donator
4. Check if it appears on the main page
5. Verify in MongoDB Atlas:
   - Go to **"Browse Collections"**
   - You should see `warmsteps` database (or your custom name)
   - With `donators` collection

## 🔄 How It Works

The app automatically detects the environment:

- **Local Development** (`npm run dev`):
  - Uses `data/donators.json` file
  - No MongoDB setup needed
  - Easy to test locally

- **Production** (Vercel):
  - Automatically uses MongoDB Atlas if `MONGODB_URI` is present
  - Stores data in cloud database
  - Scales automatically
  - Falls back to JSON file if MongoDB is not configured (read-only)

## 🧪 Testing Locally with MongoDB

If you want to test with MongoDB locally:

1. Create a `.env.local` file in your project root:

```env
MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

2. Restart your dev server:

```bash
pnpm dev
```

Now your local development will use MongoDB Atlas instead of the JSON file.

## 📊 MongoDB Atlas Dashboard

To view your data:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click on your cluster
3. Click **"Browse Collections"**
4. Navigate to `warmsteps` → `donators` (or your custom database name)
5. You can view, edit, and delete documents here

## ✅ Verification

To verify everything is working:

1. Go to your deployed site's admin panel: `https://your-site.vercel.app/admin`
2. Login with password: `warmsteps2025`
3. Try adding a test donator
4. Check if it appears on the main page with updated stats
5. Verify in MongoDB Atlas dashboard that the document was created

## 🔍 Troubleshooting

### Error: "Database not configured"

**Solution**: 
1. Make sure you've created the MongoDB Atlas cluster
2. Check that `MONGODB_URI` environment variable exists in Vercel
3. Verify the connection string is correct
4. Redeploy your application after adding the variable

### Error: "MongoNetworkError" or "Connection refused"

**Solution**:
1. Check **Network Access** in MongoDB Atlas
2. Make sure you added 0.0.0.0/0 or Vercel's IPs
3. Wait a few minutes for changes to propagate

### Error: "Authentication failed"

**Solution**:
1. Double-check your username and password in the connection string
2. Make sure you created a database user in MongoDB Atlas
3. Verify the password doesn't contain special characters that need URL encoding
   - If it does, use URL encoding (e.g., `@` becomes `%40`)

### Data not persisting

**Solution**: 
1. Check MongoDB Atlas → Browse Collections
2. Verify the `warmsteps` database exists (or your custom database name)
3. Check the `donators` collection has documents
4. Look at Vercel Function Logs for any errors

### Local development not working

**Solution**: 
- Make sure `data/donators.json` exists
- Check file permissions
- Try deleting `.next` folder and rebuilding: `pnpm build`

## 💰 Pricing

MongoDB Atlas Free Tier (M0) includes:
- **512 MB storage**
- **Shared RAM**
- **Shared vCPU**
- **No credit card required**
- More than enough for this donation tracker!

For reference:
- Each donator document is ~100-150 bytes
- You can store thousands of donators easily
- Free tier supports up to 512 MB

## 🔒 Security Best Practices

1. **Never commit** your `.env.local` file to Git
2. Use **strong passwords** for database users
3. Regularly **rotate** your database passwords
4. Monitor **database access logs** in Atlas
5. Enable **2FA** on your MongoDB Atlas account

## 📚 Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/)
- [Connection String Format](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [MongoDB Atlas Free Tier](https://www.mongodb.com/pricing)

## 🆚 Why MongoDB vs Vercel Blob?

**MongoDB Atlas Benefits:**
- ✅ **True database** with querying, indexing, aggregation
- ✅ **Free tier** 512 MB (vs Blob's 500 MB)
- ✅ **Faster** for complex queries
- ✅ **Better** for scaling
- ✅ **More features** (transactions, aggregations, etc.)
- ✅ **Industry standard** database
- ✅ **No vendor lock-in** - can migrate anywhere

---

**Need Help?** Open an issue on GitHub or contact support!
