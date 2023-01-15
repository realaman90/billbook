export default function getLocaleDateString() {
    const formats = {
      "af-ZA": "YYYY/MM/DD",
      "am-ET": "DD/M/YYYY",
      "ar-AE": "DD/MM/YYYY",
      "ar-BH": "DD/MM/YYYY",
      "ar-DZ": "DD-MM-YYYY",
      "ar-EG": "DD/MM/YYYY",
      "ar-IQ": "DD/MM/YYYY",
      "ar-JO": "DD/MM/YYYY",
      "ar-KW": "DD/MM/YYYY",
      "ar-LB": "DD/MM/YYYY",
      "ar-LY": "DD/MM/YYYY",
      "ar-MA": "DD-MM-YYYY",
      "ar-OM": "DD/MM/YYYY",
      "ar-QA": "DD/MM/YYYY",
      "ar-SA": "DD/MM/yy",
      "ar-SY": "DD/MM/YYYY",
      "ar-TN": "DD-MM-YYYY",
      "ar-YE": "DD/MM/YYYY",
      "arn-CL": "DD-MM-YYYY",
      "as-IN": "DD-MM-YYYY",
      "az-Cyrl-AZ": "DD.MM.YYYY",
      "az-Latn-AZ": "DD.MM.YYYY",
      "ba-RU": "DD.MM.yy",
      "be-BY": "DD.MM.YYYY",
      "bg-BG": "DD.MM.YYYY",
      "bn-BD": "DD-MM-yy",
      "bn-IN": "DD-MM-yy",
      "bo-CN": "YYYY/M/d",
      "br-FR": "DD/MM/YYYY",
      "bs-Cyrl-BA": "d.M.YYYY",
      "bs-Latn-BA": "d.M.YYYY",
      "ca-ES": "DD/MM/YYYY",
      "co-FR": "DD/MM/YYYY",
      "cs-CZ": "d.M.YYYY",
      "cy-GB": "DD/MM/YYYY",
      "da-DK": "DD-MM-YYYY",
      "de-AT": "DD.MM.YYYY",
      "de-CH": "DD.MM.YYYY",
      "de-DE": "DD.MM.YYYY",
      "de-LI": "DD.MM.YYYY",
      "de-LU": "DD.MM.YYYY",
      "dsb-DE": "D.MM. YYYY",
      "dv-MV": "DD/MM/yy",
      "el-GR": "DD/MM/YYYY",
      "en-029": "MM/DD/YYYY",
      "en-AU": "DD/MM/YYYY",
      "en-BZ": "DD/MM/YYYY",
      "en-CA": "DD/MM/YYYY",
      "en-GB": "DD/MM/YYYY",
      "en-IE": "DD/MM/YYYY",
      "en-IN": "DD-MM-YYYY",
      "en-JM": "DD/MM/YYYY",
      "en-MY": "d/M/YYYY",
      "en-NZ": "d/MM/YYYY",
      "en-PH": "M/DD/YYYY",
      "en-SG": "DD/M/YYYY",
      "en-TT": "DD/MM/YYYY",
      "en-US": "MM/DD/YYYY",
      "en-ZA": "YYYY/MM/DD",
      "en-ZW": "M/DD/YYYY",
      "es-AR": "DD/MM/YYYY",
      "es-BO": "DD/MM/YYYY",
      "es-CL": "DD-MM-YYYY",
      "es-CO": "DD/MM/YYYY",
      "es-CR": "DD/MM/YYYY",
      "es-DO": "DD/MM/YYYY",
      "es-EC": "DD/MM/YYYY",
      "es-ES": "DD/MM/YYYY",
      "es-GT": "DD/MM/YYYY",
      "es-HN": "DD/MM/YYYY",
      "es-MX": "DD/MM/YYYY",
      "es-NI": "DD/MM/YYYY",
      "es-PA": "MM/DD/YYYY",
      "es-PE": "DD/MM/YYYY",
      "es-PR": "DD/MM/YYYY",
      "es-PY": "DD/MM/YYYY",
      "es-SV": "DD/MM/YYYY",
      "es-US": "M/d/YYYY",
      "es-UY": "DD/MM/YYYY",
      "es-VE": "DD/MM/YYYY",
      "et-EE": "DD.MM.YYYY",
      "eu-ES": "YYYY/MM/DD",
      "fa-IR": "MM/DD/YYYY",
      "fi-FI": "DD.MM.YYYY",
      "fil-PH": "MM/DD/YYYY",
      "fo-FO": "DD-MM-YYYY",
      "fr-BE": "DD/MM/YYYY",
      "fr-CA": "YYYY-MM-DD",
      "fr-CH": "DD.MM.YYYY",
      "fr-FR": "DD/MM/YYYY",
      "fr-LU": "DD/MM/YYYY",
      "fr-MC": "DD/MM/YYYY",
      "fy-NL": "DD-MM-YYYY",
      "ga-IE": "DD/MM/YYYY",
      "gd-GB": "DD/MM/YYYY",
      "gl-ES": "DD/MM/YYYY",
      "gsw-FR": "DD/MM/YYYY",
      "gu-IN": "DD-MM-YYYY",
      "ha-Latn-NG": "DD/MM/YYYY",
      "he-IL": "DD/MM/YYYY",
      "hi-IN": "DD-MM-YYYY",
      "hr-BA": "DD.MM.YYYY.",
      "hr-HR": "DD.MM.YYYY",
      "hsb-DE": "DD.MM.YYYY",
      "hu-HU": "YYYY.MM.DD",
      "hy-AM": "DD.MM.YYYY",
      "id-ID": "DD/MM/YYYY",
      "ig-NG": "DD/MM/YYYY",
      "ii-CN": "YYYY/M/d",
      "is-IS": "DD.MM.YYYY",
      "it-CH": "DD.MM.YYYY",
      "it-IT": "DD/MM/YYYY",
      "iu-Cans-CA": "DD/MM/YYYY",
      "iu-Latn-CA": "DD/MM/YYYY",
      "ja-JP": "YYYY/MM/DD",
      "ka-GE": "DD.MM.YYYY",
      "kk-KZ": "DD.MM.YYYY",
      "kl-GL": "DD-MM-YYYY",
      "km-KH": "YYYY-MM-DD",
      "kn-IN": "DD-MM-YYYY",
      "ko-KR": "YYYY.MM.DD",
      "kok-IN": "DD-MM-YYYY",
      "ky-KG": "DD.MM.YYYY",
      "lb-LU": "DD/MM/YYYY",
      "lo-LA": "DD/MM/YYYY",
      "lt-LT": "YYYY.MM.DD",
      "lv-LV": "YYYY.MM.DD.",
      "mi-NZ": "DD/MM/YYYY",
      "mk-MK": "DD.MM.YYYY",
      "ml-IN": "DD-MM-yy",
      "mn-MN": "YYYY.MM.DD",
      "mn-Mong-CN": "YYYY/M/DD",
      "moh-CA": "M/DD/YYYY",
      "mr-IN": "DD-MM-YYYY",
      "ms-BN": "DD/MM/YYYY",
      "ms-MY": "DD/MM/YYYY",
      "mt-MT": "DD/MM/YYYY",
      "nb-NO": "DD.MM.YYYY",
      "ne-NP": "MM/DD/YYYY",
      "nl-BE": "DD/MM/YYYY",
      "nl-NL": "DD-MM-YYYY",
      "nn-NO": "DD.MM.YYYY",
      "nso-ZA": "YYYY/MM/DD",
      "oc-FR": "DD/MM/YYYY",
      "or-IN": "DD-MM-YYYY",
      "pa-IN": "DD-MM-YYYY",
      "pl-PL": "DD.MM.YYYY",
      "prs-AF": "DD/MM/YYYY",
      "ps-AF": "DD/MM/YYYY",
      "pt-BR": "DD/MM/YYYY",
      "pt-PT": "DD-MM-YYYY",
      "qut-GT": "DD/MM/YYYY",
      "quz-BO": "DD/MM/YYYY",
      "quz-EC": "DD/MM/YYYY",
      "quz-PE": "DD/MM/YYYY",
      "rm-CH": "DD/MM/YYYY",
      "ro-RO": "DD.MM.YYYY",
      "ru-RU": "DD.MM.YYYY",
      "rw-RW": "MM/DD/YYYY",
      "sa-IN": "DD-MM-YYYY",
      "sah-RU": "MM.DD.YYYY",
      "se-FI": "DD.MM.YYYY",
      "se-NO": "DD.MM.YYYY",
      "se-SE": "YYYY-MM-DD",
      "si-LK": "YYYY-MM-DD",
      "sk-SK": "dD.MM.YYYY",
      "sl-SI": "DD.MM.YYYY",
      "sma-NO": "DD.MM.YYYY",
      "sma-SE": "YYYY-MM-DD",
      "smj-NO": "DD.MM.YYYY",
      "smj-SE": "YYYY-MM-DD",
      "smn-FI": "DD.MM.YYYY",
      "sms-FI": "DD.MM.YYYY",
      "sq-AL": "YYYY-MM-DD",
      "sr-Cyrl-BA": "DD.MM.YYYY",
      "sr-Cyrl-CS": "DD.MM.YYYY",
      "sr-Cyrl-ME": "DD.MM.YYYY",
      "sr-Cyrl-RS": "DD.MM.YYYY",
      "sr-Latn-BA": "DD.MM.YYYY",
      "sr-Latn-CS": "DD.MM.YYYY",
      "sr-Latn-ME": "DD.MM.YYYY",
      "sr-Latn-RS": "DD.MM.YYYY",
      "sv-FI": "DD.MM.YYYY",
      "sv-SE": "YYYY-MM-DD",
      "sw-KE": "M/DD/YYYY",
      "syr-SY": "DD/MM/YYYY",
      "ta-IN": "DD-MM-YYYY",
      "te-IN": "DD-MM-YYYY",
      "tg-Cyrl-TJ": "DD.MM.YYYY",
      "th-TH": "d/M/YYYY",
      "tk-TM": "DD.MM.YYYY",
      "tn-ZA": "YYYY/MM/DD",
      "tr-TR": "DD.MM.YYYY",
      "tt-RU": "DD.MM.YYYY",
      "tzm-Latn-DZ": "DD-MM-YYYY",
      "ug-CN": "YYYY-MM-DD",
      "uk-UA": "DD.MM.YYYY",
      "ur-PK": "DD/MM/YYYY",
      "uz-Cyrl-UZ": "DD.MM.YYYY",
      "uz-Latn-UZ": "DD/MM YYYY",
      "vi-VN": "DD/MM/YYYY",
      "wo-SN": "DD/MM/YYYY",
      "xh-ZA": "YYYY/MM/DD",
      "yo-NG": "DD/MM/YYYY",
      "zh-CN": "YYYY/M/d",
      "zh-HK": "DD/MM/YYYY",
      "zh-MO": "DD/MM/YYYY",
      "zh-SG": "DD/MM/YYYY",
      "zh-TW": "YYYY/MM/DD",
      "zu-ZA": "YYYY/MM/DD",
    };
  
    return formats[navigator.language] || "DD/MM/YYYY";
  }