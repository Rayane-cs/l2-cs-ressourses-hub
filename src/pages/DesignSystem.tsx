import { useState } from "react";
import { BookOpen, Download, Home, Search, Trash2, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavItem, PageContainer, PageHeader, Section } from "@/components/ui/layout";
import { Textarea } from "@/components/ui/textarea";
import { palette, radius, shadows, spacing } from "@/lib/design-tokens";

const colorGroups: { label: string; tokens: { name: string; cssVar: string; hex?: string }[] }[] = [
  {
    label: "Surfaces & text",
    tokens: [
      { name: "background", cssVar: "--background", hex: palette.backgroundPrimary },
      { name: "surface", cssVar: "--surface", hex: palette.backgroundSecondary },
      { name: "foreground", cssVar: "--foreground", hex: palette.textPrimary },
      { name: "muted-foreground", cssVar: "--muted-foreground", hex: palette.textSecondary },
      { name: "border", cssVar: "--border", hex: palette.border },
    ],
  },
  {
    label: "Accents & status",
    tokens: [
      { name: "primary", cssVar: "--primary", hex: palette.accentPrimary },
      { name: "accent", cssVar: "--accent", hex: palette.accentSecondary },
      { name: "success", cssVar: "--success", hex: palette.success },
      { name: "warning", cssVar: "--warning", hex: palette.warning },
      { name: "danger", cssVar: "--danger", hex: palette.danger },
    ],
  },
  {
    label: "Resource categories",
    tokens: [
      { name: "course", cssVar: "--category-course" },
      { name: "td", cssVar: "--category-td" },
      { name: "tp", cssVar: "--category-tp" },
      { name: "exam", cssVar: "--category-exam" },
      { name: "video", cssVar: "--category-video" },
    ],
  },
];

const typeScale = [
  { name: "Heading 1 · 30px bold", className: "text-3xl font-bold" },
  { name: "Heading 2 · 24px semibold", className: "text-2xl font-semibold" },
  { name: "Heading 3 · 20px semibold", className: "text-xl font-semibold" },
  { name: "Body · 16px regular", className: "text-base" },
  { name: "Small · 14px regular", className: "text-sm" },
  { name: "Caption · 12px medium", className: "text-xs font-medium uppercase tracking-wide" },
];

const DesignSystem = () => {
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-surface">
        <PageContainer className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              U
            </span>
            <span className="text-sm font-semibold">UOSPC Design System</span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "resources", label: "Resources", icon: BookOpen },
              { id: "search", label: "Search", icon: Search },
            ].map(({ id, label, icon: Icon }) => (
              <NavItem
                key={id}
                href="#"
                active={activeNav === id}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveNav(id);
                }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavItem>
            ))}
          </nav>
          <Button size="sm">Sign in</Button>
        </PageContainer>
      </header>

      <PageContainer className="pb-10">
        <PageHeader
          title="Visual language"
          description="Tokens and base components every UOSPC page is built from."
          actions={<Badge variant="secondary">v2.0.0</Badge>}
        />

        <div className="space-y-8">
          <Section title="Colour" description="Neutral base with a single blue accent; category colours tag content only.">
            <div className="grid gap-4 md:grid-cols-3">
              {colorGroups.map((group) => (
                <Card key={group.label}>
                  <CardHeader>
                    <CardTitle>{group.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {group.tokens.map((token) => (
                      <div key={token.name} className="flex items-center gap-3">
                        <span
                          className="h-8 w-8 shrink-0 rounded-md border border-border"
                          style={{ backgroundColor: `hsl(var(${token.cssVar}))` }}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{token.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {token.cssVar}
                            {token.hex ? ` · ${token.hex}` : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Typography" description="Inter, bold but restrained headings, highly readable body text.">
            <Card>
              <CardContent className="space-y-3 pt-5">
                {typeScale.map((item) => (
                  <p key={item.name} className={item.className}>
                    {item.name}
                  </p>
                ))}
              </CardContent>
            </Card>
          </Section>

          <Section title="Buttons" description="Solid blue primary, white secondary, red danger.">
            <Card>
              <CardContent className="flex flex-wrap items-center gap-3 pt-5">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">
                  <Trash2 />
                  Delete
                </Button>
                <Button variant="success">Success</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button variant="link">Link</Button>
                <Button size="icon" variant="secondary" aria-label="Download">
                  <Download />
                </Button>
                <Button size="icon-sm" variant="secondary" aria-label="Download small">
                  <Download />
                </Button>
                <Button disabled>Disabled</Button>
              </CardContent>
            </Card>
          </Section>

          <Section title="Badges" description="Status and resource-category tags.">
            <Card>
              <CardContent className="flex flex-wrap items-center gap-2 pt-5">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="muted">Muted</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Available</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="destructive">Missing</Badge>
                <Badge variant="course">Course</Badge>
                <Badge variant="td">TD</Badge>
                <Badge variant="tp">TP</Badge>
                <Badge variant="exam">Exam</Badge>
                <Badge variant="video">
                  <Video className="h-3 w-3" />
                  Video
                </Badge>
              </CardContent>
            </Card>
          </Section>

          <Section title="Cards" description="White surface, 1px border, 12px radius, subtle shadow.">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="ds-card-interactive">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>Algorithmique 2</CardTitle>
                    <Badge variant="course">Course</Badge>
                  </div>
                  <CardDescription>Semester 3 · 12 resources</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    <Download />
                    Download
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardContent className="pt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Downloads</p>
                  <p className="mt-1 text-2xl font-bold">1,248</p>
                  <p className="mt-1 text-sm text-success">+12% this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Form controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="ds-input">Module</Label>
                    <Input id="ds-input" placeholder="Search a module" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ds-textarea">Note</Label>
                    <Textarea id="ds-textarea" placeholder="Add a short note" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section title="Spacing, radius & elevation" description="8px rhythm, 6–14px radii, three shadow levels.">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Spacing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(spacing).map(([step, value]) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="w-14 text-xs text-muted-foreground">space-{step}</span>
                      <span className="h-2 rounded-sm bg-primary" style={{ width: value }} />
                      <span className="text-xs text-muted-foreground">{value}px</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Radius</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  {Object.entries(radius)
                    .filter(([name]) => name !== "full")
                    .map(([name, value]) => (
                      <div key={name} className="space-y-1 text-center">
                        <div
                          className="h-14 w-14 border border-border bg-muted"
                          style={{ borderRadius: value }}
                        />
                        <p className="text-xs text-muted-foreground">
                          {name} · {value}px
                        </p>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Elevation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.keys(shadows).map((name) => (
                    <div
                      key={name}
                      className="rounded-lg border border-border bg-surface p-3 text-xs text-muted-foreground"
                      style={{ boxShadow: shadows[name as keyof typeof shadows] }}
                    >
                      shadow-{name}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </Section>
        </div>
      </PageContainer>
    </div>
  );
};

export default DesignSystem;
