import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import ghpages from 'gh-pages';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '.');

execSync('npx vite build', { cwd: rootDir, stdio: 'inherit' });

const ghToken = process.env.GITHUB_TOKEN,
  gitUser = ghToken
    ? {
        name: 'github-actions-bot',
        email: 'support+actions@github.com',
      }
    : {
        name: 'Matteo Bruni',
        email: '176620+matteobruni@users.noreply.github.com',
      };

ghpages.publish(
  './dist',
  {
    repo: ghToken
      ? `https://git:${ghToken}@github.com/tsparticles/confetti.git`
      : `https://git:github.com/tsparticles/confetti.git`,
    branch: 'main',
    dotfiles: true,
    history: false,
    message: 'build: website updated',
    user: gitUser,
  },
  (publishErr) => {
    if (!publishErr) {
      console.log('Website published successfully');
    } else {
      console.log(`Error publishing website: ${publishErr}`);
    }
  }
);
