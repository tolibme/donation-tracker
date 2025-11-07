# Migration Guide: Vercel Blob to MongoDB

If you have existing data in Vercel Blob and want to migrate to MongoDB, follow these steps.

## Quick Migration (Recommended)

### Step 1: Export from Vercel Blob

1. Go to your Vercel Dashboard → Storage → Blob
2. Download the `donators.json` file
3. Save it locally

### Step 2: Set up MongoDB Atlas

Follow the instructions in [DATABASE_SETUP.md](./DATABASE_SETUP.md) to:
1. Create a MongoDB Atlas account
2. Create a free cluster
3. Get your connection string
4. Add `MONGODB_URI` to Vercel environment variables

### Step 3: Import Data (Option A - Via Admin Panel)

**Easiest method:**

1. Deploy your app with MongoDB configured
2. Go to `/admin` and login
3. Manually add the donators from your exported JSON
4. Done!

### Step 3: Import Data (Option B - Using MongoDB Compass)

**For larger datasets:**

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your MongoDB URI
3. Create database: `warmsteps` (or your chosen name)
4. Create collection: `donators`
5. Import your JSON file:
   - Click "ADD DATA" → "Import JSON or CSV file"
   - Select your `donators.json` file
   - Click "Import"
6. Done!

### Step 3: Import Data (Option C - Using MongoDB Shell)

**For developers:**

1. Install MongoDB Shell: `npm install -g mongosh`
2. Connect to your cluster:
   ```bash
   mongosh "mongodb+srv://username:password@cluster.mongodb.net/warmsteps"
   ```
3. Import data:
   ```javascript
   db.donators.insertMany([
     // Paste your donators array here
   ])
   ```
4. Verify:
   ```javascript
   db.donators.find()
   ```

## Data Format

Your MongoDB documents should have this structure:

```json
{
  "id": 1,
  "name": "John Doe",
  "amount": 45000,
  "date": "2024-11-07",
  "message": "Happy to help!"
}
```

MongoDB will automatically add an `_id` field, but the app will use the `id` field for consistency.

## Clean Up (Optional)

After successful migration:

1. Remove `BLOB_READ_WRITE_TOKEN` from Vercel environment variables
2. Delete the Blob storage from Vercel Dashboard
3. Remove `@vercel/blob` package (already done in the code)

## Verification

1. Visit your deployed site
2. Check if all donators appear correctly
3. Try the admin panel - add/edit/delete should work
4. Verify stats are calculated correctly

## Rollback (If Needed)

If you need to go back to Vercel Blob:

1. Checkout the previous commit before MongoDB migration
2. Reinstall Blob package: `pnpm add @vercel/blob`
3. Add back `BLOB_READ_WRITE_TOKEN` to Vercel
4. Redeploy

## Benefits of MongoDB

After migration, you'll enjoy:

- ✅ **Faster queries** - Real database vs file storage
- ✅ **Better scaling** - Handles growth automatically
- ✅ **More features** - Advanced queries, aggregations, indexes
- ✅ **Industry standard** - Widely supported and documented
- ✅ **Free tier** - 512 MB storage at no cost
- ✅ **No vendor lock-in** - Easy to migrate to any MongoDB host

## Support

Need help with migration? 
- Check [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- Open an issue on GitHub
- Contact via Telegram: [@warmstepdonation](https://t.me/warmstepdonation)
