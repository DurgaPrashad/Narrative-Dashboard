"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Move } from "lucide-react"

interface DraggableChatProps {
  children: React.ReactNode
}

export function DraggableChat({ children }: DraggableChatProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const dragRef = useRef<HTMLDivElement>(null)
  const initialPositionRef = useRef({ x: 0, y: 0 })
  const dragStartPositionRef = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartPositionRef.current = { x: e.clientX, y: e.clientY }
    initialPositionRef.current = position
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartPositionRef.current.x
        const deltaY = e.clientY - dragStartPositionRef.current.y

        setPosition({
          x: initialPositionRef.current.x + deltaX,
          y: initialPositionRef.current.y + deltaY,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={dragRef}
      className="absolute shadow-lg rounded-lg bg-white overflow-hidden border border-slate-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "380px",
        cursor: isDragging ? "grabbing" : "auto",
        zIndex: 1000,
      }}
    >
      <div
        className="bg-slate-800 text-white p-3 flex items-center justify-between cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-sm font-medium">Narrative Dashboard</h2>
        <Move size={16} className="text-slate-400" />
      </div>
      <div className="p-0">{children}</div>
    </div>
  )
}
