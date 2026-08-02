import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Strapi Webhook & On-Demand ISR Revalidation Endpoint
 * Triggered by Strapi Webhook when content is created/updated/deleted.
 * 
 * Usage:
 * POST /api/revalidate?secret=YOUR_REVALIDATION_SECRET&tag=home-page
 * Or Body: { "secret": "...", "tag": "home-page", "path": "/" }
 */
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const querySecret = searchParams.get('secret');
    const queryTag = searchParams.get('tag');
    const queryPath = searchParams.get('path');

    let bodySecret = '';
    let bodyTag = '';
    let bodyPath = '';

    try {
      const body = await request.json();
      bodySecret = body?.secret || body?.event || '';
      bodyTag = body?.tag || body?.model || '';
      bodyPath = body?.path || '';
    } catch {
      // Body parse optional if using query params
    }

    const secret = querySecret || bodySecret;
    const tag = queryTag || bodyTag;
    const path = queryPath || bodyPath;

    const expectedSecret = process.env.REVALIDATION_SECRET || 'good_choice_revalidation_secret_2026';

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid revalidation secret token' },
        { status: 401 }
      );
    }

    if (tag) {
      revalidateTag(tag, { expire: 0 });
      return NextResponse.json({
        revalidated: true,
        type: 'tag',
        target: tag,
        now: Date.now(),
      });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        type: 'path',
        target: path,
        now: Date.now(),
      });
    }

    // Default fallback: revalidate global-settings if model is updated
    revalidateTag('global-settings', { expire: 0 });
    return NextResponse.json({
      revalidated: true,
      type: 'tag',
      target: 'global-settings',
      now: Date.now(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown revalidation error';
    return NextResponse.json(
      { message: 'Error revalidating cache', error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
