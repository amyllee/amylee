// ─────────────────────────────────────────────────────────────
// DESIGN GALLERY — you normally never need to edit this file.
//
// Every folder inside src/assets/design/ becomes one section on the Design
// page, and every image inside it becomes a tile. To add work:
//
//   1. Make a folder, e.g.  src/assets/design/04-mhacks/
//      (the number at the front sets the order of sections)
//   2. Drop your images in it (01-logo.png, 02-banner.png, ... — the numbers
//      set the order inside the section)
//   3. Optional: add an info.json in the folder for titles and descriptions
//      (copy one from another folder). Without it, titles come from the
//      folder / file names ("04-mhacks" → "Mhacks", "02-banner.png" → "Banner").
// ─────────────────────────────────────────────────────────────

export type DesignItem = {
  id: string;           // "04-mhacks/02-banner.png"
  file: string;         // "02-banner.png"
  src: string;          // image URL
  title: string;
  description?: string;
  tools?: string[];
  fit: "cover" | "contain";
  background?: string;
};

export type DesignCollection = {
  slug: string;         // "04-mhacks"
  anchor: string;       // "mhacks"
  title: string;
  subtitle?: string;
  description?: string;
  tools?: string[];
  items: DesignItem[];
};

type ItemInfo = Partial<Pick<DesignItem, "title" | "description" | "tools" | "fit" | "background">>;
type CollectionInfo = {
  title?: string;
  subtitle?: string;
  description?: string;
  tools?: string[];
  /** default fit/background for every tile in this folder */
  fit?: "cover" | "contain";
  background?: string;
  items?: Record<string, ItemInfo>;
};

const images = import.meta.glob("../assets/design/*/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const infos = import.meta.glob("../assets/design/*/info.json", {
  eager: true,
  import: "default",
}) as Record<string, CollectionInfo>;

const stripNumber = (s: string) => s.replace(/^\d+[-_ ]*/, "");
const prettify = (s: string) =>
  stripNumber(s.replace(/\.[^.]+$/, ""))
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const bySlug = new Map<string, DesignCollection>();

for (const [path, src] of Object.entries(images).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))) {
  const [slug, file] = path.split("/").slice(-2);
  const info = infos[`../assets/design/${slug}/info.json`] ?? {};

  if (!bySlug.has(slug)) {
    bySlug.set(slug, {
      slug,
      anchor: stripNumber(slug),
      title: info.title ?? prettify(slug),
      subtitle: info.subtitle,
      description: info.description,
      tools: info.tools,
      items: [],
    });
  }

  const itemInfo = info.items?.[file] ?? {};
  bySlug.get(slug)!.items.push({
    id: `${slug}/${file}`,
    file,
    src,
    title: itemInfo.title ?? prettify(file),
    description: itemInfo.description,
    tools: itemInfo.tools ?? info.tools,
    fit: itemInfo.fit ?? info.fit ?? "cover",
    background: itemInfo.background ?? info.background,
  });
}

export const DESIGN_COLLECTIONS: DesignCollection[] = [...bySlug.values()].sort((a, b) =>
  a.slug.localeCompare(b.slug, undefined, { numeric: true }),
);
