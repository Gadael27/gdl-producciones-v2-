import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_URL || 'https://demo.ghost.io',
  key: import.meta.env.VITE_GHOST_KEY || '22444f78447824223cefc48062',
  version: "v5.0"
});

export default api;
