import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric') || 'tvl';

    // Mock analytics data
    const analyticsData: Record<string, any> = {
      tvl: {
        current: 2140000000,
        change24h: 5.2,
        change7d: 12.5,
        history: [
          { date: '2024-01-09', value: 2030000000 },
          { date: '2024-01-10', value: 2050000000 },
          { date: '2024-01-11', value: 2100000000 },
          { date: '2024-01-12', value: 2140000000 },
        ],
      },
      users: {
        current: 450000,
        change24h: 3.2,
        change7d: 15.8,
      },
      transactions: {
        current: 15000000,
        change24h: 8.5,
        change7d: 22.3,
      },
      gasPrice: {
        current: 15,
        unit: 'gwei',
        change24h: -5.2,
      },
    };

    return NextResponse.json({
      metric,
      data: analyticsData[metric] || analyticsData.tvl,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[v0] Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
