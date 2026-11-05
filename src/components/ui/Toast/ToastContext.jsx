"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import Toast from "./Toast";

import * as styles from "./Toast.css";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ duration = 2500, message, type = "warning" }) => {
      const id = Date.now() + Math.random().toString(36).substring(2, 9);
      const newToast = { duration, id, message, type };

      // 새 토스트 표시 (기존 목록에 추가)
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast],
  );

  const contextValue = useMemo(
    () => ({
      error: (message, duration) => showToast({ duration, message, type: "error" }),
      remove: removeToast,
      show: showToast,
      success: (message, duration) => showToast({ duration, message, type: "success" }),
      warning: (message, duration) => showToast({ duration, message, type: "warning" }),
    }),
    [showToast, removeToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts.length > 0 && (
        <div aria-live="polite" className={styles.toastContainer}>
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} type={toast.type} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 내부에서만 사용됩니다.");
  }
  return context;
}
