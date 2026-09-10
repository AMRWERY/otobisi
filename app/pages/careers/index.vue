<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:briefcase-bold" class="w-4 h-4" />
        <span>We're Hiring Across Egypt</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Build the Future of Transit Tech
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Help millions of Egyptians travel smoothly every month. Join our high-impact engineering, operations, and product teams in Cairo and Alexandria.
      </p>
    </div>

    <!-- Perks / Culture Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div
        v-for="perk in perks"
        :key="perk.title"
        class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-2"
      >
        <div class="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] flex items-center justify-center mb-3">
          <Icon :name="perk.icon" class="w-5 h-5" />
        </div>
        <h3 class="text-sm font-bold text-text-primary">{{ perk.title }}</h3>
        <p class="text-xs text-text-secondary leading-relaxed">{{ perk.desc }}</p>
      </div>
    </div>

    <!-- Open Roles Section -->
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-black text-text-primary tracking-tight">Open Opportunities</h2>
          <p class="text-xs text-text-muted mt-0.5">Explore full-time, hybrid, and remote roles</p>
        </div>

        <!-- Filter Tags -->
        <div class="flex items-center gap-2 flex-wrap">
          <button
            v-for="dept in departments"
            :key="dept"
            type="button"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            :class="selectedDept === dept ? 'bg-[#EA580C] text-white' : 'bg-surface-1 dark:bg-[#131B2E] border border-border/70 text-text-secondary hover:text-text-primary'"
            @click="selectedDept = dept"
          >
            {{ dept }}
          </button>
        </div>
      </div>

      <!-- Job Cards -->
      <div class="space-y-3">
        <div
          v-for="job in filteredJobs"
          :key="job.id"
          class="p-5 sm:p-6 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 hover:border-[#EA580C]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="text-sm sm:text-base font-bold text-text-primary">{{ job.title }}</span>
              <span
                class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                :class="job.type === 'Full-Time' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'"
              >
                {{ job.type }}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
              <span class="flex items-center gap-1">
                <Icon name="ph:map-pin-bold" class="w-3.5 h-3.5 text-[#EA580C]" />
                {{ job.location }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="ph:buildings-bold" class="w-3.5 h-3.5" />
                {{ job.department }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="ph:clock-bold" class="w-3.5 h-3.5" />
                {{ job.experience }}
              </span>
            </div>
          </div>

          <a
            :href="`mailto:careers@otobisi.com?subject=Application for ${encodeURIComponent(job.title)}`"
            class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-surface-0 dark:bg-[#0B0F19] hover:bg-[#EA580C] hover:text-white border border-border/70 text-xs font-bold text-text-primary transition-colors shrink-0"
          >
            <span>Apply Now</span>
            <Icon name="ph:arrow-up-right-bold" class="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>

    <!-- General Application Box -->
    <div class="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-[#1A1824] dark:to-[#141B2E] border border-orange-200/70 dark:border-orange-900/40 text-center space-y-3">
      <h3 class="text-lg font-bold text-text-primary">Don't see your role?</h3>
      <p class="text-xs text-text-secondary max-w-lg mx-auto">
        We are always looking for passionate engineers, data scientists, and transit operations leaders. Send your CV and portfolio directly to our recruiting team.
      </p>
      <a
        href="mailto:careers@otobisi.com?subject=General Talent Application"
        class="inline-flex items-center gap-2 text-xs font-extrabold text-[#EA580C] dark:text-orange-400 hover:underline pt-1 group"
      >
        <span>Email careers@otobisi.com</span>
        <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 icon-arrow-animated" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const perks = [
  {
    icon: "ph:heartbeat-bold",
    title: "Comprehensive Health",
    desc: "Premium medical coverage across Egypt's top hospitals and clinics for you and your family.",
  },
  {
    icon: "ph:laptop-bold",
    title: "Flexible & Hybrid Work",
    desc: "Modern offices in Smart Village Cairo and Alexandria with flexible hybrid arrangements.",
  },
  {
    icon: "ph:trend-up-bold",
    title: "Equity & Annual Growth",
    desc: "Competitive salary packages in EGP/USD pegging, performance bonuses, and travel allowances.",
  },
];

const departments = ["All", "Engineering", "Product & Design", "Operations"];
const selectedDept = ref("All");

const jobs = [
  {
    id: 1,
    title: "Senior Full-Stack Engineer (Nuxt / Node)",
    department: "Engineering",
    location: "Cairo (Hybrid) / Smart Village",
    type: "Full-Time",
    experience: "4+ years",
  },
  {
    id: 2,
    title: "Staff Mobile Platform Engineer (Flutter/Native)",
    department: "Engineering",
    location: "Cairo (Hybrid)",
    type: "Full-Time",
    experience: "5+ years",
  },
  {
    id: 3,
    title: "Product Designer (UI/UX Systems)",
    department: "Product & Design",
    location: "Cairo / Remote Egypt",
    type: "Full-Time",
    experience: "3+ years",
  },
  {
    id: 4,
    title: "Regional Fleet Operations Coordinator",
    department: "Operations",
    location: "Alexandria / Delta Hubs",
    type: "Full-Time",
    experience: "2+ years",
  },
  {
    id: 5,
    title: "Customer Experience Team Lead (24/7 Hotline)",
    department: "Operations",
    location: "Cairo Hub",
    type: "Full-Time",
    experience: "3+ years",
  },
];

const filteredJobs = computed(() => {
  if (selectedDept.value === "All") return jobs;
  return jobs.filter((j) => j.department === selectedDept.value);
});

useSeo({
  title: "Careers at Otobisi | Transit Tech Jobs in Egypt",
  description:
    "Join Egypt's leading bus ticketing tech company. Explore open engineering, product, and transit operations roles in Cairo and Alexandria.",
  private: false,
});
</script>