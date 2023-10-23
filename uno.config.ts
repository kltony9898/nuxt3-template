// uno.config.ts
import { defineConfig, presetWind, presetAttributify } from 'unocss'
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind(),
    presetAttributify()
  ]
})
