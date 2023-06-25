import * as universal from '../entries/pages/dashboard/_id_/_layout.js';

export const index = 2;
export const component = async () => (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/dashboard/[id]/+layout.js";
export const imports = ["_app/immutable/nodes/2.f50fb3f5.js","_app/immutable/chunks/index.9e12936a.js"];
export const stylesheets = [];
export const fonts = [];
