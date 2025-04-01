import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition",
        variant === "outline" && "border border-gray-300",
        variant === "ghost" && "text-gray-700 hover:bg-gray-200",
        className
      )}
      {...props}
    />
  );
}
