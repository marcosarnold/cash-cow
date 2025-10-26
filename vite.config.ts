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
      
      // Copy icons (use Harmony logo from logos directory)
      const logoPath = resolve(__dirname, 'src/assets/logos/harmony logo.png');
      const iconFiles = ['icon16.png', 'icon48.png', 'icon128.png'];
      
      iconFiles.forEach(iconFile => {
        const iconDest = resolve(distDir, iconFile);
        if (existsSync(logoPath)) {
          copyFileSync(logoPath, iconDest);
          console.log(`✓ Copied ${iconFile} (using Harmony logo)`);
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

          // Copy content script (amazon-amount.js)
          const contentScriptsDir = resolve(distDir, 'src/pages/content');
          if (!existsSync(contentScriptsDir)) {
            mkdirSync(contentScriptsDir, { recursive: true });
          }
          
          const contentScript = 'amazon-amount.js';
          const scriptSrc = resolve(__dirname, 'src/pages/content', contentScript);
          const scriptDest = resolve(contentScriptsDir, contentScript);
          if (existsSync(scriptSrc)) {
            copyFileSync(scriptSrc, scriptDest);
            console.log(`✓ Copied ${contentScript}`);
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

          // Copy credit card rewards JSON
          const jsonSrc = resolve(__dirname, 'src/lib/credit_card_rewards.json');
          const jsonDestDir = resolve(distDir, 'src/lib');
          const jsonDest = resolve(jsonDestDir, 'credit_card_rewards.json');
          if (existsSync(jsonSrc)) {
            mkdirSync(jsonDestDir, { recursive: true });
            copyFileSync(jsonSrc, jsonDest);
            console.log(`✓ Copied credit_card_rewards.json`);
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