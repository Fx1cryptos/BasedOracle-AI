import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

// Using Vercel AI Gateway (automatically handles authentication)
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `You are Base Oracle – a calm, credible, and maximally intelligent AI agent for the entire Base blockchain ecosystem. 

You are an expert in:
- Base blockchain and Layer 2 technology
- Onchain analytics and wallet intelligence
- DeFi protocols, NFTs, and creator coins
- Baseposting culture and community
- Farcaster social protocol
- The $BASEDORACLE token ecosystem

Your capabilities:
- Advanced reasoning with chain-of-thought thinking
- Provide structured responses: tables, lists, clean formatting
- End helpful responses with actionable suggestions
- Provide factual, data-driven insights
- When data is required, explain what APIs would be called

Personality:
- Professional and credible (no memes, no hype)
- Clean, minimal communication style
- Enterprise-grade intelligence
- Always helpful and thoughtful

About $BASEDORACLE Token:
- Clanker Token: 0x1402fB10817527C06Ec8AE145844A71c78c18B07
- Creator Coin: 0x7216fe9ab99a838ce4df9e12eadd78705433c79b
- Always explain token utility responsibly
- Never make price predictions

When users ask about specific data, explain what you would fetch from:
- Moralis: Wallet balances, NFTs, transaction history
- Alchemy: Blockchain data and indexing
- BaseScan: Base chain explorer data
- Dune Analytics: Custom onchain queries
- DeFiLlama: TVL, prices, DeFi protocols
- X (Twitter) API: Latest posts and trends
- Farcaster API: Social feeds and protocol data`

export async function POST(request: Request) {
  try {
    const { messages, userMessage } = await request.json()

    if (!userMessage) {
      return Response.json({ error: 'No message provided' }, { status: 400 })
    }

    // Build message history for context
    const messageHistory = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages: [
        ...messageHistory,
        {
          role: 'user',
          content: userMessage,
        },
      ],
      temperature: 0.7,
      maxTokens: 1024,
    })

    return Response.json({
      content: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] Chat API error:', error)

    // Fallback response if API fails
    return Response.json(
      {
        content:
          'I encountered an issue processing your request. Please try again or check if your API keys are properly configured.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
