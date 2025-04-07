'use client'

import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type FileUploaderProps = {
  label?: string
  accept?: string
  onFileSelect: (file: File | null) => void
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label = 'Upload File',
  accept = '*',
  onFileSelect
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onFileSelect(file)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-base font-medium">{label}</Label>
      <div className="flex items-center gap-4">
        <Button type="button" onClick={handleButtonClick}>
          Choose File
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}
