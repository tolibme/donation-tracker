# 💖 Warm Steps - Donation Tracker# 💖 Warm Steps for Kind Hearts - Donation Tracker



A beautiful, multilingual donation tracking platform built with Next.js 16, TypeScript, and Vercel Blob storage.A beautiful, multilingual donation tracking website built with Next.js to help raise funds for providing winter slippers to 187 grandparents.



## ✨ Features## ✨ Features



- **Real-time Donation Tracking** - Automatically calculates progress and statistics- **Real-time Progress Tracking**: Visual progress bar showing donation goals and current status

- **Multi-language Support** - English, Uzbek (O'zbekcha), and Russian (Русский)- **Multilingual Support**: Full support for 3 languages

- **Admin Panel** - Secure password-protected interface for managing donations  - 🇬🇧 English

- **Click-to-Copy Card Numbers** - Easy donation process  - 🇺🇿 O'zbekcha (Uzbek)

- **Responsive Design** - Works perfectly on all devices  - 🇷🇺 Русский (Russian)

- **Vercel Blob Storage** - Production-ready cloud storage- **Click-to-Copy Card Numbers**: Easy copying of donation card numbers with toast notifications

- **Local Development** - Uses JSON files for easy local testing- **Donators Hall of Fame**: Dedicated page showcasing all generous donors

- **Responsive Design**: Works beautifully on mobile, tablet, and desktop

## 🚀 Quick Start- **Dark/Light Theme Support**: Integrated theme provider for user preference

- **Analytics Integration**: Vercel Analytics for tracking visitor metrics

### Prerequisites

## 🚀 Tech Stack

- Node.js 18+ installed

- pnpm package manager (`npm install -g pnpm`)- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)

- **Language**: TypeScript

### Installation- **Styling**: Tailwind CSS

- **UI Components**: Custom components built with Radix UI

1. **Clone the repository**- **Icons & Emojis**: Unicode emojis for universal support

   ```bash- **Package Manager**: pnpm

   git clone https://github.com/tolibme/donation-tracker.git- **Analytics**: Vercel Analytics

   cd donation-tracker

   ```## 📦 Installation



2. **Install dependencies**1. **Clone the repository**

   ```bash   ```bash

   pnpm install   git clone https://github.com/tolibme/donation-tracker.git

   ```   cd donation-tracker

   ```

3. **Run development server**

   ```bash2. **Install dependencies**

   pnpm dev   ```bash

   ```   pnpm install

   ```

4. **Open in browser**

   ```3. **Run the development server**

   http://localhost:3000   ```bash

   ```   pnpm dev

   ```

## 🗄️ Database Setup (Production)

4. **Open your browser**

For production deployment on Vercel, you need to set up Vercel Blob storage:   Navigate to [http://localhost:3000](http://localhost:3000)



1. Go to [Vercel Dashboard](https://vercel.com/dashboard)## 📁 Project Structure

2. Select your project

3. Click **Storage** → **Create Store**```

4. Select **Blob** (Fast object storage)donation-tracker/

5. Name it `donation-tracker-blob`├── app/

6. Click **Create**│   ├── api/

│   │   └── donators/          # API route for fetching donators

✅ `BLOB_READ_WRITE_TOKEN` will be automatically added to your environment variables.│   ├── donators/              # Donators page

│   ├── layout.tsx             # Root layout with providers

**See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.**│   ├── page.tsx               # Main donation tracker page

│   └── globals.css            # Global styles

## 🔐 Admin Panel├── components/

│   ├── ui/                    # Reusable UI components

Access the admin panel at `/admin`│   ├── LanguageSwitcher.tsx   # Language switcher dropdown

│   └── theme-provider.tsx     # Theme context provider

**Default Password:** `warmsteps2025`├── contexts/

│   └── LanguageContext.tsx    # Language context and hook

To change the password, edit `lib/auth.ts`:├── data/

│   └── donators.json          # Donators data storage

```typescript├── lib/

export async function validateAdminPassword(password: string): Promise<boolean> {│   ├── i18n.ts                # Translation strings

  return password === 'YOUR_NEW_PASSWORD'│   └── utils.ts               # Utility functions

}├── hooks/

```│   └── use-toast.ts           # Toast notification hook

└── public/                    # Static assets

### Admin Features```



- ✅ Add new donators## 🌍 Adding/Editing Translations

- ✅ Edit existing donations

- ✅ Delete donationsEdit the translation file at `lib/i18n.ts`:

- ✅ Real-time stats (total collected, donator count, slippers funded)

```typescript

## 📁 Project Structureexport const translations: Record<Language, Translations> = {

  en: {

```    title: "Warm Steps for Kind Hearts",

donation-tracker/    // ... more translations

├── app/  },

│   ├── page.tsx              # Main donation page  uz: {

│   ├── layout.tsx            # Root layout    title: "Mehribonlar uchun Issiq Qadamlar",

│   ├── admin/    // ... more translations

│   │   └── page.tsx          # Admin panel  },

│   ├── donators/  ru: {

│   │   └── page.tsx          # Donators list page    title: "Теплые шаги для добрых сердец",

│   └── api/    // ... more translations

│       ├── stats/route.ts    # Stats API endpoint  }

│       ├── donators/route.ts # Public donators API}

│       └── admin/donators/route.ts # Admin CRUD API```

├── components/

│   ├── LanguageSwitcher.tsx  # Language selector## 📝 Managing Donators

│   └── ui/                   # UI components

├── contexts/### Admin Panel (Recommended) 🔐

│   └── LanguageContext.tsx   # Language state management

├── lib/The easiest way to manage donators is through the admin panel:

│   ├── i18n.ts              # Translations (EN, UZ, RU)

│   ├── db.ts                # Database abstraction layer1. **Access**: Navigate to `/admin` or click the small dot (•) at the bottom of the homepage

│   └── auth.ts              # Admin authentication2. **Login**: Enter password (default: `warmsteps2025`)

├── data/3. **Add/Edit/Delete**: Use the intuitive interface to manage donators

│   └── donators.json        # Local development data4. **Auto-Update**: All stats (collected amount, slippers funded, progress) automatically update on the main page!

└── hooks/

    └── use-toast.ts         # Toast notifications hook**Features:**

```- ✅ Password protected

- ✅ Add new donators with name, amount, date, and optional message

## 🌍 Translations- ✅ Edit existing donators

- ✅ Delete donators with confirmation

The app supports 3 languages with complete translations:- ✅ Real-time stats dashboard

- ✅ Automatic calculation of total donations and progress

- **English** (en)

- **Uzbek** (uz)**Change Admin Password**: Edit `lib/auth.ts`:

- **Russian** (ru)```typescript

export const ADMIN_PASSWORD = "your-secure-password-here"

To add or modify translations, edit `lib/i18n.ts`.```



## 🎨 Tech Stack### Manual Method (Alternative)



- **Framework:** Next.js 16 (App Router)To manually add donators, edit `data/donators.json`:

- **Language:** TypeScript

- **Styling:** Tailwind CSS```json

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
