"use client";

import { useRouter } from "next/navigation";
import { AppButton } from "../../../ui/buttons/app-button";
import { AppIcons } from "@/app/icons/_index";
import React from "react";
import { AppButtonTypes } from "@/app/components/ui/buttons/app-button.types";

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleBack = React.useCallback(() => {
    try {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    } catch {
      // In case router is unavailable for some reason, fallback to history
      if (typeof window !== "undefined") window.history.back();
    }
  }, [router]);

  return (
    <AppButton
      type={AppButtonTypes.TRANSPARENT}
      onClick={handleBack}
      className={className}
      aria-label="Voltar"
    >
      <AppIcons.ARROW size={24} aria-label="" direction="left" aria-hidden />
    </AppButton>
  );
}
