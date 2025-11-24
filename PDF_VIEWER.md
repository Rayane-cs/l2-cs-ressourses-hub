PDF Viewer Integration
======================

This project includes a lightweight inline PDF viewer component at `src/components/PdfViewer.tsx`.

How it works
- `PdfViewer` can take either a `pdfUrl` (string) or a `moduleSlug` + `resourceId` pair. When given `moduleSlug` and `resourceId` it resolves the resource link from `src/lib/index.ts` (the project's resource registry).
- Click "Show PDF" to open a modal popup that embeds the PDF using an `<iframe>`; close via the exit (X) button or by clicking the overlay.
- The Download button now attempts a direct download by fetching the file (fetch -> blob -> save). If that fails (CORS or network error) it falls back to opening the file in a new tab.

Google Drive notes
- Use the Drive "preview" URL format to embed: `https://drive.google.com/file/d/FILE_ID/preview`.
- Some hosts (including certain Drive share links) set `X-Frame-Options` or a CSP that prevents embedding. If the PDF does not display, host it on a server that allows embedding or provide a direct URL.

Where it's integrated
- The viewer is integrated into `src/pages/ModulePage.tsx` replacing the previous "Open/View" links for resources.

Customization
- To change the displayed PDF for a resource, update the `driveUrl` value in `src/lib/modules/*` or in local drive resources saved in localStorage.
- The component is dependency-free beyond React and the locally used UI `Button` — it follows the project's UI patterns.

If you want the viewer added to another page, import `PdfViewer` and pass the desired `pdfUrl` prop.
