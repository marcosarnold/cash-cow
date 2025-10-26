import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath, URL } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Plugin to copy manifest and other extension files
function copyExtensionFiles() {
  return {
    name: 'copy-extension-files',
    writeBundle() {
      const distDir = resolve(__dirname, 'dist');
      
      // Ensure dist directory exists
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }
      
      // Copy manifest.json
      const manifestSrc = resolve(__dirname, 'manifest.json');
      const manifestDest = resolve(distDir, 'manifest.json');
      if (existsSync(manifestSrc)) {
        copyFileSync(manifestSrc, manifestDest);
        console.log('✓ Copied manifest.json');
      }
      
      // Copy icons (PNG files)
      const icons = [
        { src: 'icon16.png', dest: 'icon16.png' },
        { src: 'icon48.png', dest: 'icon48.png' },
        { src: 'icon128.png', dest: 'icon128.png' }
      ];
      
      icons.forEach(icon => {
        const iconSrc = resolve(__dirname, icon.src);
        const iconDest = resolve(distDir, icon.dest);
        if (existsSync(iconSrc)) {
          copyFileSync(iconSrc, iconDest);
          console.log(`✓ Copied ${icon.dest}`);
        }
      });
      
          // Copy content script CSS
          const cssSrc = resolve(__dirname, 'src/pages/content/style.css');
          const cssDest = resolve(distDir, 'src/pages/content/style.css');
          if (existsSync(cssSrc)) {
            mkdirSync(resolve(distDir, 'src/pages/content'), { recursive: true });
            copyFileSync(cssSrc, cssDest);
            console.log('✓ Copied content script CSS');
          }

          // Copy card images
          const cardsSrcDir = resolve(__dirname, 'src/assets/cards');
          const cardsDestDir = resolve(distDir, 'src/assets/cards');
          if (existsSync(cardsSrcDir)) {
            mkdirSync(cardsDestDir, { recursive: true });
            const cardFiles = ['amexgold.png', 'sapphirecard.png', 'discovercard.png'];
            cardFiles.forEach(file => {
              const src = resolve(cardsSrcDir, file);
              const dest = resolve(cardsDestDir, file);
              if (existsSync(src)) {
                copyFileSync(src, dest);
                console.log(`✓ Copied ${file}`);
              }
            });
          }

          // Copy logo files
          const logosSrcDir = resolve(__dirname, 'src/assets/logos');
          const logosDestDir = resolve(distDir, 'src/assets/logos');
          if (existsSync(logosSrcDir)) {
            mkdirSync(logosDestDir, { recursive: true });
            const logoFiles = ['harmony logo.png', 'unnamed (1).jpg', 'unnamed (2).jpg', 'unnamed.jpg'];
            logoFiles.forEach(file => {
              const src = resolve(logosSrcDir, file);
              const dest = resolve(logosDestDir, file);
              if (existsSync(src)) {
                copyFileSync(src, dest);
                console.log(`✓ Copied ${file}`);
              }
            });
          }
    }
  };
}

export default defineConfig({
  plugins: [react(), copyExtensionFiles()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/pages/background/index.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') {
            return 'src/pages/background/index.js';
          }
          return 'assets/[name].js';
        },
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});