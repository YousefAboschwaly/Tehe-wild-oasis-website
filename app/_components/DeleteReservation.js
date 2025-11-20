"use client"

import { TrashIcon } from "@heroicons/react/24/solid"
import { useTransition } from "react"
import { deleteReservation } from "../_lib/actions"
import { useConfirmModal, ConfirmModal } from "./ConfirmModal"
import SpinnerMini from "./SpinnerMini"

function DeleteReservation({ bookingId , onDelete }) {
  const [isPending, startTransition] = useTransition()
  const { isOpen, dialog, isLoading, confirm, cancel } = useConfirmModal()

  function handleDelete() {
    confirm({
      title: "Delete Reservation",
      message: "Are you sure you want to delete this reservation? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      isDangerous: true,
      onConfirm: () => {
        startTransition(() => onDelete(bookingId))
      },
    })
  }

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        dialog={dialog}
        isLoading={isLoading}
        onConfirm={() => dialog?.onConfirm()}
        onCancel={cancel}
      />

      <button
        onClick={handleDelete}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 cursor-pointer"
      >
        {isPending ? (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        ) : (
          <>
            <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Delete</span>
          </>
        )}
      </button>
    </>
  )
}

export default DeleteReservation
