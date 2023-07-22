"use client";

import StoreModal from "@/components/modals/store-modal";
import { useEffect, useState } from "react";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
}

export default ModalProvider;
