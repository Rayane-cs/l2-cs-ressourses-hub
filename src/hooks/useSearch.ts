
import { useMemo } from "react";
import Fuse from "fuse.js";
import type { Resource } from "@/lib/types";

// Extended Resource type to include the added 'module' string
type SearchResource = Resource & { module: string };

interface UseSearchResult {
    results: SearchResource[];
    suggestions: string[];
}

export const useSearch = (
    resources: SearchResource[],
    searchTerm: string
): UseSearchResult => {
    // Memoize the Fuse instance
    const fuse = useMemo(() => {
        return new Fuse(resources, {
            keys: [
                { name: "title", weight: 0.7 },
                { name: "module", weight: 0.2 },
                { name: "description", weight: 0.2 },
                { name: "problem", weight: 0.1 },
            ],
            threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything
            includeScore: true,
            shouldSort: true,
            ignoreLocation: true, // Find matches anywhere in the string
            minMatchCharLength: 2,
        });
    }, [resources]);

    // Memoize results and suggestions
    const { results, suggestions } = useMemo(() => {
        if (!searchTerm || searchTerm.length < 2) {
            // If search term is too short, return everything (or nothing for empty)
            return {
                results: searchTerm ? [] : resources,
                suggestions: []
            };
        }

        const searchResults = fuse.search(searchTerm);

        // Extract items from Fuse result wrapper
        const items = searchResults.map(result => result.item);

        // Generate suggestions: simple approach using top matches titles
        // In a real app complexity, these could be distinct tags or corrected terms
        const rawSuggestions = items
            .slice(0, 5)
            .map(item => item.title);

        // Deduplicate suggestions
        const uniqueSuggestions = Array.from(new Set(rawSuggestions));

        return { results: items, suggestions: uniqueSuggestions };
    }, [fuse, searchTerm, resources]);

    return { results, suggestions };
};
