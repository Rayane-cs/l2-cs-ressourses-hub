import * as React from "react";
import { cn } from "@/lib/utils";

/** Centred page shell: max 1400px with the 8px-rhythm gutters. */
const PageContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("ds-container", className)} {...props} />,
);
PageContainer.displayName = "PageContainer";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

/** Compact page title block — no oversized hero. */
const PageHeader = ({ title, description, actions, className, ...props }: PageHeaderProps) => (
  <div
    className={cn("flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between", className)}
    {...props}
  >
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
    {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
  </div>
);
PageHeader.displayName = "PageHeader";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

/** Titled content block used to build dense dashboard layouts. */
const Section = ({ title, description, actions, className, children, ...props }: SectionProps) => (
  <section className={cn("space-y-4", className)} {...props}>
    {(title || actions) && (
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          {title ? <h2 className="text-lg font-semibold tracking-tight">{title}</h2> : null}
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    )}
    {children}
  </section>
);
Section.displayName = "Section";

interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

/** Navigation entry styled from the `--nav-item-*` tokens. */
const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ className, active = false, ...props }, ref) => (
    <a ref={ref} data-active={active} className={cn("ds-nav-item", className)} {...props} />
  ),
);
NavItem.displayName = "NavItem";

export { PageContainer, PageHeader, Section, NavItem };
