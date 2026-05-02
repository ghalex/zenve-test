import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { isSupabaseConfigured } from '@/config'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  clearAuthFeedback,
  selectAuthErrorMessage,
  selectAuthInfoMessage,
  selectAuthMode,
  selectAuthStatus,
  setAuthMode,
  signInWithPassword,
  signUp,
} from '@/store/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { cn, isValidEmail } from '@/lib/utils'

export default function AuthForm() {
  const dispatch = useAppDispatch()
  const authMode = useAppSelector(selectAuthMode)
  const authStatus = useAppSelector(selectAuthStatus)
  const authErrorMessage = useAppSelector(selectAuthErrorMessage)
  const authInfoMessage = useAppSelector(selectAuthInfoMessage)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isSignUpMode = authMode === 'sign-up'
  const isSubmitting = authStatus === 'loading'
  const hasValidEmail = isValidEmail(email)
  const hasValidPassword = password.length >= 6
  const isSubmitDisabled = !isSupabaseConfigured || !hasValidEmail || !hasValidPassword || isSubmitting
  const submitLabel = isSignUpMode ? 'Create account' : 'Sign in'
  const title = isSignUpMode ? 'Create your Zenve account' : 'Welcome back'
  const description = isSignUpMode
    ? 'Use email and password to create a host account for Zenve.'
    : 'Sign in with the email and password attached to your Zenve workspace.'
  const alternateLabel = isSignUpMode ? 'Already have an account?' : 'Need an account?'
  const alternateActionLabel = isSignUpMode ? 'Sign in' : 'Sign up'

  const renderModeToggle = () => (
    <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/80 bg-background/70 p-1">
      <Button
        type="button"
        variant={isSignUpMode ? 'ghost' : 'default'}
        className={cn('rounded-md', isSignUpMode ? 'bg-transparent text-muted-foreground' : 'shadow-sm')}
        onClick={() => {
          dispatch(setAuthMode('sign-in'))
        }}
      >
        Sign in
      </Button>
      <Button
        type="button"
        variant={isSignUpMode ? 'default' : 'ghost'}
        className={cn('rounded-md', isSignUpMode ? 'shadow-sm' : 'bg-transparent text-muted-foreground')}
        onClick={() => {
          dispatch(setAuthMode('sign-up'))
        }}
      >
        Sign up
      </Button>
    </div>
  )

  const renderFeedback = () => (
    <div className="space-y-3">
      {authErrorMessage ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-3 text-sm text-destructive">
          {authErrorMessage}
        </div>
      ) : null}
      {authInfoMessage ? (
        <div className="rounded-lg border border-primary/20 bg-primary/8 px-3 py-3 text-sm text-foreground">
          {authInfoMessage}
        </div>
      ) : null}
    </div>
  )

  const renderForm = () => (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        dispatch(clearAuthFeedback())

        if (isSignUpMode) {
          void dispatch(signUp({ email, password }))
          return
        }

        void dispatch(signInWithPassword({ email, password }))
      }}
    >
      <FieldGroup className="gap-5">
        {renderModeToggle()}
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Email access</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="auth-email">Email</FieldLabel>
          <Input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <FieldDescription>Use the address that should own this scheduling workspace.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="auth-password">Password</FieldLabel>
          <Input
            id="auth-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            placeholder="At least 6 characters"
            autoComplete={isSignUpMode ? 'new-password' : 'current-password'}
            required
          />
          <FieldDescription>
            {isSignUpMode
              ? 'Supabase email confirmation may be required before the new account can sign in.'
              : 'Passwords are validated directly with Supabase Auth.'}
          </FieldDescription>
        </Field>
        {renderFeedback()}
        <Field>
          <Button type="submit" className="w-full rounded-lg" disabled={isSubmitDisabled}>
            {isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : null}
            {submitLabel}
          </Button>
          <FieldDescription className="text-center">
            {alternateLabel}{' '}
            <button
              type="button"
              className="font-medium text-foreground underline underline-offset-4"
              onClick={() => {
                dispatch(setAuthMode(isSignUpMode ? 'sign-in' : 'sign-up'))
              }}
            >
              {alternateActionLabel}
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )

  const renderMain = () => (
    <div className="flex flex-col gap-6">
      <Card className="editorial-panel border-border/80 bg-card/95">
        <CardHeader className="space-y-3 text-left">
          <span className="editorial-eyebrow">host auth</span>
          <CardTitle className="font-editorial text-3xl text-foreground">{title}</CardTitle>
          <CardDescription className="max-w-md text-sm leading-6 text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent>{renderForm()}</CardContent>
      </Card>
      <FieldDescription className="px-3 text-center text-sm leading-6">
        Zenve uses your frontend publishable key in the browser. Never place a Supabase secret or service role key here.
      </FieldDescription>
    </div>
  )

  return renderMain()
}
