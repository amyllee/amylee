import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: "./" makes the built site work no matter what the GitHub repo is
// called (the pages use #/ links, e.g. .../#/projects), so there's nothing to
// change here if you rename the repo.
export default defineConfig({
  plugins: [react()],
  base: "./",
})
