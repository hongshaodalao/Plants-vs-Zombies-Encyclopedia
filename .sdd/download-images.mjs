import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { execSync } from 'child_process';

const plants = JSON.parse(readFileSync('.sdd/pvz1-plants-raw.json', 'utf8'));
const zombies = JSON.parse(readFileSync('.sdd/pvz1-zombies-raw.json', 'utf8'));

mkdirSync('public/images/plants', { recursive: true });
mkdirSync('public/images/zombies', { recursive: true });

// Batch fetch image URLs from MediaWiki API (up to 50 titles per call)
async function getImageUrls(filenames) {
  const results = {};
  // Process in batches of 50
  for (let i = 0; i < filenames.length; i += 50) {
    const batch = filenames.slice(i, i + 50);
    const titles = batch.map(f => `File:${f}`).join('|');
    const url = `https://plantsvszombies.fandom.com/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url|size&format=json`;

    try {
      const resp = execSync(`curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${url}" --max-time 30`, { timeout: 35000 }).toString();
      const data = JSON.parse(resp);
      if (data.query && data.query.pages) {
        for (const page of Object.values(data.query.pages)) {
          if (page.imageinfo && page.imageinfo[0]) {
            const title = page.title.replace('File:', '');
            results[title] = {
              url: page.imageinfo[0].url,
              size: page.imageinfo[0].size,
              width: page.imageinfo[0].width,
              height: page.imageinfo[0].height
            };
          }
        }
      }
    } catch (e) {
      console.error(`Batch ${i}-${i + batch.length} failed:`, e.message);
    }

    // Small delay between batches
    if (i + 50 < filenames.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  return results;
}

async function downloadImage(url, dest) {
  try {
    execSync(`curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${url}" -o "${dest}" --max-time 30`, { timeout: 35000 });
    if (existsSync(dest)) {
      const size = statSync(dest).size;
      return size > 500; // Must be > 500 bytes to be a real image
    }
    return false;
  } catch (e) {
    return false;
  }
}

async function main() {
  console.log('=== 获取图片 URL ===');

  // Collect all filenames
  const allFilenames = [
    ...plants.map(p => p.image),
    ...zombies.map(z => z.image)
  ];
  const uniqueFilenames = [...new Set(allFilenames)];
  console.log(`共 ${uniqueFilenames.length} 个唯一文件名`);

  // Get URLs from API
  const urlMap = await getImageUrls(uniqueFilenames);
  console.log(`成功获取 ${Object.keys(urlMap).length} 个 URL`);

  // Save URL map for reference
  writeFileSync('.sdd/image-urls.json', JSON.stringify(urlMap, null, 2));

  // Download images
  console.log('\n=== 下载植物图片 ===');
  let success = 0, fail = 0, skip = 0;
  const failures = [];

  for (const p of plants) {
    const dest = `public/images/plants/${p.id}.png`;
    if (existsSync(dest) && statSync(dest).size > 500) {
      console.log(`[SKIP] ${p.id}`);
      skip++;
      continue;
    }

    const info = urlMap[p.image];
    if (!info) {
      console.log(`[NO URL] ${p.id} (${p.image})`);
      fail++;
      failures.push(p.id);
      continue;
    }

    console.log(`[DL] ${p.id} (${info.width}x${info.height}, ${(info.size/1024).toFixed(1)}KB)`);
    const ok = await downloadImage(info.url, dest);
    if (ok) {
      const size = statSync(dest).size;
      console.log(`  OK (${(size/1024).toFixed(1)}KB)`);
      success++;
    } else {
      console.log(`  FAIL`);
      fail++;
      failures.push(p.id);
    }
    await new Promise(r => setTimeout(r, 150));
  }

  console.log('\n=== 下载僵尸图片 ===');
  for (const z of zombies) {
    const dest = `public/images/zombies/${z.id}.png`;
    if (existsSync(dest) && statSync(dest).size > 500) {
      console.log(`[SKIP] ${z.id}`);
      skip++;
      continue;
    }

    const info = urlMap[z.image];
    if (!info) {
      console.log(`[NO URL] ${z.id} (${z.image})`);
      fail++;
      failures.push(z.id);
      continue;
    }

    console.log(`[DL] ${z.id} (${info.width}x${info.height}, ${(info.size/1024).toFixed(1)}KB)`);
    const ok = await downloadImage(info.url, dest);
    if (ok) {
      const size = statSync(dest).size;
      console.log(`  OK (${(size/1024).toFixed(1)}KB)`);
      success++;
    } else {
      console.log(`  FAIL`);
      fail++;
      failures.push(z.id);
    }
    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`\n=== 结果 ===`);
  console.log(`成功: ${success}, 跳过: ${skip}, 失败: ${fail}, 总计: ${success + skip + fail}`);
  if (failures.length > 0) {
    console.log(`失败条目: ${failures.join(', ')}`);
  }
}

main().catch(console.error);
