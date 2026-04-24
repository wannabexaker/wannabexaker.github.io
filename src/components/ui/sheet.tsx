"use client";

import * as React from "react";
import ReactDOM from "react-dom";

import { cn } from "@/lib/utils";

type SheetContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SheetContext = React.createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const context = React.useContext(SheetContext);

  if (!context) {
    throw new Error("Sheet components must be used within <Sheet>");
  }

  return context;
}

function Sheet({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen: React.Dispatch<React.SetStateAction<boolean>> = (next) => {
    const value = typeof next === "function" ? next(open) : next;

    if (controlledOpen === undefined) {
      setUncontrolledOpen(value);
    }

    onOpenChange?.(value);
  };

  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

function SheetTrigger({
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpen } = useSheetContext();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  );
}

function SheetClose({
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpen } = useSheetContext();

  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </button>
  );
}

function SheetOverlay({ className, ...props }: React.ComponentProps<"div">) {
  const { open, setOpen } = useSheetContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return ReactDOM.createPortal(
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[200] bg-black/65 backdrop-blur-[2px]",
        className,
      )}
      onClick={() => setOpen(false)}
      {...props}
    />,
    document.body,
  );
}

function SheetContent({
  className,
  side = "right",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
}) {
  const { open } = useSheetContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed top-0 z-[210] h-full w-[86%] max-w-sm p-6 shadow-2xl",
        side === "right"
          ? "right-0 animate-[slideInRight_0.22s_ease-out]"
          : "left-0 animate-[slideInLeft_0.22s_ease-out]",
        className,
      )}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-4", className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("font-heading text-lg font-semibold text-foreground", className)} {...props} />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
};
