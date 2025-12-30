import * as fs from 'fs';
import * as path from 'path';

export const selectCardForBirthday = (dob: string): string => {
  // dob format: YYYY-MM-DD
  if (!dob) return 'default.jpg';

  const date = new Date(dob);
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  
  // Look for cards starting with the month (e.g., '12-')
  const assetsDir = path.join(process.cwd(), 'assets', 'cards');
  
  try {
    if (!fs.existsSync(assetsDir)) return 'default.jpg';

    const files = fs.readdirSync(assetsDir);
    // FIXED: Use string concatenation to avoid PowerShell/Template Literal issues
    const prefix = mm + '-';
    const matching = files.filter(f => f.startsWith(prefix));

    if (matching.length > 0) {
      // Pick random
      const rand = Math.floor(Math.random() * matching.length);
      return matching[rand];
    }
  } catch (e) {
    console.error('Error selecting card:', e);
  }

  return 'default.jpg';
};
