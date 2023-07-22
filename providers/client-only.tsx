"use client";

import { useEffect, useState } from "react";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return <>{children}</>;
}

export default ClientOnly;
