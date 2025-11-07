# 💖 Warm Steps - Donation Tracker# 💖 Warm Steps - Donation Tracker# 💖 Warm Steps for Kind Hearts - Donation Tracker



A beautiful, multilingual donation tracking platform built with Next.js 16, TypeScript, and MongoDB Atlas.



## ✨ FeaturesA beautiful, multilingual donation tracking platform built with Next.js 16, TypeScript, and Vercel Blob storage.A beautiful, multilingual donation tracking website built with Next.js to help raise funds for providing winter slippers to 187 grandparents.



- **Real-time Donation Tracking** - Automatically calculates progress and statistics

- **Multi-language Support** - English, Uzbek (O'zbekcha), and Russian (Русский)

- **Admin Panel** - Secure password-protected interface for managing donations## ✨ Features## ✨ Features

- **Click-to-Copy Card Numbers** - Easy donation process

- **Responsive Design** - Works perfectly on all devices

- **MongoDB Atlas** - Free, fast, and scalable cloud database

- **Local Development** - Uses JSON files for easy local testing- **Real-time Donation Tracking** - Automatically calculates progress and statistics- **Real-time Progress Tracking**: Visual progress bar showing donation goals and current status



## 🚀 Quick Start- **Multi-language Support** - English, Uzbek (O'zbekcha), and Russian (Русский)- **Multilingual Support**: Full support for 3 languages



### Prerequisites- **Admin Panel** - Secure password-protected interface for managing donations  - 🇬🇧 English



- Node.js 18+ installed- **Click-to-Copy Card Numbers** - Easy donation process  - 🇺🇿 O'zbekcha (Uzbek)

- pnpm package manager (`npm install -g pnpm`)

- **Responsive Design** - Works perfectly on all devices  - 🇷🇺 Русский (Russian)

### Installation

- **Vercel Blob Storage** - Production-ready cloud storage- **Click-to-Copy Card Numbers**: Easy copying of donation card numbers with toast notifications

1. **Clone the repository**

   ```bash- **Local Development** - Uses JSON files for easy local testing- **Donators Hall of Fame**: Dedicated page showcasing all generous donors

   git clone https://github.com/tolibme/donation-tracker.git

   cd donation-tracker- **Responsive Design**: Works beautifully on mobile, tablet, and desktop

   ```

## 🚀 Quick Start- **Dark/Light Theme Support**: Integrated theme provider for user preference

2. **Install dependencies**

   ```bash- **Analytics Integration**: Vercel Analytics for tracking visitor metrics

   pnpm install

   ```### Prerequisites



3. **Run development server**## 🚀 Tech Stack

   ```bash

   pnpm dev- Node.js 18+ installed

   ```

- pnpm package manager (`npm install -g pnpm`)- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)

4. **Open in browser**

   ```- **Language**: TypeScript

   http://localhost:3000

   ```### Installation- **Styling**: Tailwind CSS



## 🗄️ Database Setup (Production)- **UI Components**: Custom components built with Radix UI



### Recommended Database Name: `warmsteps`1. **Clone the repository**- **Icons & Emojis**: Unicode emojis for universal support



For production deployment on Vercel with MongoDB Atlas:   ```bash- **Package Manager**: pnpm



**Option 1: Vercel Integration (Easiest)**   git clone https://github.com/tolibme/donation-tracker.git- **Analytics**: Vercel Analytics

1. Go to Vercel Dashboard → Your Project → Storage

2. Click "Create Database" → Select "MongoDB Atlas"   cd donation-tracker

3. Follow Vercel's setup wizard

4. Choose database name: **`warmsteps`**   ```## 📦 Installation

5. Vercel automatically sets `MONGODB_URI` for you



**Option 2: Manual Setup**

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)2. **Install dependencies**1. **Clone the repository**

2. Create Free M0 Cluster (512 MB)

3. Get connection string   ```bash   ```bash

4. Add to Vercel environment variables:

   - `MONGODB_URI` - Your connection string (required)   pnpm install   git clone https://github.com/tolibme/donation-tracker.git

   - `MONGODB_DB` - Database name (optional, defaults to `warmsteps`)

   ```   cd donation-tracker

**See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed step-by-step instructions.**

   ```

## 🔐 Admin Panel

3. **Run development server**

Access the admin panel at `/admin`

   ```bash2. **Install dependencies**

**Default Password:** `warmsteps2025`

   pnpm dev   ```bash

To change the password, edit `lib/auth.ts`:

   ```   pnpm install

```typescript

