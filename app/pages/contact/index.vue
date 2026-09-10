<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:phone-call-fill" class="w-4 h-4" />
        <span>24/7 Direct Contact</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Contact Our Passenger Team
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Need assistance with booking, cancellation, baggage or station directions? Our Egypt-based support agents are ready to assist 24 hours a day.
      </p>
    </div>

    <!-- Quick Channels Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 24/7 Hotline -->
      <a
        href="tel:19999"
        class="p-6 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white shadow-lg shadow-orange-950/20 hover:scale-[1.01] transition-transform space-y-3"
      >
        <div class="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center">
          <Icon name="ph:phone-bold" class="w-5 h-5 text-white" />
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold text-orange-200 tracking-wider">Toll-Free Nationwide</span>
          <div class="text-2xl font-black tracking-tight">19XXX Hotline</div>
          <p class="text-xs text-orange-100/90 mt-1 leading-snug">Available 24 hours every day for ticket inquiries & refunds</p>
        </div>
      </a>

      <!-- WhatsApp Assistant -->
      <a
        href="https://wa.me/201012345678"
        target="_blank"
        rel="noopener noreferrer"
        class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 hover:border-emerald-500/50 hover:scale-[1.01] transition-all space-y-3"
      >
        <div class="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <Icon name="ph:whatsapp-logo-bold" class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">Instant Chat</span>
          <div class="text-2xl font-black text-text-primary tracking-tight">+20 10 1234 5678</div>
          <p class="text-xs text-text-secondary mt-1 leading-snug">Instant e-ticket lookup, seat receipts & live schedule bot</p>
        </div>
      </a>

      <!-- Headquarters -->
      <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3">
        <div class="w-10 h-10 rounded-2xl bg-surface-2 dark:bg-[#1B2438] text-[#EA580C] flex items-center justify-center">
          <Icon name="ph:map-pin-bold" class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold text-text-muted tracking-wider">Cairo Headquarters</span>
          <div class="text-base font-bold text-text-primary">Smart Village, Giza</div>
          <p class="text-xs text-text-secondary mt-1 leading-snug">Building B11, 26th of July Corridor, Giza, Egypt</p>
        </div>
      </div>
    </div>

    <!-- Contact Form & Hours Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Form (8 cols) -->
      <div class="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-6">
        <div class="space-y-1">
          <h2 class="text-xl font-bold text-text-primary">Send an Inquiry</h2>
          <p class="text-xs text-text-muted">Fill out the form below and an agent will reply within 2 business hours.</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-text-primary">Full Name</label>
              <input
                v-model="form.name"
                required
                type="text"
                placeholder="Ahmed Mahmoud"
                class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-text-primary">Phone Number</label>
              <input
                v-model="form.phone"
                required
                type="tel"
                placeholder="010XXXXXXXX"
                class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-text-primary">Email Address</label>
              <input
                v-model="form.email"
                required
                type="email"
                placeholder="ahmed@example.com"
                class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-text-primary">Topic</label>
              <select
                v-model="form.topic"
                class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
              >
                <option value="booking">Booking Modification / Cancellation</option>
                <option value="payment">Payment & Fawry Confirmation</option>
                <option value="luggage">Luggage & Baggage Claim</option>
                <option value="operator">Operator Partnership</option>
                <option value="other">General Inquiry</option>
              </select>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-text-primary">Booking Reference Code (Optional)</label>
            <input
              v-model="form.bookingCode"
              type="text"
              placeholder="e.g. OTO-89241"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-text-primary">Message</label>
            <textarea
              v-model="form.message"
              required
              rows="4"
              placeholder="How can we help with your trip?"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surface-0 dark:bg-[#0B0F19] border border-border/80 text-text-primary text-xs focus:outline-none focus:border-[#EA580C]"
            ></textarea>
          </div>

          <div v-if="submitted" class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            Thank you! Your inquiry has been received. Our team will contact you via WhatsApp or phone.
          </div>

          <button
            type="submit"
            class="px-6 py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            Submit Message
          </button>
        </form>
      </div>

      <!-- Side info (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4">
          <h3 class="text-sm font-bold text-text-primary">Support Operating Hours</h3>
          <div class="space-y-2 text-xs text-text-secondary">
            <div class="flex justify-between">
              <span>National Hotline:</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">24/7 (365 Days)</span>
            </div>
            <div class="flex justify-between">
              <span>WhatsApp Support:</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">24/7 Live</span>
            </div>
            <div class="flex justify-between">
              <span>Smart Village Office:</span>
              <span class="font-medium text-text-primary">Sun - Thu: 9AM - 6PM</span>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3">
          <h3 class="text-sm font-bold text-text-primary">Looking to Cancel or Modify?</h3>
          <p class="text-xs text-text-secondary leading-relaxed">
            You can view or cancel tickets directly using your booking code on our automated portal without waiting for an agent.
          </p>
          <nuxt-link-locale
            to="/bookings"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] hover:underline group"
          >
            <span>Manage My Booking</span>
            <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 icon-arrow-animated" />
          </nuxt-link-locale>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const form = reactive({
  name: "",
  phone: "",
  email: "",
  topic: "booking",
  bookingCode: "",
  message: "",
});

const submitted = ref(false);

const handleSubmit = () => {
  submitted.value = true;
  setTimeout(() => {
    form.name = "";
    form.phone = "";
    form.email = "";
    form.bookingCode = "";
    form.message = "";
  }, 1000);
};

useSeo({
  title: "Contact Us & 24/7 Support | Otobisi Egypt",
  description:
    "Get in touch with Otobisi Egypt. 24/7 national transit hotline (19XXX), WhatsApp live assistance, Cairo headquarters, and direct support inquiry.",
  private: false,
});
</script>
