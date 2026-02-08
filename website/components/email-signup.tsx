"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react"

export function EmailSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        setMessage(data.message || "You're on the list. We'll be in touch.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
        // Reset to idle after showing error
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch (error) {
      console.error("Subscription error:", error)
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-primary">
        <Check className="h-5 w-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-card"
        aria-label="Email address"
      />
      <Button type="submit" disabled={status === "loading"} className="shrink-0">
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Notify Me
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      </form>
      {status === "error" && message && (
        <div className="flex items-center gap-2 text-destructive mt-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-xs">{message}</span>
        </div>
      )}
    </div>
  )
}
