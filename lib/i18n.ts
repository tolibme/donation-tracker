export type Language = 'en' | 'uz' | 'ru'

export interface Translations {
  // Header
  title: string
  subtitle: string
  
  // Progress Card
  raised: string
  goal: string
  progress: string
  slippersFunded: string
  remaining: string
  
  // Donation Instructions
  donateViaCard: string
  afterDonating: string
  telegramButton: string
  clickToCopy: string
  sendScreenshotMessage: string
  
  // Footer
  updatedEvery24Hours: string
  lastUpdated: string
  viewDonators: string
  
  // Toast messages
  copied: string
  copiedDescription: string
  failedToCopy: string
  tryAgain: string
  
  // Donators page
  ourDonators: string
  thankYouMessage: string
  totalDonations: string
  from: string
  donors: string
  donor: string
  loadingDonators: string
  noDonations: string
  makeADonation: string
  backToHome: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: "Warm Steps for Kind Hearts",
    subtitle: "Help us bring warmth and comfort to 187 grandparents this winter.",
    
    // Progress Card
    raised: "Raised",
    goal: "Goal",
    progress: "Progress",
    slippersFunded: "Slippers Funded",
    remaining: "Remaining",
    
    // Donation Instructions
    donateViaCard: "Donate via Card",
    afterDonating: "After donating:",
    telegramButton: "Telegram @warmstepdonation",
    clickToCopy: "Click to copy",
    sendScreenshotMessage: "Please send a screenshot or message to Telegram",
    
    // Footer
    updatedEvery24Hours: "Updated every 24 hours",
    lastUpdated: "Last updated:",
    viewDonators: "View Our Donators",
    
    // Toast messages
    copied: "✓ Copied!",
    copiedDescription: "number copied to clipboard",
    failedToCopy: "Failed to copy",
    tryAgain: "Please try again",
    
    // Donators page
    ourDonators: "Our Generous Donators",
    thankYouMessage: "Thank you to everyone who has contributed to bringing warmth this winter",
    totalDonations: "Total Donations",
    from: "from",
    donors: "donors",
    donor: "donor",
    loadingDonators: "Loading donators...",
    noDonations: "No donations yet. Be the first to donate!",
    makeADonation: "Make a Donation",
    backToHome: "Back to Home",
  },
  uz: {
    // Header
    title: "Mehribon yuraklar uchun iliq qadamlar",
    subtitle: "Bu qishda 187 buvi va boboga mehr va iliqlik ulashishda bizga yordam bering.",
    
    // Progress Card
    raised: "To'plangan",
    goal: "Maqsad",
    progress: "Jarayon",
    slippersFunded: "Shippak xarid qilindi",
    remaining: "Qolgan",
    
    // Donation Instructions
    donateViaCard: "Karta orqali xayriya qiling",
    afterDonating: "Xayriya qilgandan so'ng:",
    telegramButton: "Telegram @warmstepdonation",
    clickToCopy: "Nusxalash uchun bosing",
    sendScreenshotMessage: "Iltimos, Telegramga skrinshot yoki xabar yuboring",
    
    // Footer
    updatedEvery24Hours: "Har 24 soatda yangilanadi",
    lastUpdated: "Oxirgi yangilangan:",
    viewDonators: "Xayriyachilarni ko'rish",
    
    // Toast messages
    copied: "✓ Nusxalandi!",
    copiedDescription: "raqam nusxalandi",
    failedToCopy: "Nusxalab bo'lmadi",
    tryAgain: "Iltimos, qayta urinib ko'ring",
    
    // Donators page
    ourDonators: "Saxovatli Xayriyachilarimiz",
    thankYouMessage: "Bu qishda issiqlik keltirgan barcha odamlarga rahmat",
    totalDonations: "Jami Xayriyalar",
    from: "dan",
    donors: "xayriyachi",
    donor: "xayriyachi",
    loadingDonators: "Yuklanmoqda...",
    noDonations: "Hali xayriyalar yo'q. Birinchi bo'ling!",
    makeADonation: "Xayriya qilish",
    backToHome: "Bosh sahifa",
  },
  ru: {
    // Header
    title: "Тёплые шаги для добрых сердец",
    subtitle: "Помогите нам подарить тепло и уют 187 бабушкам и дедушкам этой зимой.",
    
    // Progress Card
    raised: "Собрано",
    goal: "Цель",
    progress: "Прогресс",
    slippersFunded: "Тапочки куплены",
    remaining: "Осталось",
    
    // Donation Instructions
    donateViaCard: "Пожертвовать через карту",
    afterDonating: "После пожертвования:",
    telegramButton: "Telegram @warmstepdonation",
    clickToCopy: "Нажмите, чтобы скопировать",
    sendScreenshotMessage: "Пожалуйста, отправьте скриншот или сообщение в Telegram",
    
    // Footer
    updatedEvery24Hours: "Обновляется каждые 24 часа",
    lastUpdated: "Последнее обновление:",
    viewDonators: "Посмотреть жертвователей",
    
    // Toast messages
    copied: "✓ Скопировано!",
    copiedDescription: "номер скопирован",
    failedToCopy: "Не удалось скопировать",
    tryAgain: "Попробуйте еще раз",
    
    // Donators page
    ourDonators: "Наши щедрые жертвователи",
    thankYouMessage: "Спасибо всем, кто внес свой вклад в тепло этой зимы",
    totalDonations: "Всего пожертвований",
    from: "от",
    donors: "жертвователей",
    donor: "жертвователя",
    loadingDonators: "Загрузка...",
    noDonations: "Пожертвований пока нет. Будьте первым!",
    makeADonation: "Сделать пожертвование",
    backToHome: "На главную",
  },
}
