# URL Parameter Feature

This feature allows users to generate shareable links with encoded resume configuration URLs and optional custom tech registry URLs.

## Overview

The application now supports loading resume configurations and tech registries from external URLs using encoded URL parameters. This enables users to:
- Share their resume with a custom configuration without modifying the repository
- Keep their configuration URLs private (base64 encoded)
- Host their resume configuration anywhere (GitHub Pages, personal website, etc.)
- Optionally provide custom technology colors via a tech registry
- Use the default tech registry if no custom one is provided

## How It Works

### 1. Generate a Shareable Link

1. Navigate to the **Generate Link** page by clicking the "Generate Link" button on the resume page, or by visiting `/generate` route
2. Enter the URL to your resume configuration JSON file (e.g., `https://example.com/my-cv-config.json`)
3. Optionally enter a URL to your custom tech registry JSON file (e.g., `https://example.com/tech-registry.json`)
4. Click "Generate Link"
5. Copy the generated link and share it

The generated link will look like:
```
https://yoursite.com/cv/?config=aHR0cHM6Ly9leGFtcGxlLmNvbS9teS1jdi1jb25maWcuanNvbg==
```

Or with a custom tech registry:
```
https://yoursite.com/cv/?config=aHR0cHM6Ly9leGFtcGxlLmNvbS9teS1jdi1jb25maWcuanNvbg==&tech-registry=aHR0cHM6Ly9leGFtcGxlLmNvbS90ZWNoLXJlZ2lzdHJ5Lmpzb24=
```

### 2. URL Encoding

Both URLs are encoded using base64 encoding to:
- Provide a level of obfuscation (not security, but privacy)
- Make the URL parameters more compact
- Avoid special characters in the URL

**Note:** Base64 encoding is NOT encryption. It can be easily decoded. Don't rely on it for security.

### 3. Loading External Configuration and Tech Registry

When a user visits a URL with parameters:
1. The application first loads the tech registry (if provided)
2. Then decodes the base64 config parameter
3. Fetches the configuration JSON from the decoded URL
4. Validates the configuration structure
5. Renders the resume with the external configuration and custom tech colors

If either fetch fails or is invalid, the application falls back to defaults:
- Default config if config fetch fails
- Default tech registry if tech registry fetch fails or is not provided

## Configuration Requirements

Your external configuration JSON must follow the same structure as `resume-config.ts`. Key requirements:
- Must be valid JSON
- Must include `personal` and `languages` fields at minimum
- Should be hosted on a server with proper CORS headers

## Tech Registry Requirements (Optional)

Your custom tech registry JSON must be an object with this structure:
```json
{
  "TechnologyName": { "color": "#HexColor" }
}
```

See [TECH_REGISTRY.md](./TECH_REGISTRY.md) for detailed documentation.

Example minimal configuration:
```json
{
  "personal": {
    "name": "Your Name",
    "title": { "en": "Your Title" }
  },
  "seo": {
    "title": "Your Name - Resume",
    "description": "Your resume description"
  },
  "languages": {
    "default": "en",
    "available": ["en"],
    "labels": { "en": "EN" }
  },
  "contact": [],
  "skills": [],
  "experiences": [],
  "education": [],
  "labels": {
    "sections": {
      "contact": { "en": "CONTACT" },
      "skills": { "en": "SKILLS" },
      "experience": { "en": "EXPERIENCE" },
      "education": { "en": "EDUCATION" }
    },
    "experience": {
      "mainTasks": { "en": "Main tasks:" },
      "moreTasks": { "en": "more tasks..." },
      "techEnv": { "en": "Tech environment:" },
      "technologies": { "en": "Technologies" }
    },
    "actions": {
      "clickHint": { "en": "Click for details" },
      "switchTheme": { "en": "Toggle theme" }
    }
  }
}
```

## Hosting Your Configuration

### Option 1: GitHub Pages
1. Create a public repository or use an existing one
2. Add your configuration JSON file (e.g., `cv-config.json`)
3. Enable GitHub Pages for the repository
4. Use the raw file URL: `https://username.github.io/repo-name/cv-config.json`

### Option 2: Personal Website
1. Upload your configuration JSON to your website
2. Ensure CORS is properly configured on your server
3. Use the full URL to the JSON file

### CORS Configuration

If hosting on your own server, ensure CORS headers allow the resume site to fetch the configuration:
```
Access-Control-Allow-Origin: *
```
or
```
Access-Control-Allow-Origin: https://yourresumesite.com
```

## Security Considerations

1. **Not Encrypted**: The base64 encoding is for obfuscation, not security
2. **Public URLs**: Anyone with the encoded link can decode it to find your configuration URL
3. **Sensitive Data**: Don't include sensitive information in your public configuration JSON
4. **CORS**: Your configuration must be publicly accessible for the browser to fetch it

## Technical Details

### Files Modified/Created
- `src/lib/urlEncoder.ts` - URL encoding/decoding utilities
- `src/components/GenerateLink.tsx` - Generate link page component
- `src/data/configLoader.ts` - Configuration loading logic
- `src/App.tsx` - Updated with routing and dynamic config loading
- `src/components/Resume/index.tsx` - Updated to accept config prop
- `src/components/Resume/Sidebar.tsx` - Updated to accept config prop
- `src/components/Resume/MainContent.tsx` - Updated to accept config prop

### Dependencies Added
- `react-router-dom` - For routing between pages

## Troubleshooting

### Configuration Not Loading
- Check browser console for errors
- Verify your configuration URL is publicly accessible
- Ensure CORS headers are properly configured
- Validate your JSON structure matches the required schema

### Link Generation Not Working
- Ensure you entered a valid URL (must start with http:// or https://)
- Check that the URL format is correct

### Fallback Behavior
If external configuration fails to load for any reason, the application automatically falls back to the default configuration, ensuring the resume is always viewable.
