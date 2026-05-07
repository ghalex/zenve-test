import { useId, useRef } from 'react'
import { ImagePlus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { getDisplayInitials } from '@/lib/utils'

interface AvatarUploaderProps {
  avatarUrl: string | null
  displayName: string
  disabled?: boolean
  isUploading?: boolean
  onFileSelect: (file: File | null) => void
  onRemove: () => void
}

export default function AvatarUploader({
  avatarUrl,
  displayName,
  disabled = false,
  isUploading = false,
  onFileSelect,
  onRemove,
}: AvatarUploaderProps) {
  const inputId = useId()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const hasAvatar = Boolean(avatarUrl)
  const initials = getDisplayInitials(displayName)

  const renderAvatar = () => (
    <div className="flex items-center gap-4">
      <div className="flex size-20 items-center justify-center overflow-hidden rounded-md border border-border/80 bg-background/80 text-lg font-medium text-foreground shadow-sm">
        {hasAvatar ? (
          <img src={avatarUrl ?? ''} alt={`${displayName} avatar`} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor={inputId}>Avatar</FieldLabel>
        <div className="flex flex-wrap gap-2">
          <input
            id={inputId}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={disabled}
            onChange={(event) => {
              onFileSelect(event.target.files?.[0] ?? null)
            }}
          />
          <Button
            type="button"
            variant="outline"
            className="rounded-md bg-background/70"
            disabled={disabled}
            onClick={() => {
              fileInputRef.current?.click()
            }}
          >
            <ImagePlus className="size-4" />
            {hasAvatar ? 'Replace avatar' : 'Choose avatar'}
          </Button>
          <Button type="button" variant="ghost" className="rounded-md" disabled={disabled || !hasAvatar} onClick={onRemove}>
            <Trash2 className="size-4" />
            Remove
          </Button>
        </div>
        <FieldDescription>
          {isUploading ? 'Uploading the selected image during save.' : 'Use a square image for the clearest host profile.'}
        </FieldDescription>
      </div>
    </div>
  )

  const renderMain = () => <FieldGroup className="gap-3">{renderAvatar()}</FieldGroup>

  return renderMain()
}
