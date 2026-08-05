const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface FetchOptions extends RequestInit {
  tags?: string[];
  revalidate?: number | false;
}

/**
 * Universal Layer 1 Strapi REST API Fetcher
 * Implements Tag-Based Data Cache for Zero DB Hit & On-Demand ISR.
 */
export async function fetchStrapiAPI<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<{ data: T | null; error: string | null }> {
  const { tags = [], revalidate = false, headers = {}, ...rest } = options;

  const url = `${STRAPI_URL}/api/v1${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    ...(headers as Record<string, string>),
  };

  try {
    const res = await fetch(url, {
      headers: defaultHeaders,
      next: {
        tags: tags.length > 0 ? tags : ['global-settings'],
        revalidate,
      },
      ...rest,
    });

    if (!res.ok) {
      return {
        data: null,
        error: `Strapi API Error: ${res.status} ${res.statusText} at ${endpoint}`,
      };
    }

    const json = await res.json();
    return { data: json.data ?? json, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to connect to Strapi API';
    return { data: null, error: message };
  }
}

/**
 * Get full Cloudinary or Strapi asset URL
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/images/') || url.startsWith('/icons/') || url.startsWith('/fonts/')) return url;
  if (url.startsWith('/uploads/')) return `${STRAPI_URL}${url}`;
  return url.startsWith('/') ? url : `${STRAPI_URL}/${url}`;
}

