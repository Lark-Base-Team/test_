import { createI18n } from "vue-i18n"
import { en } from "./en"
import { zh } from "./zh"
import { ja } from "./ja"
import { bitable } from "@lark-base-open/js-sdk"

export const i18n = createI18n({
  locale: "en",
  legacy: false,
  messages: {
    en: en,
    zh: zh,
    ja: ja,
  },
})

bitable.bridge.getLanguage().then((lang) => {
  if (["zh", "zh-TW", "zh-HK"].includes(lang)) {
    i18n.global.locale.value = "zh"
  } else if (lang === "ja") {
    i18n.global.locale.value = "ja"
  } else {
    i18n.global.locale.value = "en"
  }
})
