# 💖 Warm Steps for Kind Hearts - Donation Tracker

A beautiful, multilingual donation tracking website built with Next.js to help raise funds for providing winter slippers to 187 grandparents.

## ✨ Features

- **Real-time Progress Tracking**: Visual progress bar showing donation goals and current status
- **Multilingual Support**: Full support for 3 languages
  - 🇬🇧 English
  - 🇺🇿 O'zbekcha (Uzbek)
  - 🇷🇺 Русский (Russian)
- **Click-to-Copy Card Numbers**: Easy copying of donation card numbers with toast notifications
- **Donators Hall of Fame**: Dedicated page showcasing all generous donors
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop
- **Dark/Light Theme Support**: Integrated theme provider for user preference
- **Analytics Integration**: Vercel Analytics for tracking visitor metrics

## 🚀 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Radix UI
- **Icons & Emojis**: Unicode emojis for universal support
- **Package Manager**: pnpm
- **Analytics**: Vercel Analytics

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tolibme/donation-tracker.git
   cd donation-tracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
donation-tracker/
├── app/
│   ├── api/
│   │   └── donators/          # API route for fetching donators
│   ├── donators/              # Donators page
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Main donation tracker page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── LanguageSwitcher.tsx   # Language switcher dropdown
│   └── theme-provider.tsx     # Theme context provider
├── contexts/
│   └── LanguageContext.tsx    # Language context and hook
├── data/
│   └── donators.json          # Donators data storage
├── lib/
│   ├── i18n.ts                # Translation strings
│   └── utils.ts               # Utility functions
├── hooks/
│   └── use-toast.ts           # Toast notification hook
└── public/                    # Static assets
```

## 🌍 Adding/Editing Translations

Edit the translation file at `lib/i18n.ts`:

```typescript
export const translations: Record<Language, Translations> = {
  en: {
    title: "Warm Steps for Kind Hearts",
    // ... more translations
  },
  uz: {
    title: "Mehribonlar uchun Issiq Qadamlar",
    // ... more translations
  },
  ru: {
    title: "Теплые шаги для добрых сердец",
    // ... more translations
  }
}
```

## 📝 Managing Donators

### Admin Panel (Recommended) 🔐

The easiest way to manage donators is through the admin panel:

1. **Access**: Navigate to `/admin` or click the small dot (•) at the bottom of the homepage
2. **Login**: Enter password (default: `warmsteps2025`)
3. **Add/Edit/Delete**: Use the intuitive interface to manage donators
4. **Auto-Update**: All stats (collected amount, slippers funded, progress) automatically update on the main page!

**Features:**
- ✅ Password protected
- ✅ Add new donators with name, amount, date, and optional message
- ✅ Edit existing donators
- ✅ Delete donators with confirmation
- ✅ Real-time stats dashboard
- ✅ Automatic calculation of total donations and progress

**Change Admin Password**: Edit `lib/auth.ts`:
```typescript
export const ADMIN_PASSWORD = "your-secure-password-here"
```

### Manual Method (Alternative)

To manually add donators, edit `data/donators.json`:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "amount": 45000,
    "date": "2025-11-03",
    "message": "Optional message from the donor"
  }
]
```

**Fields:**
- `id`: Unique identifier (number) - auto-generated in admin panel
- `name`: Donor's name (string)
- `amount`: Donation amount in UZS (number)
- `date`: Donation date in YYYY-MM-DD format (string)
- `message`: Optional message from donor (string, optional)

## 🔄 How Progress Updates Work

The system **automatically calculates** all statistics from the donators data:

1. **Total Collected**: Sum of all donation amounts in `donators.json`
2. **Progress Percentage**: `(collected / goal) × 100`
3. **Slippers Funded**: `Math.floor(collected / 45000)`
4. **Slippers Remaining**: `187 - slippersFunded`

**No manual updates needed!** When you add/edit/delete a donator through the admin panel, everything updates automatically:
- Main page progress bar
- Collected amount display
- Slippers funded counter
- Remaining slippers count

## 🎨 Customization

### Card Numbers

Edit the card number in `app/page.tsx`:

```tsx
<div onClick={() => copyToClipboard("8600612227452165", "Uzcard")}>
  <p>8600 6122 2745 2165</p>
</div>
```

### Telegram Contact

Update the Telegram link in both `app/page.tsx` and translation files:

```tsx
<a href="https://t.me/warmstepdonation">
  Telegram @warmstepdonation
</a>
```

### Theme Colors

Customize colors in `app/globals.css` using CSS variables:

```css
:root {
  --primary: ...;
  --secondary: ...;
  --accent: ...;
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

#### Step 1: Set Up Vercel KV Database

**Important:** To use the admin panel in production, you need to set up Vercel KV database (it's free!):

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
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
