import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'
import en from './en.json'
import sv from './sv.json'

const translations = {
  en: en,
  sv: sv,
}

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true

export default i18n
