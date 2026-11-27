import { GuestWish } from '../config/weddingConfig';

export type AttendanceStatus = 'attending' | 'declined';

export interface RsvpPayload {
  slug: string;
  name: string;
  attendance: AttendanceStatus;
  guestCount: number;
  message: string;
  submittedAt: string;
  honeypot?: string;
}

export interface RsvpSubmitResult {
  ok: boolean;
  mode: 'api' | 'mock';
  message: string;
}

const STORAGE_KEY_PREFIX = 'wedding_rsvp_mock_v1_';

function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_RSVP_API_URL as string | undefined;
  return envUrl ? envUrl.trim() : '';
}

export async function submitRsvp(payload: RsvpPayload): Promise<RsvpSubmitResult> {
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return { ok: true, mode: 'mock', message: 'Recorded' };
  }

  const apiUrl = getApiBaseUrl();

  if (apiUrl) {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        slug: payload.slug,
        name: payload.name,
        attendance: payload.attendance,
        guestCount: payload.guestCount,
        message: payload.message,
        submittedAt: payload.submittedAt,
      }),
    });

    if (!response.ok) {
      throw new Error(`RSVP request failed (${response.status})`);
    }

    return {
      ok: true,
      mode: 'api',
      message: 'RSVP sent successfully.',
    };
  }

  // Phase 1 mock persistence in localStorage (ready for Phase 2 backend swap)
  await new Promise((resolve) => window.setTimeout(resolve, 450));
  try {
    const key = `${STORAGE_KEY_PREFIX}${payload.slug}`;
    const existingRaw = window.localStorage.getItem(key);
    const existing: RsvpPayload[] = existingRaw ? (JSON.parse(existingRaw) as RsvpPayload[]) : [];
    existing.unshift({
      slug: payload.slug,
      name: payload.name,
      attendance: payload.attendance,
      guestCount: payload.guestCount,
      message: payload.message,
      submittedAt: payload.submittedAt,
    });
    window.localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
  } catch {
    // Ignore storage quota / private mode errors
  }

  return {
    ok: true,
    mode: 'mock',
    message: 'RSVP saved locally (Phase 1 preview mode).',
  };
}

export async function fetchApprovedWishes(
  slug: string,
  fallbackWishes: GuestWish[]
): Promise<GuestWish[]> {
  const apiUrl = getApiBaseUrl();
  if (!apiUrl) {
    try {
      const key = `${STORAGE_KEY_PREFIX}${slug}`;
      const existingRaw = window.localStorage.getItem(key);
      if (!existingRaw) return fallbackWishes;
      const stored = JSON.parse(existingRaw) as RsvpPayload[];
      const userWishes: GuestWish[] = stored
        .filter((item) => item.message.trim().length > 2)
        .map((item, idx) => ({
          id: `local-${idx}-${item.submittedAt}`,
          quote: `“${item.message.trim()}”`,
          author: item.name.trim(),
          lang: /[\u0D80-\u0DFF]/.test(item.message) ? 'si' : 'en',
        }));
      return [...userWishes, ...fallbackWishes];
    } catch {
      return fallbackWishes;
    }
  }

  try {
    const url = new URL(apiUrl);
    url.searchParams.set('slug', slug);
    const res = await fetch(url.toString());
    if (!res.ok) return fallbackWishes;
    const data = (await res.json()) as { wishes?: GuestWish[] };
    if (Array.isArray(data.wishes) && data.wishes.length > 0) {
      return [...data.wishes, ...fallbackWishes];
    }
    return fallbackWishes;
  } catch {
    return fallbackWishes;
  }
}

export function buildGoogleCalendarUrl(params: {
  title: string;
  details: string;
  location: string;
  startIso: string;
  endIso: string;
}): string {
  const toUtcCompact = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const query = new URLSearchParams({
    action: 'TEMPLATE',
    text: params.title,
    dates: `${toUtcCompact(params.startIso)}/${toUtcCompact(params.endIso)}`,
    details: params.details,
    location: params.location,
  });
  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}
