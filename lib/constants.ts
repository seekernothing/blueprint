export const STORAGE_PATHS = {
  projects: "projects",
  original: "original.png",
  rendered: "rendered.png",
};

export const PROGRESS_INTERVAL_MS = 120;
export const PROGRESS_STEP = 5;
export const REDIRECT_DELAY_MS = 600;

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const IMAGE_DIMENSIONS = {
  width: 1024,
  height: 1024,
};

export const AUTH_ERROR_CODES = [401, 403];

export const ROOMIFY_RENDER_PROMPT = `Convert the input 2D floor plan into a photorealistic top-down 3D architectural render.

STRICT REQUIREMENTS - please do not violate them:
- Remove all text from the render. Do not render any letters, numbers, labels, dimensions, or annotations.
- Geometry must match. Walls, rooms, doors and windows must follow the exact lines and positions in the plan. Do not shift or resize them.
- Provide clean, realistic output with crisp edges, balanced lighting, and realistic materials.
- Do not add anything else. All the walls, doors, and windows must be copied from the 2D plan.
- Add furniture and room mappings only where they were clearly shown in the original 2D plan, such as a bed icon, sofa, or dining table.
- Make the lighting bright and neutral.`;
