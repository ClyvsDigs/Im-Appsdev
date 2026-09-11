import type { Motorcycle } from "@/types/motorcycle";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function DeleteMotorcycleModal({
  motorcycle,
  open,
  onClose,
  onConfirm,
  loading,
}: {
  motorcycle: Motorcycle | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}) {
  return (
    <Modal
      open={open}
      title="Delete motorcycle?"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" disabled={loading} onClick={onConfirm}>
            {loading ? "Deleting..." : "Delete Motorcycle"}
          </Button>
        </>
      }
    >
      {motorcycle && (
        <p className="text-sm leading-6 text-slate-600">
          You are about to delete{" "}
          <strong className="text-slate-900">
            {motorcycle.brand} {motorcycle.model}
          </strong>
          . This action cannot be undone.
        </p>
      )}
    </Modal>
  );
}
