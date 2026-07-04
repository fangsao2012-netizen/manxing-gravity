import { mkdirSync, existsSync } from 'fs';
const dir = 'C:/Users/Revision-Extra/Documents/synapsex/src/components';
if (!existsSync(dir)) {
  mkdirSync(dir);
  console.log('Created components directory');
} else {
  console.log('components directory already exists');
}
