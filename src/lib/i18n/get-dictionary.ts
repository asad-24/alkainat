import type { Locale } from "./config"
import en from "./dictionaries/en"
import ar from "./dictionaries/ar"
import ur from "./dictionaries/ur"

export async function getDictionary(locale: Locale | string) {
    switch (locale) {
        case "ar":
            return ar
        case "ur":
            return ur
        case "en":
        default:
            return en
    }
}
