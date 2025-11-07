# Database Configuration Quick Reference

## Database Naming

### Recommended Configuration

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=warmsteps
```

### Default Structure

When using **Vercel's MongoDB Integration**:
- **Database Name:** `warmsteps` (recommended) or your custom choice
- **Collection Name:** `donators` (automatically created)
- **Environment Variable:** `MONGODB_URI` (auto-added by Vercel)
- **Optional Variable:** `MONGODB_DB` (defaults to `warmsteps` if not set)

## Vercel Integration Steps

1. **Go to Vercel Dashboard**
   - Select your project
   - Click "Storage" tab

2. **Add MongoDB**
   - Click "Create Database"
   - Select "MongoDB Atlas" from integrations
   - Click "Continue"

3. **Configuration**
   - Vercel will prompt you to choose/create a cluster
   - When asked for database name, use: **`warmsteps`**
   - Vercel automatically adds `MONGODB_URI` to your project

4. **Optional Customization**
   - If you want a different database name, add environment variable:
   - Name: `MONGODB_DB`
   - Value: Your custom database name

5. **Deploy**
   - Push code or redeploy
   - Database is ready!

## Database Structure

```
MongoDB Atlas Cluster
└── warmsteps (database)
    └── donators (collection)
        ├── { id: 1, name: "John", amount: 45000, ... }
        ├── { id: 2, name: "Jane", amount: 50000, ... }
        └── ...
```

## Why "warmsteps"?

- ✅ Short and memorable (9 characters)
- ✅ Matches the project name
- ✅ Professional and descriptive
- ✅ Easy to type and reference
- ✅ No special characters or spaces
- ✅ Follows MongoDB naming best practices

## Alternative Names (if you prefer)

Good alternatives:
- `warmsteps-prod` - For production
- `warm-steps` - With hyphen
- `donations` - Generic
- `charity-tracker` - Descriptive

Avoid:
- ❌ `donation-tracker` - Too long
- ❌ `test` or `dev` - Not descriptive for production
- ❌ Names with spaces or special characters

## Viewing Your Data

**MongoDB Atlas Dashboard:**
1. Login to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Browse Collections"
3. Navigate to `warmsteps` → `donators`
4. View/edit/delete documents

**MongoDB Compass:**
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect with your URI
3. Browse `warmsteps` database
4. View collections visually

## Environment Variables Summary

### Production (Vercel)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=warmsteps  # Optional, defaults to 'warmsteps'
```

### Local Development (.env.local)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=warmsteps  # Optional
```

### Testing/Staging
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=warmsteps-staging  # Different database for testing
```

## Code Reference

The database name is configured in `lib/db.ts`:

```typescript
const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.MONGODB_DB || 'warmsteps'  // Defaults to 'warmsteps'
const COLLECTION_NAME = 'donators'
```

## Need Help?

- See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for full setup guide
- See [MIGRATION.md](./MIGRATION.md) for migration from Vercel Blob
- Check [README.md](./README.md) for overview
