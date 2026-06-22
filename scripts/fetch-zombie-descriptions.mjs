/**
 * 从 PvZ Wiki 获取僵尸描述
 *
 * 使用 MediaWiki API 获取每个僵尸的描述信息
 */
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const WIKI_API = 'https://plantsvszombies.fandom.com/api.php';

// 读取当前僵尸数据
const zombieData = readFileSync('./src/data/pvz2/zombies.js', 'utf8');

// 解析僵尸数组 - 使用更稳健的方法
let zombies;
try {
  // 找到数组的开始和结束位置
  const startMarker = 'export const zombies = [';
  const startIdx = zombieData.indexOf(startMarker);
  if (startIdx === -1) {
    console.error('找不到 zombie 数组开始标记');
    process.exit(1);
  }

  // 找到匹配的结束括号
  let bracketCount = 0;
  let endIdx = startIdx + startMarker.length;
  for (let i = endIdx; i < zombieData.length; i++) {
    if (zombieData[i] === '[') bracketCount++;
    if (zombieData[i] === ']') {
      if (bracketCount === 0) {
        endIdx = i;
        break;
      }
      bracketCount--;
    }
  }

  const arrayStr = zombieData.substring(startIdx + startMarker.length - 1, endIdx + 1);
  const func = new Function(`return ${arrayStr}`);
  zombies = func();
} catch (e) {
  console.error('解析失败:', e.message);
  process.exit(1);
}

console.log(`共 ${zombies.length} 个僵尸`);
console.log(`有描述: ${zombies.filter(z => z.description).length}`);
console.log(`无描述: ${zombies.filter(z => !z.description).length}`);

// 从 Wiki 获取描述
async function fetchDescription(zombieId, nameEn) {
  // 构建 Wiki 页面名称
  // PvZ2 僵尸页面通常是 "Zombie_Name_(PvZ2)" 格式
  const pageName = `${nameEn}_(PvZ2)`.replace(/ /g, '_');

  const url = `${WIKI_API}?action=parse&page=${encodeURIComponent(pageName)}&prop=wikitext&format=json`;

  try {
    const result = execSync(
      `curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${url}" --max-time 15`,
      { timeout: 20000, encoding: 'utf8' }
    );

    const data = JSON.parse(result);

    if (data.error) {
      // 尝试不带 (PvZ2) 后缀
      const pageName2 = nameEn.replace(/ /g, '_');
      const url2 = `${WIKI_API}?action=parse&page=${encodeURIComponent(pageName2)}&prop=wikitext&format=json`;

      try {
        const result2 = execSync(
          `curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${url2}" --max-time 15`,
          { timeout: 20000, encoding: 'utf8' }
        );

        const data2 = JSON.parse(result2);
        if (data2.parse && data2.parse.wikitext) {
          return extractDescription(data2.parse.wikitext['*']);
        }
      } catch (e) {
        // 忽略
      }

      return null;
    }

    if (data.parse && data.parse.wikitext) {
      return extractDescription(data.parse.wikitext['*']);
    }

    return null;
  } catch (e) {
    console.error(`获取 ${zombieId} 失败:`, e.message);
    return null;
  }
}

// 从 wikitext 中提取描述
function extractDescription(wikitext) {
  // 跳过重定向页面
  if (wikitext.includes('#REDIRECT')) {
    return null;
  }

  // 尝试从 Infobox 模板中提取描述字段
  const descMatch = wikitext.match(/\|\s*desc(?:ription)?\s*=\s*([^\n|]+)/i);
  if (descMatch) {
    const desc = cleanWikitext(descMatch[1].trim());
    if (desc && desc.length > 10 && !desc.includes('REDIRECT') && !desc.includes('{{')) {
      return desc;
    }
  }

  // 尝试提取第一个完整的句子段落
  const lines = wikitext.split('\n');
  let inTemplate = false;
  let templateDepth = 0;

  for (const line of lines) {
    const cleaned = line.trim();

    // 跟踪模板状态（支持嵌套模板）
    const openBrackets = (cleaned.match(/\{\{/g) || []).length;
    const closeBrackets = (cleaned.match(/\}\}/g) || []).length;
    templateDepth += openBrackets - closeBrackets;
    inTemplate = templateDepth > 0;

    if (inTemplate) continue;

    // 跳过标题、空行、分类、链接、列表等
    if (!cleaned || cleaned.startsWith('==') || cleaned.startsWith('[') ||
        cleaned.startsWith(':') || cleaned.startsWith('*') || cleaned.startsWith('#') ||
        cleaned.startsWith('|') || cleaned.startsWith('{{') || cleaned.startsWith('}}')) {
      continue;
    }

    // 清理文本
    const cleanedDesc = cleanWikitext(cleaned);

    // 验证描述质量
    if (cleanedDesc.length > 30 &&
        !cleanedDesc.includes('REDIRECT') &&
        !cleanedDesc.includes('may refer to') &&
        !cleanedDesc.includes('disambiguation') &&
        !cleanedDesc.includes('is a zombie') &&  // 太泛泛的描述
        !cleanedDesc.includes('Use ') &&  // 成就提示
        !cleanedDesc.includes('Put ') &&  // 成就提示
        !cleanedDesc.includes('Destroy ') &&  // 成就提示
        !cleanedDesc.includes('Extinguish ') &&  // 成就提示
        !cleanedDesc.includes('first seen') &&  // infobox 字段
        !cleanedDesc.includes('other weakness') &&  // infobox 字段
        !cleanedDesc.includes('}}')) {  // 模板残留
      return cleanedDesc.substring(0, 300);
    }
  }

  return null;
}

// 清理 wikitext 标记
function cleanWikitext(text) {
  return text
    .replace(/\[\[([^\]|]*\|)?([^\]]*)\]\]/g, '$2')  // [[link|text]] -> text
    .replace(/\{\{[^}]*\}\}/g, '')  // {{template}} -> ''
    .replace(/'''?([^']*)'''?/g, '$1')  // '''bold''' -> bold
    .replace(/<[^>]*>/g, '')  // <ref>...</ref> -> ''
    .replace(/\s+/g, ' ')
    .trim();
}

// 批量获取描述
async function main() {
  const zombiesToUpdate = zombies.filter(z => !z.description);
  console.log(`\n需要获取描述的僵尸: ${zombiesToUpdate.length} 个`);

  let success = 0;
  let fail = 0;
  const updated = {};

  for (let i = 0; i < zombiesToUpdate.length; i++) {
    const z = zombiesToUpdate[i];
    console.log(`[${i + 1}/${zombiesToUpdate.length}] ${z.nameEn} (${z.id})`);

    const desc = await fetchDescription(z.id, z.nameEn);

    if (desc) {
      console.log(`  ✓ ${desc.substring(0, 50)}...`);
      updated[z.id] = desc;
      success++;
    } else {
      console.log(`  ✗ 未找到描述`);
      fail++;
    }

    // 延迟避免请求过快
    if (i < zombiesToUpdate.length - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log(`\n获取完成: 成功 ${success}, 失败 ${fail}`);

  // 更新数据文件
  if (success > 0) {
    let newContent = zombieData;
    for (const [id, desc] of Object.entries(updated)) {
      // 替换 description: null 为 description: "..."
      const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?description:\\s*)null`, 'g');
      newContent = newContent.replace(regex, `$1"${desc}"`);
    }

    writeFileSync('./src/data/pvz2/zombies.js', newContent);
    console.log(`\n已更新 src/data/pvz2/zombies.js`);
  }
}

main().catch(console.error);
