"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Activity } from "react"

export function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const confirm = useCallback(async (config) => {
    setDialog(config)
    setIsOpen(true)

    return new Promise((resolve) => {
      const originalOnConfirm = config.onConfirm

      config.onConfirm = async () => {
        try {
          setIsLoading(true)
          await originalOnConfirm()
          resolve(true)
          setIsOpen(false)
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
          throw error
        }
      }

      setDialog(config)
    })
  }, [])

  const cancel = useCallback(() => {
    setIsOpen(false)
    setDialog(null)
    setIsLoading(false)
  }, [])

  return {
    isOpen,
    dialog,
    isLoading,
    confirm,
    cancel,
  }
}

export function ConfirmModal({ isOpen, dialog, isLoading, onConfirm, onCancel }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCancel()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onCancel])

  if (!dialog) return null

  return (
    <Activity mode={isOpen ? "visible" : "hidden"}>
      <div
        className={`fixed inset-0 backdrop-blur-[2px] bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-300 overflow-hidden ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
        

          {/* Header with accent color */}
          <div className="px-8 py-6 border-b border-slate-700/30 bg-linear-to-r from-slate-800/50 to-slate-900/50">
            <h2 className="text-xl font-bold text-accent-400 tracking-tight">{dialog.title}</h2>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <p className="text-base text-slate-300 leading-relaxed">{dialog.message}</p>
          </div>

          {/* Actions */}
          <div className="px-8 py-6 border-t border-slate-700/30 bg-linear-to-r from-slate-900/50 to-slate-800/50 flex gap-3 justify-end">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className= "cursor-pointer px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 bg-slate-700/40 hover:bg-slate-700/60 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600/30 hover:border-slate-600/50"
            >
              {dialog.cancelText || "Cancel"}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`cursor-pointer px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border ${
                dialog.isDangerous
                  ? "bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-red-500/30 hover:border-red-500/50 shadow-lg hover:shadow-red-500/20"
                  : "bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white border-amber-500/30 hover:border-amber-500/50 shadow-lg hover:shadow-amber-500/20"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-transparent border-t-current border-r-current rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                dialog.confirmText || "Confirm"
              )}
            </button>
          </div>
        </div>
      </div>
    </Activity>
  )
}
