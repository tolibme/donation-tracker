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

To add new donators, edit `data/donators.json`:

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
- `id`: Unique identifier (number)
- `name`: Donor's name (string)
- `amount`: Donation amount in UZS (number)
- `date`: Donation date in YYYY-MM-DD format (string)
- `message`: Optional message from donor (string, optional)

## 🔄 Updating Progress

To update the donation progress, edit the `collected` variable in `app/page.tsx`:

```typescript
const collected = 3_450_000  // Update this with current amount in UZS
const goal = 9_000_000
```

The progress bar and statistics will automatically update.

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

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click!

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
