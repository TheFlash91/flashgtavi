import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Flash⚡- GTA VI',
    short_name: 'Flash⚡- GTA VI',
    start_url: '/',
    display: 'standalone',
    background_color: '#080a12',
    theme_color: '#080a12',
  };
}
