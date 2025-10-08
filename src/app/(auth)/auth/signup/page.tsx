"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Mail, Lock, User, ArrowRight, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from "@/store/auth-store"
import { getPasswordStrength } from "@/utils/getPasswordStrength"

export default function SignUpPage() {
  const router = useRouter()
  const { formData, updateField, signUp, isLoading, error } = useAuthStore()
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms) {
      // You might want to update your store to handle this kind of error
      console.error("You must agree to the terms and conditions")
      return
    }
    try {
      await signUp()
      router.push("/auth/signin")
    } catch (error) {
      // Error is already handled in the store
      console.log("Sign up error:", error)
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const passwordStrengthText = ["Weak", "Fair", "Good", "Strong"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 flex items-center justify-between bg-white shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">TeamPortal</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">Enter your information to create your account</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      required
                    />
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">Password strength:</span>
                        <span
                          className={`text-xs font-medium ${passwordStrength === 0
                            ? "text-red-500"
                            : passwordStrength === 1
                              ? "text-orange-500"
                              : passwordStrength === 2
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                        >
                          {passwordStrengthText[passwordStrength]}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength === 0
                            ? "bg-red-500 w-1/4"
                            : passwordStrength === 1
                              ? "bg-orange-500 w-2/4"
                              : passwordStrength === 2
                                ? "bg-yellow-500 w-3/4"
                                : "bg-green-500 w-full"
                            }`}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-1 text-xs">
                          <div
                            className={`w-3 h-3 rounded-full flex items-center justify-center ${formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"}`}
                          >
                            {formData.password.length >= 8 && <Check className="w-2 h-2 text-white" />}
                          </div>
                          <span className="text-gray-600">8+ characters</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div
                            className={`w-3 h-3 rounded-full flex items-center justify-center ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                          >
                            {/[A-Z]/.test(formData.password) && <Check className="w-2 h-2 text-white" />}
                          </div>
                          <span className="text-gray-600">Uppercase</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div
                            className={`w-3 h-3 rounded-full flex items-center justify-center ${/[0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                          >
                            {/[0-9]/.test(formData.password) && <Check className="w-2 h-2 text-white" />}
                          </div>
                          <span className="text-gray-600">Number</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div
                            className={`w-3 h-3 rounded-full flex items-center justify-center ${/[^A-Za-z0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                          >
                            {/[^A-Za-z0-9]/.test(formData.password) && <Check className="w-2 h-2 text-white" />}
                          </div>
                          <span className="text-gray-600">Special char</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" className="w-full">
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  Microsoft
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 TeamPortal. All rights reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

