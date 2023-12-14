import { createI18n } from 'vue-i18n';
import zn from './lang/zh-CN/zh-CN';
import en from './lang/en-US/en-US';

export const LOCALE_OPTIONS = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];
const defaultLocale = localStorage.getItem('arco-locale') || 'zh-CN';

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  legacy: false,
  allowComposition: true,
  messages:{
    'zh-CN': zn,
    'en-US': en,
  }
});

export default i18n;
