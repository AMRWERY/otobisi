<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:code-bold" class="w-4 h-4" />
        <span>Transit Engineering</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Terminal Integration API
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        High-throughput REST API and real-time Webhooks connecting bus operator ERPs, station turnstiles, and ticket counter POS systems.
      </p>
    </div>

    <!-- Technical Specs Overview -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-1">
        <div class="text-xs text-text-muted">Protocol</div>
        <div class="text-base font-bold text-text-primary">REST / JSON & Webhooks</div>
      </div>
      <div class="p-5 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-1">
        <div class="text-xs text-text-muted">Average Latency</div>
        <div class="text-base font-bold text-[#EA580C]">&lt; 45ms</div>
      </div>
      <div class="p-5 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-1">
        <div class="text-xs text-text-muted">Uptime SLA</div>
        <div class="text-base font-bold text-text-primary">99.98% High Availability</div>
      </div>
      <div class="p-5 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-1">
        <div class="text-xs text-text-muted">Auth Standard</div>
        <div class="text-base font-bold text-text-primary">HMAC-SHA256 / Bearer</div>
      </div>
    </div>

    <!-- Core Endpoints Grid -->
    <div class="space-y-6">
      <h2 class="text-xl font-black text-text-primary tracking-tight">Core Integration Endpoints</h2>

      <div class="space-y-3">
        <div
          v-for="endpoint in endpoints"
          :key="endpoint.path"
          class="p-5 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-2"
        >
          <div class="flex flex-wrap items-center gap-3">
            <span
              class="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase"
              :class="endpoint.method === 'GET' ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'"
            >
              {{ endpoint.method }}
            </span>
            <span class="text-xs font-mono font-bold text-text-primary">{{ endpoint.path }}</span>
          </div>
          <p class="text-xs text-text-secondary leading-relaxed">{{ endpoint.description }}</p>
        </div>
      </div>
    </div>

    <!-- Code Sample Preview -->
    <div class="p-6 sm:p-8 rounded-3xl bg-[#0B0F19] text-gray-200 border border-border/70 space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono text-gray-400">cURL / Node.js • Validate Boarding QR Code</span>
        <span class="text-[10px] uppercase font-bold text-[#EA580C] bg-orange-950/40 px-2 py-0.5 rounded">HTTPS</span>
      </div>

      <pre class="overflow-x-auto text-xs font-mono text-gray-300 p-4 rounded-xl bg-[#06080F] border border-gray-800 leading-relaxed">
<code>curl -X POST https://api.otobisi.com/v1/terminal/validate-qr \
  -H "Authorization: Bearer sk_live_egy_operator_042" \
  -H "Content-Type: application/json" \
  -d '{
    "qr_payload": "OTO-EGY-89241-S14",
    "gate_id": "ALMAZA_GATE_03",
    "conductor_id": "EMP_712"
  }'</code></pre>
    </div>

    <!-- Request API Access Box -->
    <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-text-primary">Need API Sandbox Credentials?</h3>
        <p class="text-xs text-text-secondary">
          Request test keys, OpenAPI specifications, and terminal webhook sandbox access for your engineering team.
        </p>
      </div>
      <a
        href="mailto:developers@otobisi.com?subject=Terminal API Access Request"
        class="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
      >
        Request Developer Keys
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const endpoints = [
  {
    method: "POST",
    path: "/v1/trips/sync-inventory",
    description:
      "Push real-time seat availability updates directly from your counter ERP to prevent dual bookings.",
  },
  {
    method: "POST",
    path: "/v1/terminal/validate-qr",
    description:
      "Instant turnstile gate / conductor scan verification. Returns passenger status, seat assignment, and luggage tag count.",
  },
  {
    method: "GET",
    path: "/v1/manifests/{trip_id}",
    description:
      "Export standardized passenger manifest required by Egyptian Highway Traffic Police checkpoints.",
  },
  {
    method: "POST",
    path: "/v1/webhooks/status-update",
    description:
      "Notify Otobisi when a bus departs, reaches midway stations, or reports a schedule delay.",
  },
];

useSeo({
  title: "Terminal Integration API | Otobisi Developers",
  description:
    "Documentation and REST API reference for Egyptian bus operators, terminal turnstile scanners, GDS ticketing systems, and fleet dispatch integrations.",
  private: false,
});
</script>
