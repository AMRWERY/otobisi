import { configure } from "vee-validate";
import { required, email, min, max, digits, regex } from "@vee-validate/rules";
import type { Locale } from "~/types/supported-locales";

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as { locale: { value: string } };

  configure({
    validateOnInput: true, // live feedback as the user types, not just on blur
    generateMessage: (ctx) => {
      const isArabic = i18n.locale.value === "ar";
      const messages: Record<string, string> = {
        required: isArabic ? `${ctx.field} مطلوب` : `${ctx.field} is required`,
        min: isArabic ? `${ctx.field} قصير جداً` : `${ctx.field} is too short`,
        max: isArabic ? `${ctx.field} طويل جداً` : `${ctx.field} is too long`,
        email: isArabic
          ? "البريد الإلكتروني غير صحيح"
          : "Please enter a valid email",
      };
      return (
        messages[ctx.rule?.name ?? ""] ??
        (isArabic ? "قيمة غير صحيحة" : "Invalid value")
      );
    },
  });
});