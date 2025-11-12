import { useState, useCallback } from "react";

export interface UseModalHooks {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function useModal(): UseModalHooks {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
