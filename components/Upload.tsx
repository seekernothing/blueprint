import { CheckCircle2, Image, Upload as UploadIcon } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router'
import {
  ALLOWED_FILE_TYPES,
  PROGRESS_INTERVAL_MS,
  PROGRESS_STEP,
  REDIRECT_DELAY_MS,
} from '../lib/constants'

interface UploadProps {
  onComplete?: (base64Image: string) => void
}

export const Upload = ({ onComplete }: UploadProps) => {
  const { isSignedIn } = useOutletContext<AuthContext>()

  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const processFile = useCallback(
    (selectedFile: File) => {
      if (!isSignedIn) return

      setFile(selectedFile)
      setProgress(0)

      const reader = new FileReader()

      reader.onload = () => {
        const base64Image = reader.result as string

        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
          setProgress((old) => {
            const next = old + PROGRESS_STEP

            if (next >= 100) {
              if (intervalRef.current) clearInterval(intervalRef.current)

              timeoutRef.current = setTimeout(() => {
                onComplete?.(base64Image)
              }, REDIRECT_DELAY_MS)

              return 100
            }

            return next
          })
        }, PROGRESS_INTERVAL_MS)
      }

      reader.onerror = () => {
        console.error('File read fail hua:', reader.error)
        setFile(null)
        setProgress(0)
      }

      reader.readAsDataURL(selectedFile)
    },
    [isSignedIn, onComplete]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!isSignedIn) return
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (!isSignedIn) return

    const droppedFile = e.dataTransfer.files[0]

    if (droppedFile && ALLOWED_FILE_TYPES.includes(droppedFile.type)) {
      processFile(droppedFile)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) processFile(selectedFile)
  }

  return (
    <div className="upload">

      {!file ? (
        <div
          className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpg,.jpeg,.png"
            disabled={!isSignedIn}
            onChange={handleChange}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>

            <p>
              {isSignedIn
                ? 'Click to upload or just drag and drop'
                : 'Sign in or sign up with Puter to upload'}
            </p>

            <p className="help">Maximum file size is 10MB</p>
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 className="check" />
              ) : (
                <Image className="image" />
              )}
            </div>

            <h3>{file.name}</h3>

            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />
            </div>

            <p className="status-text">
              {progress < 100 ? 'Analyzing floor plan...' : 'Redirecting'}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
