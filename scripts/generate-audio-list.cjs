/**
 * 音频生成列表脚本
 *
 * 运行此脚本会生成所有需要的音频文件列表
 * 你可以用任何 TTS 工具（如 mimo-v2.5-tts-voicedesign）根据此列表生成音频
 *
 * 用法: node scripts/generate-audio-list.js
 */

const plants = require('../src/data/pvz1/plants.js').plants;
const zombies = require('../src/data/pvz1/zombies.js').zombies;

console.log('=== PvZ 1 音频生成列表 ===\n');

console.log('## 植物音频 (49个)\n');
plants.forEach(p => {
  const text = `${p.name}。${p.description}`;
  console.log(`文件名: ${p.id}.mp3`);
  console.log(`内容: ${text}`);
  console.log('');
});

console.log('\n## 僵尸音频 (26个)\n');
zombies.forEach(z => {
  const text = `${z.name}。${z.description}`;
  console.log(`文件名: ${z.id}.mp3`);
  console.log(`内容: ${text}`);
  console.log('');
});

console.log('\n=== 使用说明 ===');
console.log('1. 将上述音频文件保存到 public/audio/ 目录');
console.log('2. 文件名使用 ID + .mp3 格式（如 peashooter.mp3）');
console.log('3. 音频格式建议：MP3，采样率 44.1kHz，比特率 128kbps');
console.log('4. 语言：中文（简体）');
