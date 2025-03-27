import React, { useState } from 'react'
import { AuthError } from '@supabase/supabase-js'
import { signIn, signUp, resetPassword, type UserProfile } from '../lib/auth'

interface AuthFormProps {
  onAuthSuccess: () => void
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    setError(null)

    if (!email.trim()) {
      setError('Email is required')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (!isForgotPassword) {
      if (!password.trim()) {
        setError('Password is required')
        return false
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        return false
      }
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return false
      }

      if (!firstName.trim() || !lastName.trim()) {
        setError('First name and last name are required')
        return false
      }

      if (!phoneNumber.trim()) {
        setError('Phone number is required')
        return false
      }

      // Allow for various phone number formats
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
        setError('Please enter a valid phone number')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (!validateForm()) {
        return
      }

      setIsLoading(true)
      setError(null)
      setSuccess(null)

      if (isForgotPassword) {
        const { error } = await resetPassword(email)
        if (error) throw error
        setSuccess('Password reset instructions have been sent to your email')
        return
      }

      if (isSignUp) {
        const profile: UserProfile = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phoneNumber: phoneNumber.trim()
        }

        const { user, error } = await signUp(email.trim(), password, profile)
        
        if (error) throw error
        
        setSuccess('Registration successful! Please check your email to verify your account.')
        setIsSignUp(false)
      } else {
        const { user, error } = await signIn(email.trim(), password)
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please try again or click "Forgot password" if you need to reset it.')
          }
          throw error
        }
        
        onAuthSuccess()
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setError(null)
    setSuccess(null)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFirstName('')
    setLastName('')
    setPhoneNumber('')
    setIsForgotPassword(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isForgotPassword 
              ? 'Reset your password'
              : isSignUp 
                ? 'Create your account' 
                : 'Sign in to your account'}
          </h2>
          {!isForgotPassword && !isSignUp && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Please sign in with your email and password
            </p>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{success}</div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
            {isSignUp && !isForgotPassword && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="first-name" className="sr-only">First Name</label>
                    <input
                      id="first-name"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="First Name"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="sr-only">Last Name</label>
                    <input
                      id="last-name"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Last Name"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone-number" className="sr-only">Phone Number</label>
                  <input
                    id="phone-number"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Phone Number"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                disabled={isLoading}
              />
            </div>
            {!isForgotPassword && (
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  minLength={6}
                  disabled={isLoading}
                />
              </div>
            )}
            {isSignUp && !isForgotPassword && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  minLength={6}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading 
                ? 'Processing...' 
                : isForgotPassword
                  ? 'Send reset instructions'
                  : isSignUp 
                    ? 'Sign up' 
                    : 'Sign in'}
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-center">
            {!isForgotPassword && (
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  resetForm()
                }}
                className="text-sm text-blue-600 hover:text-blue-500"
                disabled={isLoading}
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            )}
            {!isSignUp && !isForgotPassword && (
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(true)
                  resetForm()
                }}
                className="text-sm text-blue-600 hover:text-blue-500"
                disabled={isLoading}
              >
                Forgot your password?
              </button>
            )}
            {isForgotPassword && (
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false)
                  resetForm()
                }}
                className="text-sm text-blue-600 hover:text-blue-500"
                disabled={isLoading}
              >
                Back to sign in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}