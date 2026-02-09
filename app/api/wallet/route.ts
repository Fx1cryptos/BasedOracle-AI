import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const moralisApiKey = process.env.MORALIS_API_KEY;

    if (!moralisApiKey) {
      return NextResponse.json(
        { error: 'Moralis API key not configured' },
        { status: 500 }
      );
    }

    // Fetch wallet balance
    const balanceResponse = await fetch(
      `https://deep-index.moralis.io/api/v2/${address}?chain=base`,
      {
        headers: {
          accept: 'application/json',
          'X-API-Key': moralisApiKey,
        },
      }
    );

    if (!balanceResponse.ok) {
      throw new Error('Failed to fetch wallet data');
    }

    const walletData = await balanceResponse.json();

    // Fetch portfolio
    const portfolioResponse = await fetch(
      `https://deep-index.moralis.io/api/v2/${address}/token?chain=base`,
      {
        headers: {
          accept: 'application/json',
          'X-API-Key': moralisApiKey,
        },
      }
    );

    let tokens = [];
    if (portfolioResponse.ok) {
      const portfolioData = await portfolioResponse.json();
      tokens = portfolioData.result || [];
    }

    return NextResponse.json({
      address,
      balance: walletData.balance,
      nativeBalance: walletData.native_balance,
      tokens,
    });
  } catch (error) {
    console.error('[v0] Wallet API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet data' },
      { status: 500 }
    );
  }
}
