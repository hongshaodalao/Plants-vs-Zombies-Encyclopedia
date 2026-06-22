/**
 * 提取僵尸描述用于翻译
 */
import { readFileSync } from 'fs';

const content = readFileSync('./src/data/pvz2/zombies.js', 'utf8');

// 使用更稳健的方法解析
let zombies;
try {
  // 找到数组的开始和结束位置
  const startMarker = 'export const zombies = [';
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) {
    console.error('找不到 zombie 数组开始标记');
    process.exit(1);
  }

  // 找到匹配的结束括号
  let bracketCount = 0;
  let endIdx = startIdx + startMarker.length;
  for (let i = endIdx; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    if (content[i] === ']') {
      if (bracketCount === 0) {
        endIdx = i;
        break;
      }
      bracketCount--;
    }
  }

  const arrayStr = content.substring(startIdx + startMarker.length - 1, endIdx + 1);
  const func = new Function(`return ${arrayStr}`);
  zombies = func();
} catch (e) {
  console.error('解析失败:', e.message);
  process.exit(1);
}

const withDesc = zombies.filter(z => z.description);

console.log(`共 ${zombies.length} 个僵尸，${withDesc.length} 个有描述\n`);

// 输出需要翻译的内容
console.log('=== 需要翻译的描述 ===\n');
withDesc.forEach(z => {
  console.log(`### ${z.name} (${z.id})`);
  console.log(z.description);
  console.log();
});
