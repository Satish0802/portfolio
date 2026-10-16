import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  variant?: "solid" | "ghost";
  size?: "md" | "sm";
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
  transitionTypes?: string[];
};

/** Pill button with the arrow nested in its own circle ("button-in-button"). */
export default function Btn({
  children, href, onClick, external, variant = "solid", size = "md", icon, className = "",
  type = "button", disabled, transitionTypes, ...rest
}: Props) {
  const cls = `btn btn--${variant} ${size === "sm" ? "btn--sm" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="btn__icon">{icon ?? <ArrowUpRight size={size === "sm" ? 15 : 17} strokeWidth={1.75} />}</span>
    </>
  );
  if (href && external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>{inner}</a>;
  }
  if (href) {
    return <Link href={href} className={cls} transitionTypes={transitionTypes} {...rest}>{inner}</Link>;
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{inner}</button>;
}
