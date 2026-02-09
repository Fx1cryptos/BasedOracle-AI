import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'base';
    const limit = searchParams.get('limit') || '10';

    // Mock social feed data - replace with actual API integrations
    const socialFeeds: Record<string, any[]> = {
      base: [
        {
          id: '1',
          platform: 'twitter',
          author: 'Base Protocol',
          content: 'Base ecosystem growing strong with $2B+ TVL',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          engagement: { likes: 1500, retweets: 300 },
          url: 'https://twitter.com/base/status/1',
        },
        {
          id: '2',
          platform: 'farcaster',
          author: 'base.eth',
          content: 'New dApps launching on Base daily',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          engagement: { likes: 800 },
          url: 'https://warpcast.com/~base',
        },
      ],
      defi: [
        {
          id: '3',
          platform: 'twitter',
          author: 'DeFi Alerts',
          content: 'ETH crossed $2500 - largest daily gain in 2 weeks',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          engagement: { likes: 2300 },
          url: 'https://twitter.com/defi',
        },
      ],
      trending: [
        {
          id: '4',
          platform: 'farcaster',
          author: 'Crypto News',
          content: 'Bitcoin ecosystem expands with new protocols',
          timestamp: new Date(Date.now() - 2700000).toISOString(),
          engagement: { likes: 5000 },
          url: 'https://warpcast.com/~trending',
        },
      ],
    };

    const feeds = socialFeeds[type] || socialFeeds.base;
    return NextResponse.json({
      feeds: feeds.slice(0, parseInt(limit)),
      type,
    });
  } catch (error) {
    console.error('[v0] Social feed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social feeds' },
      { status: 500 }
    );
  }
}
