import fs from 'fs';
import path from 'path';

const LOCALES_DIR = path.join(process.cwd(), 'src', 'locales');
const EN_DIR = path.join(LOCALES_DIR, 'en');
const targetLangs = ['ar', 'fr', 'de', 'es', 'ta'];

const namespaces = fs.readdirSync(EN_DIR).filter((f) => f.endsWith('.json'));

let missingCount = 0;

function checkKeys(enObj, targetObj, lang, ns, prefix = '') {
  for (const key of Object.keys(enObj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (!(key in targetObj)) {
      console.error(`[MISSING] [${lang}] namespace "${ns}": key "${fullPath}" is missing`);
      missingCount++;
      continue;
    }

    if (
      typeof enObj[key] === 'object' &&
      enObj[key] !== null &&
      !Array.isArray(enObj[key])
    ) {
      if (typeof targetObj[key] !== 'object' || targetObj[key] === null) {
        console.error(`[TYPE MISMATCH] [${lang}] namespace "${ns}": key "${fullPath}" should be an object`);
        missingCount++;
      } else {
        checkKeys(enObj[key], targetObj[key], lang, ns, fullPath);
      }
    }
  }
}

for (const lang of targetLangs) {
  const langDir = path.join(LOCALES_DIR, lang);
  if (!fs.existsSync(langDir)) {
    console.error(`[ERROR] Missing language directory: ${lang}`);
    missingCount++;
    continue;
  }

  for (const nsFile of namespaces) {
    const targetFile = path.join(langDir, nsFile);
    if (!fs.existsSync(targetFile)) {
      console.error(`[MISSING FILE] [${lang}] namespace file "${nsFile}" missing`);
      missingCount++;
      continue;
    }

    const enJson = JSON.parse(fs.readFileSync(path.join(EN_DIR, nsFile), 'utf-8'));
    const targetJson = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));

    checkKeys(enJson, targetJson, lang, nsFile.replace('.json', ''));
  }
}

if (missingCount > 0) {
  console.error(`\nValidation failed: ${missingCount} translation key(s) missing.`);
  process.exit(1);
} else {
  console.log('All locale keys match English master dictionaries successfully!');
  process.exit(0);
}
