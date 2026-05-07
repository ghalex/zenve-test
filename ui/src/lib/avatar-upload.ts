import { getSupabaseBrowserClient } from '@/lib/supabase'

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/-+/g, '-')
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }

      reject(new Error('Unable to read the selected avatar.'))
    }

    reader.onerror = () => {
      reject(new Error('Unable to read the selected avatar.'))
    }

    reader.readAsDataURL(file)
  })
}

export async function uploadAvatar(file: File, userId: string) {
  const client = getSupabaseBrowserClient()

  if (!client) {
    return fileToDataUrl(file)
  }

  const objectPath = `${userId}/${Date.now()}-${sanitizeFileName(file.name)}`
  const { error } = await client.storage.from('avatars').upload(objectPath, file, {
    cacheControl: '3600',
    upsert: true,
  })

  if (error) {
    throw error
  }

  const { data } = client.storage.from('avatars').getPublicUrl(objectPath)

  return data.publicUrl
}
