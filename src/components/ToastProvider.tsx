'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import SwipeToast from './reactbits/SwipeToast';

export interface ToastOptions {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  duration?: number;
  fuseColor?: string;
  background?: string;
  color?: string;
  fuse?: 'bottom' | 'top' | 'none';
  closeButton?: boolean;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = options.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts(prev => {
      // replace if same id exists, otherwise append
      const filtered = prev.filter(t => t.id !== id);
      // Keep maximum 2 active toasts so they never stack awkwardly across the screen
      const next = [...filtered, { ...options, id }];
      return next.slice(-2);
    });
    return id;
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div
        className="fixed bottom-6 right-4 sm:right-6 z-[9999999] flex flex-col items-end gap-2.5 pointer-events-none w-[360px] max-w-[calc(100vw-32px)]"
        aria-live="polite"
        role="region"
      >
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto w-full flex justify-end">
            <SwipeToast
              inline
              width={360}
              title={t.title}
              description={t.description}
              icon={t.icon}
              actionLabel={t.actionLabel}
              onAction={t.onAction}
              duration={t.duration ?? 4500}
              fuseColor={t.fuseColor ?? '#14FFEC'}
              background={t.background ?? '#18181b'}
              color={t.color ?? '#f4f4f5'}
              fuse={t.fuse ?? 'bottom'}
              closeButton={t.closeButton ?? true}
              onClose={() => dismissToast(t.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
