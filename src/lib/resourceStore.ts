import defaultResources from "./resources";

export type Resource = {
  id: string;
  title: string;
  type: string;
  driveUrl: string;
  uploadedBy?: string;
  semester?: string;
};

const STORAGE_KEY = "uhbc:resources";

function loadLocal(): Record<string, Resource[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, Resource[]>;
  } catch (e) {
    console.error("Failed to parse local resources", e);
    return {};
  }
}

function saveLocal(data: Record<string, Resource[]>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save local resources", e);
  }
}

export function getResources(): Record<string, Resource[]> {
  // merge default resources from bundle with local overrides
  const local = loadLocal();
  const merged: Record<string, Resource[]> = { ...defaultResources } as any;

  Object.keys(local).forEach((module) => {
    if (!merged[module]) merged[module] = [];
    // prepend local entries so they appear first
    merged[module] = [...local[module], ...merged[module]];
  });

  return merged;
}

export function addResource(moduleSlug: string, resource: Resource) {
  const local = loadLocal();
  if (!local[moduleSlug]) local[moduleSlug] = [];
  local[moduleSlug].unshift(resource);
  saveLocal(local);
}

export function getModules(): string[] {
  const local = loadLocal();
  const keys = new Set<string>([...Object.keys(defaultResources), ...Object.keys(local)]);
  return Array.from(keys);
}

export default {
  getResources,
  addResource,
  getModules,
};
