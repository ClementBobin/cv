# Tech Registry Feature

## Overview

The application now supports loading custom tech registries from external URLs, allowing users to define their own technology colors alongside the resume configuration.

## How It Works

### 1. Custom Tech Registry

Users can provide a custom tech registry JSON file that defines colors for technologies. The application will:
1. Load the custom registry from the URL parameter
2. Use custom colors when available
3. Fall back to the default registry for undefined technologies
4. Fall back to gray color if technology is not in any registry

### 2. URL Structure

When generating a link, users can optionally provide a tech registry URL:

```
https://yoursite.com/cv/?config=<encoded-config-url>&tech-registry=<encoded-registry-url>
```

Both URLs are base64 encoded for privacy.

### 3. Tech Registry Format

The tech registry must be a JSON object where:
- Keys are technology names (e.g., "React", "TypeScript")
- Values are objects with a `color` property (hex color string)

Example:

```json
{
  "React": { "color": "#61DAFB" },
  "TypeScript": { "color": "#3178C6" },
  "JavaScript": { "color": "#F7DF1E" },
  "Node.js": { "color": "#339933" },
  "Python": { "color": "#3776AB" },
  "PostgreSQL": { "color": "#4169E1" },
  "Docker": { "color": "#2496ED" },
  "Kubernetes": { "color": "#326CE5" }
}
```

### 4. Loading Priority

The color resolution follows this priority:

1. **Custom Registry** - If a tech-registry URL is provided and the technology exists in it
2. **Default Registry** - Built-in registry with 180+ technologies
3. **Fallback Color** - Gray (#6b7280) for unknown technologies

### 5. Error Handling

If the custom tech registry:
- Cannot be fetched (network error, CORS, etc.)
- Is invalid JSON
- Has incorrect structure

The application will:
- Log an error to the console
- Fall back to the default tech registry
- Continue to display the resume normally

## Hosting Your Tech Registry

### CORS Requirements

Your tech registry must be hosted on a server with proper CORS headers:

```
Access-Control-Allow-Origin: *
```

or

```
Access-Control-Allow-Origin: https://yourresumesite.com
```

### Hosting Options

1. **GitHub Pages** - Host a public JSON file in a repository
2. **Personal Website** - Upload to your web server
3. **CDN Services** - Use services like jsDelivr for GitHub files
4. **Cloud Storage** - AWS S3, Google Cloud Storage (with public access)

## Complete Example

### Step 1: Create tech-registry.json

```json
{
  "React": { "color": "#61DAFB" },
  "Vue": { "color": "#4FC08D" },
  "Angular": { "color": "#DD0031" },
  "Svelte": { "color": "#FF3E00" },
  "Next.js": { "color": "#000000" },
  "TypeScript": { "color": "#3178C6" },
  "JavaScript": { "color": "#F7DF1E" },
  "Node.js": { "color": "#339933" },
  "Deno": { "color": "#000000" },
  "Python": { "color": "#3776AB" },
  "Django": { "color": "#092E20" },
  "FastAPI": { "color": "#009688" },
  "Go": { "color": "#00ADD8" },
  "Rust": { "color": "#DEA584" },
  "PostgreSQL": { "color": "#4169E1" },
  "MongoDB": { "color": "#47A248" },
  "Redis": { "color": "#DC382D" },
  "Docker": { "color": "#2496ED" },
  "Kubernetes": { "color": "#326CE5" },
  "AWS": { "color": "#FF9900" },
  "Tailwind CSS": { "color": "#06B6D4" }
}
```

### Step 2: Host the file

Upload to GitHub Pages:
```
https://username.github.io/repo/tech-registry.json
```

### Step 3: Generate Link

1. Go to the Generate page
2. Enter your resume config URL
3. Enter your tech registry URL
4. Click "Generate Link"
5. Share the generated link

### Step 4: Result

The generated link will look like:
```
https://yoursite.com/cv/?config=aHR0cHM6Ly...&tech-registry=aHR0cHM6Ly...
```

When someone visits this link, they'll see your resume with your custom technology colors!

## Benefits

- **Customization** - Define your own brand colors for technologies
- **Consistency** - Keep tech colors consistent across all your resumes
- **Flexibility** - Update colors without changing the resume config
- **Optional** - Works perfectly fine without a custom registry
- **Safe** - Falls back gracefully on any errors

## Technical Details

### Implementation

- `src/data/techRegistryLoader.ts` - Loads and caches custom registry
- `src/data/tech-registry.ts` - Default registry with 180+ technologies
- `src/components/Resume/TechBadge.tsx` - Uses registry for colors

### Cache

The custom tech registry is cached after the first successful load for the session. This means:
- Only one network request per page load
- Fast color lookups
- Efficient performance

### Validation

The loader validates that:
- Response is valid JSON
- Root is an object
- Each entry has a `color` property (warns but doesn't fail)

Invalid entries are skipped and fall back to the default registry.
