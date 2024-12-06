import type { AppInfo } from '@/types/app'
// export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

let app_id = 'default_app_id'
if (typeof window !== 'undefined') {
  if (getCookie('APP_ID')) {
    app_id = getCookie('APP_ID') as string
  } else {
    app_id = Math.random().toString(36).substring(2, 10)
    setCookie('APP_ID', app_id, 1000)
  }
}
export const APP_ID = app_id

export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const APP_INFO: AppInfo = {
  title: 'MBF 智能助手',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'zh-Hans',
}

export const isShowPrompt = true
export const promptTemplate = '我可以根据提问检索MBF文档，为你提供有用的信息。'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
