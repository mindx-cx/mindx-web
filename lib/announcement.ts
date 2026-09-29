// Shared by the server layout (inline head script) and the client
// AnnouncementBar. Must not live in a 'use client' module: the server would
// receive a client reference instead of the string.
import { announcement } from '@/content/site';

export const ANNOUNCEMENT_STORAGE_KEY = 'mx_announcement_dismissed';

/**
 * Inline script for <head>: hides the bar before first paint if this
 * announcement was dismissed, so returning visitors see no layout jump.
 */
export const announcementScript = `try{if(localStorage.getItem('${ANNOUNCEMENT_STORAGE_KEY}')==='${announcement.id}')document.documentElement.setAttribute('data-ann-dismissed','')}catch(e){}`;
