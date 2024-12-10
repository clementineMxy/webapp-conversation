import { type NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID } from '@/config'

// const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  const headers = request.headers;
  const referer = headers.get('referer') || 'unknown';
  let app_id = 'default_app_id';
  if (referer !== 'unknown') {
    const refererUrl = new URL(referer);
    app_id = refererUrl.searchParams.get('appId') || 'default_app_id';
  }

  // const sessionId = request.cookies.get('session_id')?.value || v4()
  const sessionId = 'default_session_id';
  // const app_id = request.cookies.get('APP_ID')?.value || 'default_app_id'

  const userPrefix = `user_${app_id}:`
  const user = userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
