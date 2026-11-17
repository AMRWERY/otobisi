<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        @click="emit('close')"
      />

      <div class="fixed inset-y-0 end-0 flex max-w-full">
        <div
          class="w-screen max-w-md lg:max-w-xl bg-surface-0 dark:bg-[#0E131F] border-s border-border shadow-2xl flex flex-col h-full"
        >
          <!-- Header -->
          <div
            class="px-6 py-5 border-b border-border/80 flex items-start justify-between gap-4 shrink-0 bg-surface-1/30 dark:bg-surface-2/10"
          >
            <div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 class="text-base font-bold text-text-primary">
                  Register New Coach
                </h2>
              </div>
              <p class="text-xs text-text-muted mt-0.5">
                Integrate vehicle telematics & capacity into the Otobisi network
              </p>
            </div>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:x-bold"
              aria-label="Close drawer"
              @click="emit('close')"
            />
          </div>

          <!-- Body -->
          <div
            class="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar text-xs"
          >
            <!-- 01 Identification -->
            <section class="space-y-3">
              <fleet-form-section-title
                title="01 • Identification & Model"
                aside="Required"
                aside-class="text-red-500"
              />

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <VInput
                  v-model="form.model"
                  label="Vehicle Model & Commercial Name"
                  required
                  size="sm"
                  rounded="lg"
                  placeholder="e.g. MCV 600 VIP Elite"
                />
                <VInput
                  v-model="form.internalId"
                  label="Fleet Internal ID / Code"
                  required
                  size="sm"
                  rounded="lg"
                  placeholder="BUS-EG-883"
                />
              </div>

              <!-- Bilingual Egyptian plate -->
              <div class="space-y-1.5">
                <span class="text-xs font-semibold text-text-primary/90 block">
                  License Plate Registration (Bilingual Egyptian Standard)
                  <span class="text-red-500">*</span>
                </span>
                <div class="grid grid-cols-2 gap-2">
                  <VInput
                    v-model="form.plateArabic"
                    size="sm"
                    rounded="lg"
                    placeholder="د خ ٨٨٢٣"
                    input-class="text-end"
                    dir="rtl"
                  >
                    <template #leading>
                      <span class="text-[10px] font-mono text-text-muted">
                        Arabic
                      </span>
                    </template>
                  </VInput>
                  <VInput
                    v-model="form.plateLatin"
                    size="sm"
                    rounded="lg"
                    placeholder="DX-8823"
                  >
                    <template #trailing>
                      <span class="text-[10px] font-mono text-text-muted">
                        Latin
                      </span>
                    </template>
                  </VInput>
                </div>
              </div>
            </section>

            <!-- 02 Chassis -->
            <section class="space-y-3">
              <fleet-form-section-title title="02 • Chassis & Engineering" />

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <VFormSelect
                  v-model="form.chassis"
                  label="Chassis & Engine Platform"
                  :options="chassisOptions"
                />
                <VInput
                  v-model.number="form.year"
                  label="Year of Build"
                  type="number"
                  size="sm"
                  rounded="lg"
                />
              </div>

              <VInput
                v-model="form.vin"
                label="Vehicle Identification Number (VIN Serial)"
                size="sm"
                rounded="lg"
                placeholder="WDB63404513882904"
              />
            </section>

            <!-- 03 Capacity -->
            <section class="space-y-3">
              <fleet-form-section-title
                title="03 • Capacity & Blueprint Config"
                aside="Linked to Seat Engine"
              />

              <VFormSelect
                v-model="form.template"
                label="Assigned Seat Template Blueprint"
                :options="templateOptions"
              />

              <div class="space-y-1.5">
                <span class="text-xs font-semibold text-text-primary/90 block">
                  Initial Operational Status
                </span>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="option in NEW_COACH_STATUS_OPTIONS"
                    :key="option.value"
                    type="button"
                    :class="[
                      'py-2 px-3 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer',
                      form.status === option.value
                        ? 'bg-[#0F5A47] text-white font-bold'
                        : 'bg-surface-1 dark:bg-surface-2/50 text-text-secondary hover:bg-surface-2',
                    ]"
                    @click="form.status = option.value"
                  >
                    <span
                      v-if="option.value === 'in-service'"
                      class="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    />
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </section>

            <!-- 04 Depot -->
            <section class="space-y-3">
              <fleet-form-section-title
                title="04 • Depot Assignment & Telemetry"
              />

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <VFormSelect
                  v-model="form.depot"
                  label="Home Depot & Maintenance Yard"
                  :options="FLEET_DEPOTS"
                />
                <VFormSelect
                  v-model="form.driver"
                  label="Dedicated Lead Driver"
                  :options="FLEET_DRIVERS"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <VInput
                  v-model="form.odometer"
                  label="Initial Odometer (km)"
                  size="sm"
                  rounded="lg"
                  placeholder="1,240"
                />
                <VInput
                  v-model="form.firstService"
                  label="First Service Check"
                  type="date"
                  size="sm"
                  rounded="lg"
                />
              </div>

              <div
                class="p-3 bg-accent-50/60 dark:bg-accent-500/10 border border-accent-200/60 dark:border-accent-500/25 rounded-xl flex items-start gap-2 text-accent-900 dark:text-accent-200"
              >
                <Icon
                  name="ph:info-bold"
                  class="w-4 h-4 text-accent-700 dark:text-accent-300 shrink-0 mt-0.5"
                />
                <p class="text-[11px] font-mono leading-relaxed">
                  Vehicle will automatically synchronize its telemetry stream
                  with Hub #402. Dynamic seat allocation templates will become
                  available for scheduling instantaneously.
                </p>
              </div>
            </section>
          </div>

          <!-- Footer -->
          <div
            class="px-6 py-4 border-t border-border/80 bg-surface-1/40 dark:bg-surface-2/20 flex items-center justify-between gap-3 shrink-0"
          >
            <VButton
              variant="surface"
              size="sm"
              rounded="xl"
              @click="emit('close')"
            >
              Cancel
            </VButton>

            <div class="flex items-center gap-2">
              <VButton
                variant="ghost"
                size="sm"
                rounded="xl"
                @click="emit('save-draft')"
              >
                Save as Draft
              </VButton>
              <VButton
                variant="primary"
                size="sm"
                rounded="xl"
                icon="ph:check-bold"
                custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
                @click="emit('register', { ...form })"
              >
                Register Coach
              </VButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { NewCoachForm } from "~/types/fleet";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "register", form: NewCoachForm): void;
  (e: "save-draft"): void;
}>();

const form = ref<NewCoachForm>(emptyCoachForm());

const chassisOptions = FLEET_CHASSIS;
const templateOptions = COACH_TEMPLATE_KEYS.map((key) => ({
  value: key,
  label: COACH_TEMPLATES[key].label,
}));

// Start every opening with a clean form
watch(
  () => props.isOpen,
  (open) => {
    if (open) form.value = emptyCoachForm();
  },
);
</script>
