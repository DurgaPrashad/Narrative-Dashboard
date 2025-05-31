"use client"

import { useRef } from "react"
import { Monitor, MonitorOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScreenShareProps {
  isScreenSharing: boolean
  setIsScreenSharing: (value: boolean) => void
}

export function ScreenShare({ isScreenSharing, setIsScreenSharing }: ScreenShareProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      mediaStreamRef.current = stream
      setIsScreenSharing(true)

      // Handle when user stops sharing via browser UI
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare()
      }
    } catch (error) {
      console.error("Error sharing screen:", error)
      setIsScreenSharing(false)
    }
  }

  const stopScreenShare = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsScreenSharing(false)
  }

  return (
    <div className="border-t border-slate-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-slate-700">Screen Sharing</h3>
          <Button
            variant={isScreenSharing ? "destructive" : "outline"}
            size="sm"
            onClick={isScreenSharing ? stopScreenShare : startScreenShare}
            className="h-8"
          >
            {isScreenSharing ? (
              <>
                <MonitorOff className="h-4 w-4 mr-2" />
                Stop Sharing
              </>
            ) : (
              <>
                <Monitor className="h-4 w-4 mr-2" />
                Share Screen
              </>
            )}
          </Button>
        </div>

        {isScreenSharing && (
          <div className="mt-2 rounded-md overflow-hidden border border-slate-200 bg-slate-50">
            <video ref={videoRef} autoPlay muted className="w-full h-auto max-h-[200px] object-contain" />
          </div>
        )}

        {!isScreenSharing && (
          <p className="text-xs text-slate-500">
            Share your screen to allow the AI to see your business dashboards and provide more contextual insights.
          </p>
        )}
      </div>
    </div>
  )
}
