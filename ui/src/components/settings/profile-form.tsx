import { useEffect, useMemo, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { uploadAvatar } from '@/lib/avatar-upload'
import { getErrorMessage, isValidDisplayName } from '@/lib/utils'
import AvatarUploader from '@/components/settings/avatar-uploader'
import { selectCurrentUser } from '@/store/auth'
import { useAppSelector } from '@/store/hooks'
import { useGetSettingsProfileQuery, useUpdateSettingsProfileMutation } from '@/store/settings'

export default function ProfileForm() {
  const currentUser = useAppSelector(selectCurrentUser)
  const { data: profile, error: profileError, isLoading: isProfileLoading, isFetching: isProfileFetching, refetch } =
    useGetSettingsProfileQuery()
  const [updateSettingsProfile, { isLoading: isSavingProfile }] = useUpdateSettingsProfileMutation()
  const [draftName, setDraftName] = useState<string | null>(null)
  const [draftAvatarUrl, setDraftAvatarUrl] = useState<string | null | undefined>(undefined)
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const name = draftName ?? profile?.name ?? ''
  const persistedAvatarUrl = draftAvatarUrl !== undefined ? draftAvatarUrl : (profile?.avatarUrl ?? null)
  const avatarPreviewUrl = useMemo(() => (selectedAvatarFile ? URL.createObjectURL(selectedAvatarFile) : null), [selectedAvatarFile])
  const avatarUrl = avatarPreviewUrl ?? persistedAvatarUrl
  const trimmedName = name.trim()
  const displayName = trimmedName || 'Host'
  const isNameValid = isValidDisplayName(name)
  const isSaving = isSavingProfile || isUploadingAvatar
  const hasProfile = Boolean(profile)
  const hasChangedName = trimmedName !== (profile?.name ?? '')
  const hasChangedAvatar = persistedAvatarUrl !== (profile?.avatarUrl ?? null) || selectedAvatarFile !== null
  const hasPendingChanges = hasChangedName || hasChangedAvatar
  const isSaveDisabled = !hasProfile || !isNameValid || !hasPendingChanges || isSaving || isProfileFetching

  useEffect(() => {
    if (!avatarPreviewUrl) {
      return undefined
    }

    return () => {
      URL.revokeObjectURL(avatarPreviewUrl)
    }
  }, [avatarPreviewUrl])

  const renderFeedback = () => (
    <div className="space-y-3">
      {errorMessage ? (
        <div className="rounded-md border border-destructive/25 bg-destructive/8 px-3 py-3 text-sm text-destructive">{errorMessage}</div>
      ) : null}
      {successMessage ? (
        <div className="rounded-md border border-primary/20 bg-primary/8 px-3 py-3 text-sm text-foreground">{successMessage}</div>
      ) : null}
    </div>
  )

  const renderLoadingState = () => (
    <Card className="editorial-panel border-border/80 bg-card/95">
      <CardHeader>
        <span className="editorial-eyebrow">profile</span>
        <CardTitle className="font-editorial text-3xl text-foreground">Loading your settings</CardTitle>
        <CardDescription className="text-sm leading-6 text-muted-foreground">
          Pulling in your current name and avatar before editing begins.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin" />
        Preparing profile details...
      </CardContent>
    </Card>
  )

  const renderErrorState = () => (
    <Card className="editorial-panel border-border/80 bg-card/95">
      <CardHeader>
        <span className="editorial-eyebrow">profile</span>
        <CardTitle className="font-editorial text-3xl text-foreground">Profile settings are unavailable</CardTitle>
        <CardDescription className="text-sm leading-6 text-muted-foreground">
          {getErrorMessage(profileError, 'We could not load your settings right now.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="button" variant="outline" className="rounded-md bg-background/70" onClick={() => void refetch()}>
          Try again
        </Button>
      </CardContent>
    </Card>
  )

  const renderForm = () => (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (!isValidDisplayName(name)) {
          setSuccessMessage(null)
          setErrorMessage('Enter a display name between 1 and 80 characters.')
          return
        }

        void (async () => {
          try {
            setErrorMessage(null)
            setSuccessMessage(null)

            let nextAvatarUrl = avatarUrl

            if (selectedAvatarFile) {
              setIsUploadingAvatar(true)
              nextAvatarUrl = await uploadAvatar(selectedAvatarFile, currentUser?.id ?? 'mock-host')
              setIsUploadingAvatar(false)
            }

            const savedProfile = await updateSettingsProfile({
              name: trimmedName,
              avatarUrl: nextAvatarUrl,
            }).unwrap()

            setDraftName(savedProfile.name)
            setDraftAvatarUrl(savedProfile.avatarUrl)
            setSelectedAvatarFile(null)
            setSuccessMessage('Profile saved successfully.')
          } catch (error) {
            setIsUploadingAvatar(false)
            setSuccessMessage(null)
            setErrorMessage(getErrorMessage(error, 'Unable to save your profile right now.'))
          }
        })()
      }}
    >
      <FieldGroup className="gap-6">
        <AvatarUploader
          avatarUrl={avatarPreviewUrl ?? avatarUrl}
          displayName={displayName}
          disabled={isSaving}
          isUploading={isUploadingAvatar}
          onFileSelect={(file) => {
            setSuccessMessage(null)

            if (!file) {
              setSelectedAvatarFile(null)
              return
            }

            if (!file.type.startsWith('image/')) {
              setErrorMessage('Choose an image file for the avatar.')
              return
            }

            setErrorMessage(null)
            setDraftAvatarUrl(persistedAvatarUrl)
            setSelectedAvatarFile(file)
          }}
          onRemove={() => {
            setErrorMessage(null)
            setSuccessMessage(null)
            setSelectedAvatarFile(null)
            setDraftAvatarUrl(null)
          }}
        />
        <Field>
          <FieldLabel htmlFor="settings-name">Display name</FieldLabel>
          <Input
            id="settings-name"
            value={name}
            maxLength={80}
            autoComplete="name"
            aria-invalid={!isNameValid}
            className="rounded-md bg-background/70"
            onChange={(event) => {
              setSuccessMessage(null)
              setErrorMessage(null)
              setDraftName(event.target.value)
            }}
          />
          <FieldDescription>This name appears across your host-facing scheduling presence.</FieldDescription>
          <FieldError errors={!isNameValid ? [{ message: 'Display name must contain 1 to 80 characters after trimming.' }] : undefined} />
        </Field>
        {renderFeedback()}
        <Field>
          <Button type="submit" variant="outline" className="w-full rounded-md bg-background/70 sm:w-auto" disabled={isSaveDisabled}>
            {isSaving ? <LoaderCircle className="size-4 animate-spin" /> : null}
            Save profile
          </Button>
          <FieldDescription>Changes stay on this page after save so you can confirm the latest profile state.</FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )

  const renderContent = () => {
    if (isProfileLoading) {
      return renderLoadingState()
    }

    if (profileError && !profile) {
      return renderErrorState()
    }

    return (
      <Card className="editorial-panel border-border/80 bg-card/95">
        <CardHeader className="space-y-3 text-left">
          <span className="editorial-eyebrow">profile</span>
          <CardTitle className="font-editorial text-3xl text-foreground">Host settings</CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Keep your public booking identity accurate by updating the display name and avatar guests see.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderForm()}</CardContent>
      </Card>
    )
  }

  const renderMain = () => <section>{renderContent()}</section>

  return renderMain()
}
