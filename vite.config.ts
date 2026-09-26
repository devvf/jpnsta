import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE lets the same build work at a domain root ("/") or a
// GitHub Pages sub-path ("/<repo>/"). Defaults to "/".
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
})
