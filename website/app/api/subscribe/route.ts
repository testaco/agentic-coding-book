import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get email service configuration from environment
    const emailService = process.env.EMAIL_SERVICE || 'buttondown'
    const apiKey = process.env.EMAIL_SERVICE_API_KEY

    if (!apiKey) {
      console.error('EMAIL_SERVICE_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Subscribe based on service
    if (emailService === 'buttondown') {
      const response = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tags: ['agentic-coding-playbook', 'part-2-notification'],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Buttondown API error:', response.status, errorData)

        // Buttondown returns 400 for already subscribed
        if (response.status === 400 && errorData.email?.[0]?.includes('already subscribed')) {
          return NextResponse.json({
            success: true,
            message: "You're already on the list!",
          })
        }

        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: "You're on the list. We'll be in touch.",
      })
    }

    // Future: Add support for other email services
    // else if (emailService === 'convertkit') { ... }
    // else if (emailService === 'substack') { ... }

    return NextResponse.json(
      { error: 'Email service not supported' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
