"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

function SetupPage() {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}

export default SetupPage;
