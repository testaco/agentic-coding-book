# Email Signup Setup Guide

This website uses Buttondown for email subscriptions.

## Setup Instructions

### 1. Get Your Buttondown API Key

1. Go to [Buttondown Settings](https://buttondown.email/settings)
2. Navigate to the "API" section
3. Copy your API key

### 2. Configure Environment Variables

1. Open `/workspace/website/.env.local`
2. Add your Buttondown API key:

```env
EMAIL_SERVICE=buttondown
EMAIL_SERVICE_API_KEY=your_actual_api_key_here
```

### 3. Deploy to Production

For Vercel deployment:

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add:
   - `EMAIL_SERVICE` = `buttondown`
   - `EMAIL_SERVICE_API_KEY` = `your_buttondown_api_key`

### 4. Test the Integration

1. Start the dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Scroll to the email signup form
4. Enter a test email and submit
5. Check your Buttondown dashboard to confirm the subscriber was added

## API Endpoint

The email signup uses `/api/subscribe` which:
- Validates email addresses
- Subscribes users to Buttondown
- Adds tags: `agentic-coding-playbook`, `part-2-notification`
- Handles errors gracefully
- Shows success/error messages to users

## Troubleshooting

**"Email service not configured" error:**
- Make sure `EMAIL_SERVICE_API_KEY` is set in `.env.local` (local) or Vercel environment variables (production)

**"Failed to subscribe" error:**
- Check that your Buttondown API key is valid
- Verify the API key has the correct permissions
- Check Vercel logs for detailed error messages

**User already subscribed:**
- The API handles this gracefully and shows "You're already on the list!"

## Creating the Welcome Email

In Buttondown:
1. Go to Emails → Create new email
2. Write your welcome message (suggestion below)
3. Set it as an automated welcome email in Settings

### Suggested Welcome Email

```markdown
Subject: Welcome to the Agentic Coding Playbook

Hey there,

Thanks for subscribing! You're now on the list for updates about The Agentic Coding Playbook.

**What you get:**
- Early access to new chapters as they drop
- Behind-the-scenes insights on building products with AI agents
- Practical patterns and tools you can use immediately

**What's available now:**
Part 1: Foundations is live and ready to read:
[Start Reading](https://testaco.github.io/agentic-coding-book)

**What's coming:**
- Part 2: The Playbook (6-week journey from idea to production)
- Part 3: Patterns & Tools (architecture, testing, toolchain)
- Part 4: Complete Example (real product built using the playbook)

I'll only email when there's something worth your time—no spam, no fluff.

— Chris Testa
Author, The Agentic Coding Playbook
```

## Switching Email Services (Future)

To switch to a different email service (ConvertKit, Substack, etc.):

1. Update the API route in `/workspace/website/app/api/subscribe/route.ts`
2. Add the new service logic (there's a placeholder for this)
3. Update environment variables accordingly
