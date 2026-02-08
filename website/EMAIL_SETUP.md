# Email Signup Setup Guide

This website uses Buttondown for email subscriptions with **static GitHub Pages hosting** (no backend required).

## Setup Instructions

### 1. Get Your Buttondown Username

1. Go to [Buttondown](https://buttondown.email)
2. Your newsletter URL is: `https://buttondown.email/YOUR_USERNAME`
3. Copy the username part (e.g., if URL is `buttondown.email/agentic-coding`, username is `agentic-coding`)

### 2. Configure Environment Variable

1. Open `/workspace/website/.env.local`
2. Add your Buttondown username:

```env
NEXT_PUBLIC_BUTTONDOWN_USERNAME=your_actual_username_here
```

**Important:** This must be a `NEXT_PUBLIC_` variable so it's available in the browser (since GitHub Pages is static-only).

### 3. For Production (GitHub Pages)

The environment variable needs to be set at **build time**:

**Option A: GitHub Actions (Recommended)**
1. Go to your repository Settings → Secrets and variables → Actions
2. Add a repository variable (not secret): `NEXT_PUBLIC_BUTTONDOWN_USERNAME`
3. Set the value to your Buttondown username
4. Next deployment will pick it up automatically

**Option B: Hardcode it (Simple but less flexible)**
Edit `website/components/email-signup.tsx` and replace:
```typescript
const username = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME || "YOUR_BUTTONDOWN_USERNAME"
```
with:
```typescript
const username = "your-actual-username"
```

### 4. Test the Integration

1. Start the dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Scroll to the email signup form
4. Enter a test email and submit
5. Check your Buttondown dashboard to confirm the subscriber was added

## How It Works

- **No backend required** - Form submits directly to Buttondown's public API
- **Fully static** - Works on GitHub Pages, no server needed
- **No API keys exposed** - Uses Buttondown's public subscription endpoint
- **Tags applied** - Subscribers get tagged with `agentic-coding-playbook`

## Troubleshooting

**Form not working:**
- Check that `NEXT_PUBLIC_BUTTONDOWN_USERNAME` is set correctly
- Verify your Buttondown username by visiting `https://buttondown.email/YOUR_USERNAME`
- Check browser console for errors

**"Something went wrong" error:**
- Verify Buttondown username is correct
- Try subscribing directly at `https://buttondown.email/YOUR_USERNAME` to test

**User already subscribed:**
- The form handles this gracefully and shows "You're already on the list!"

## Creating the Welcome Email

In Buttondown:
1. Go to Settings → Emails
2. Enable "Send a welcome email to new subscribers"
3. Write your welcome message (suggestion below)

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
https://testaco.github.io/agentic-coding-book

**What's coming:**
- Part 2: The Playbook (6-week journey from idea to production)
- Part 3: Patterns & Tools (architecture, testing, toolchain)
- Part 4: Complete Example (real product built using the playbook)

I'll only email when there's something worth your time—no spam, no fluff.

— Chris Testa
Author, The Agentic Coding Playbook
```

## Technical Details

**Endpoint:** `https://buttondown.email/api/emails/embed-subscribe/{username}`

**Method:** POST with FormData

**Parameters:**
- `email`: subscriber email address
- `tag`: automatic tag (set to "agentic-coding-playbook")

**Benefits of this approach:**
- ✅ No server required (works on static hosting)
- ✅ No API keys to manage or expose
- ✅ Free tier supports 100 subscribers
- ✅ Clean UX with success/error states
- ✅ Handles duplicates gracefully