export async function validateAdminPassword(password: string): Promise<boolean> {   ```

  return password === 'YOUR_NEW_PASSWORD'

}4. **Open in browser**

```

   ```3. **Run the development server**

### Admin Features

   http://localhost:3000   ```bash

- ✅ Add new donators

- ✅ Edit existing donations   ```   pnpm dev

- ✅ Delete donations

- ✅ Real-time stats (total collected, donator count, slippers funded)   ```



## 📁 Project Structure## 🗄️ Database Setup (Production)



```4. **Open your browser**

donation-tracker/

├── app/For production deployment on Vercel, you need to set up Vercel Blob storage:   Navigate to [http://localhost:3000](http://localhost:3000)

│   ├── page.tsx              # Main donation page

│   ├── layout.tsx            # Root layout

│   ├── admin/

│   │   └── page.tsx          # Admin panel1. Go to [Vercel Dashboard](https://vercel.com/dashboard)## 📁 Project Structure

│   ├── donators/

│   │   └── page.tsx          # Donators list page2. Select your project

│   └── api/

│       ├── stats/route.ts    # Stats API endpoint3. Click **Storage** → **Create Store**```

│       ├── donators/route.ts # Public donators API

│       └── admin/donators/route.ts # Admin CRUD API4. Select **Blob** (Fast object storage)donation-tracker/

├── components/

│   ├── LanguageSwitcher.tsx  # Language selector5. Name it `donation-tracker-blob`├── app/

│   └── ui/                   # UI components

├── contexts/6. Click **Create**│   ├── api/

│   └── LanguageContext.tsx   # Language state management

├── lib/│   │   └── donators/          # API route for fetching donators

│   ├── i18n.ts              # Translations (EN, UZ, RU)

│   ├── db.ts                # MongoDB database layer✅ `BLOB_READ_WRITE_TOKEN` will be automatically added to your environment variables.│   ├── donators/              # Donators page

│   └── auth.ts              # Admin authentication

├── data/│   ├── layout.tsx             # Root layout with providers

│   └── donators.json        # Local development data

└── hooks/**See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.**│   ├── page.tsx               # Main donation tracker page

    └── use-toast.ts         # Toast notifications hook

```│   └── globals.css            # Global styles



## 🌍 Translations## 🔐 Admin Panel├── components/



The app supports 3 languages with complete translations:│   ├── ui/                    # Reusable UI components



- **English** (en)Access the admin panel at `/admin`│   ├── LanguageSwitcher.tsx   # Language switcher dropdown

- **Uzbek** (uz)

- **Russian** (ru)│   └── theme-provider.tsx     # Theme context provider



To add or modify translations, edit `lib/i18n.ts`.**Default Password:** `warmsteps2025`├── contexts/



## 🎨 Tech Stack│   └── LanguageContext.tsx    # Language context and hook



- **Framework:** Next.js 16 (App Router)To change the password, edit `lib/auth.ts`:├── data/

- **Language:** TypeScript

- **Database:** MongoDB Atlas (cloud) / JSON (local)│   └── donators.json          # Donators data storage

- **Styling:** Tailwind CSS

- **UI Components:** Radix UI```typescript├── lib/

- **Analytics:** Vercel Analytics

- **Deployment:** Vercelexport async function validateAdminPassword(password: string): Promise<boolean> {│   ├── i18n.ts                # Translation strings



## 📊 How It Works  return password === 'YOUR_NEW_PASSWORD'│   └── utils.ts               # Utility functions



### Local Development}├── hooks/

- Uses `data/donators.json` for storing donation data

- No database setup needed```│   └── use-toast.ts           # Toast notification hook

- Hot reload enabled

└── public/                    # Static assets

### Production (Vercel)

- Automatically detects MongoDB Atlas environment### Admin Features```

- Database: `warmsteps` (or custom name via `MONGODB_DB`)

- Collection: `donators`

- Scales automatically with MongoDB Atlas

- Falls back to JSON if MongoDB not configured- ✅ Add new donators## 🌍 Adding/Editing Translations



## 🚢 Deployment- ✅ Edit existing donations



### Deploy to Vercel- ✅ Delete donationsEdit the translation file at `lib/i18n.ts`:



1. **Push to GitHub**- ✅ Real-time stats (total collected, donator count, slippers funded)

   ```bash

   git add .```typescript

   git commit -m "Initial commit"

   git push origin main## 📁 Project Structureexport const translations: Record<Language, Translations> = {

   ```

  en: {

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)```    title: "Warm Steps for Kind Hearts",

   - Click "New Project"

   - Import your GitHub repositorydonation-tracker/    // ... more translations

   - Click "Deploy"

├── app/  },

3. **Set up MongoDB Atlas**

   - Use Vercel's MongoDB integration (easiest)│   ├── page.tsx              # Main donation page  uz: {

   - Or follow manual setup in [DATABASE_SETUP.md](./DATABASE_SETUP.md)

   - Recommended database name: **`warmsteps`**│   ├── layout.tsx            # Root layout    title: "Mehribonlar uchun Issiq Qadamlar",



4. **Done!** 🎉│   ├── admin/    // ... more translations

   - Your site is live

   - Admin panel works at `your-site.vercel.app/admin`│   │   └── page.tsx          # Admin panel  },



## 🔧 Development│   ├── donators/  ru: {



### Available Scripts│   │   └── page.tsx          # Donators list page    title: "Теплые шаги для добрых сердец",



```bash│   └── api/    // ... more translations

pnpm dev      # Start development server

pnpm build    # Build for production│       ├── stats/route.ts    # Stats API endpoint  }

pnpm start    # Start production server

pnpm lint     # Run ESLint│       ├── donators/route.ts # Public donators API}

```

│       └── admin/donators/route.ts # Admin CRUD API```

### Environment Variables

├── components/

For local development with MongoDB Atlas, create `.env.local`:

│   ├── LanguageSwitcher.tsx  # Language selector## 📝 Managing Donators

```env

# Required: Your MongoDB Atlas connection string│   └── ui/                   # UI components

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

├── contexts/### Admin Panel (Recommended) 🔐

# Optional: Custom database name (defaults to 'warmsteps')

MONGODB_DB=warmsteps│   └── LanguageContext.tsx   # Language state management

```

├── lib/The easiest way to manage donators is through the admin panel:

Get the connection string from MongoDB Atlas dashboard or Vercel's integration.

│   ├── i18n.ts              # Translations (EN, UZ, RU)

## 📝 Database Naming Convention

│   ├── db.ts                # Database abstraction layer1. **Access**: Navigate to `/admin` or click the small dot (•) at the bottom of the homepage

**Recommended database name:** `warmsteps`

│   └── auth.ts              # Admin authentication2. **Login**: Enter password (default: `warmsteps2025`)

Why?

- ✅ Short and memorable├── data/3. **Add/Edit/Delete**: Use the intuitive interface to manage donators

- ✅ Matches project theme

- ✅ Easy to type│   └── donators.json        # Local development data4. **Auto-Update**: All stats (collected amount, slippers funded, progress) automatically update on the main page!

- ✅ Professional

└── hooks/

The database will contain:

- **Database:** `warmsteps` (or your custom name)    └── use-toast.ts         # Toast notifications hook**Features:**

- **Collection:** `donators`

- **Documents:** Individual donation records```- ✅ Password protected



## 🆚 Why MongoDB?- ✅ Add new donators with name, amount, date, and optional message



**MongoDB Atlas Benefits:**## 🌍 Translations- ✅ Edit existing donators

- ✅ **Free tier** 512 MB storage

- ✅ **True database** with querying and indexing- ✅ Delete donators with confirmation

- ✅ **Faster** than blob storage for queries

- ✅ **Scalable** - easily upgrade when neededThe app supports 3 languages with complete translations:- ✅ Real-time stats dashboard

- ✅ **Industry standard** - used by millions of apps

- ✅ **Better features** - transactions, aggregations, etc.- ✅ Automatic calculation of total donations and progress

- ✅ **No vendor lock-in** - can migrate anywhere

- ✅ **Vercel integration** - One-click setup- **English** (en)



## 🤝 Contributing- **Uzbek** (uz)**Change Admin Password**: Edit `lib/auth.ts`:



Contributions are welcome! Please feel free to submit a Pull Request.- **Russian** (ru)```typescript



## 📝 Licenseexport const ADMIN_PASSWORD = "your-secure-password-here"



This project is open source and available under the MIT License.To add or modify translations, edit `lib/i18n.ts`.```



## 💬 Support



- **Telegram:** [@warmstepdonation](https://t.me/warmstepdonation)## 🎨 Tech Stack### Manual Method (Alternative)

- **Issues:** [GitHub Issues](https://github.com/tolibme/donation-tracker/issues)



## 🙏 Acknowledgments

- **Framework:** Next.js 16 (App Router)To manually add donators, edit `data/donators.json`:

Built with ❤️ for the Warm Steps charity initiative to provide winter slippers for those in need.

- **Language:** TypeScript

---

- **Styling:** Tailwind CSS```json

**Made with Next.js, MongoDB, and Vercel** 🚀

- **UI Components:** Radix UI[

- **Storage:** Vercel Blob (production) / JSON (local)  {

- **Analytics:** Vercel Analytics    "id": 1,

- **Deployment:** Vercel    "name": "John Doe",

    "amount": 45000,

## 📊 How It Works    "date": "2025-11-03",

    "message": "Optional message from the donor"

### Local Development  }

- Uses `data/donators.json` for storing donation data]

- No database setup needed```

- Hot reload enabled

**Fields:**

### Production (Vercel)- `id`: Unique identifier (number) - auto-generated in admin panel

- Automatically detects Vercel Blob environment- `name`: Donor's name (string)

- Stores data in `donators.json` blob file- `amount`: Donation amount in UZS (number)

- Scales automatically- `date`: Donation date in YYYY-MM-DD format (string)

- Falls back to JSON if Blob not configured- `message`: Optional message from donor (string, optional)



## 🚢 Deployment## 🔄 How Progress Updates Work



### Deploy to VercelThe system **automatically calculates** all statistics from the donators data:



1. **Push to GitHub**1. **Total Collected**: Sum of all donation amounts in `donators.json`

   ```bash2. **Progress Percentage**: `(collected / goal) × 100`

   git add .3. **Slippers Funded**: `Math.floor(collected / 45000)`

   git commit -m "Initial commit"4. **Slippers Remaining**: `187 - slippersFunded`

   git push origin main

   ```**No manual updates needed!** When you add/edit/delete a donator through the admin panel, everything updates automatically:

- Main page progress bar

2. **Import to Vercel**- Collected amount display

   - Go to [vercel.com](https://vercel.com)- Slippers funded counter

   - Click "New Project"- Remaining slippers count

   - Import your GitHub repository

   - Click "Deploy"## 🎨 Customization



3. **Set up Vercel Blob**### Card Numbers

   - Follow instructions in [DATABASE_SETUP.md](./DATABASE_SETUP.md)

Edit the card number in `app/page.tsx`:

4. **Done!** 🎉

   - Your site is live```tsx

   - Admin panel works at `your-site.vercel.app/admin`<div onClick={() => copyToClipboard("8600612227452165", "Uzcard")}>

  <p>8600 6122 2745 2165</p>

## 🔧 Development</div>

```

### Available Scripts

### Telegram Contact

```bash

pnpm dev      # Start development serverUpdate the Telegram link in both `app/page.tsx` and translation files:

pnpm build    # Build for production

pnpm start    # Start production server```tsx

pnpm lint     # Run ESLint<a href="https://t.me/warmstepdonation">

```  Telegram @warmstepdonation

</a>

### Environment Variables```



For local development with Vercel Blob, create `.env.local`:### Theme Colors



```envCustomize colors in `app/globals.css` using CSS variables:

BLOB_READ_WRITE_TOKEN=your_token_here

``````css

:root {

Get the token from Vercel Dashboard → Storage → Your Blob Store → `.env.local` tab  --primary: ...;

  --secondary: ...;

## 🤝 Contributing  --accent: ...;

}

Contributions are welcome! Please feel free to submit a Pull Request.```



## 📝 License## 📱 Responsive Breakpoints



This project is open source and available under the MIT License.- **Mobile**: < 640px

- **Tablet**: 640px - 1024px

## 💬 Support- **Desktop**: > 1024px



- **Telegram:** [@warmstepdonation](https://t.me/warmstepdonation)## 🚀 Deployment

- **Issues:** [GitHub Issues](https://github.com/tolibme/donation-tracker/issues)

### Vercel (Recommended)

## 🙏 Acknowledgments

#### Step 1: Set Up Vercel KV Database

Built with ❤️ for the Warm Steps charity initiative to provide winter slippers for those in need.

**Important:** To use the admin panel in production, you need to set up Vercel KV database (it's free!):

---

1. Push your code to GitHub

**Made with Next.js and Vercel** 🚀2. Import your repository on [Vercel](https://vercel.com)

3. After deployment, go to your project dashboard
4. Navigate to **Storage** tab → **Create Database**
5. Select **KV (Key-Value Store)**
6. Name it (e.g., "donation-tracker-kv")
7. Click **Create**

Vercel will automatically add the required environment variables to your project.

#### Step 2: Initial Data Migration (One-time)

After setting up KV, you need to migrate your initial data from `data/donators.json`:

1. Go to the **Storage** tab in your Vercel project
2. Open your KV database
3. Use the **Data Browser** or **CLI** to set the initial data:
   - Key: `donators`
   - Value: Copy the content from `data/donators.json`

Or use the Vercel KV REST API to set initial data.

#### How It Works

- **Local Development**: Uses `data/donators.json` file (no setup needed)
- **Production (Vercel)**: Automatically uses Vercel KV database
- The code detects the environment and switches storage methods automatically

For detailed instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)

### Manual Deployment

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

- **Telegram**: [@warmstepdonation](https://t.me/warmstepdonation)
- **Repository**: [https://github.com/tolibme/donation-tracker](https://github.com/tolibme/donation-tracker)

## 🙏 Acknowledgments

- Built with ❤️ for helping grandparents stay warm this winter
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Special thanks to all donors and contributors

---

Made with 💖 by the Warm Steps team
