# Sanity blog setup

This portfolio loads blog posts from [Sanity](https://www.sanity.io/).

## Version note (important)

This Next.js app uses **`sanity@5.25.1`** + **`next-sanity@11`** + **`react@19.2.2`**.

Do **not** pin `sanity` to `5.1.0` here — it conflicts with `next-sanity` and `@portabletext/*` (build error: `compileSchemaDefinitionToPortableTextMemberSchemaTypes is not exported`).

If your other project uses `5.1.0`, that stack likely uses different `next-sanity` / React versions. Keep versions aligned per project.

## 1. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a project.
2. Copy your **Project ID** and note your **dataset** (usually `production`).

## 2. Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Restart `yarn dev` after saving.

### AI blog generator (`/admin/blog`)

Add these for Gemini → Sanity publishing:

```env
GEMINI_API_KEY=your_gemini_api_key
SANITY_API_WRITE_TOKEN=your_sanity_write_token
# Optional
GEMINI_MODEL=gemini-2.0-flash
ADMIN_API_SECRET=choose_a_long_random_string
```

1. Create a Sanity API token with **Editor** (write) permissions at [sanity.io/manage](https://www.sanity.io/manage) → API → Tokens.
2. Get a Gemini key from [Google AI Studio](https://aistudio.google.com/apikey).
3. Open **`/admin/blog`**, fill title / optional description / category, click **Generate with Gemini**, review the preview, then **Publish to Sanity**.
4. Posts appear on **`/blog`** and the homepage blog section after publish (paths are revalidated automatically).

Prompts live in `src/lib/blog/prompts/blog-generation.ts`:
- **`BLOG_GENERATION_SYSTEM_PROMPT`** — article + SEO JSON schema
- **`BLOG_COVER_IMAGE_STYLE_PROMPT`** — hero image style (`{subject}` placeholder)
- **`buildCoverImagePrompt()`** — combines style + title/category for the image model

Each generate run also creates a **cover image** (Gemini image model) and **SEO fields** stored on the post. Blog post pages use them for meta tags, Open Graph, and Twitter cards.

## 3. Open Sanity Studio (content editor)

**Option A — embedded in your site (recommended)**

1. Put env vars in **`.env` at the project root** (not inside `src/`).
2. **`sanity.config.ts` must start with `'use client'`** (already set in this repo).
3. Start dev **without Turbopack** (required for embedded Studio):
   ```bash
   rm -rf .next
   yarn dev
   ```
   Do not use `yarn dev:turbo` for Studio work.
4. Open: **`http://localhost:3001/studio`** (use your actual dev port)

**Option B — standalone Studio**

```bash
npm run sanity:dev
```

Open `http://localhost:3333` (CORS for this port is already in your Sanity project).

Schemas are already defined in `sanity/schemaTypes/`:

- **Blog Post** — title, slug, excerpt, cover image, body, categories
- **Category** — title, slug

## 4. Publish your first post

1. In Studio, create a **Category** (optional).
2. Create a **Blog Post**:
   - Fill title and click **Generate** on slug
   - Set **Published at**
   - Add excerpt, cover image, and body
3. Click **Publish**.

Visit:

- Homepage — latest 3 posts in the blog section
- `/blog` — all posts
- `/blog/your-slug` — single post

## 5. CORS (if fetch fails in the browser)

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**, add:

- `http://localhost:3000`
- Your production domain (e.g. `https://yourdomain.com`)

## File map

| Path | Purpose |
|------|---------|
| `sanity/schemaTypes/` | Post & category schemas |
| `sanity.config.ts` | Studio configuration |
| `src/sanity/client.ts` | API client |
| `src/sanity/queries.ts` | GROQ queries |
| `src/components/sections/BlogSection.tsx` | Homepage / listing UI |
| `src/app/blog/` | Blog pages |
