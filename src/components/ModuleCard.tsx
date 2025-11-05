import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ModuleCardProps {
  title: string;
  slug: string;
  icon: React.ElementType; // Changed to React.ElementType to accept both LucideIcon and react-icons IconType
  color: string;
  /** Optional override for the link target. If not provided, falls back to /module/:slug */
  to?: string;
}

const ModuleCard = ({ title, slug, icon: Icon, color, to }: ModuleCardProps) => {
  return (
    <Link to={to ?? `/module/${slug}`}>
      <Card className="group hover:shadow-hover transition-smooth hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary">
        <CardContent className="p-8 text-center relative">
          <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-10 transition-smooth`} />
          
          <div className={`inline-flex p-4 rounded-2xl ${color} bg-opacity-10 mb-4 group-hover:scale-110 transition-smooth`}>
            <Icon className={`h-12 w-12 ${color.replace('bg-', 'text-')}`} />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth">
            {title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ModuleCard;
