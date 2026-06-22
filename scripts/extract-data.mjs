// 从 ES 模块提取数据为 JSON
import { plants } from '../src/data/pvz2/plants.js';
import { zombies } from '../src/data/pvz2/zombies.js';

const type = process.argv[2];
if (type === 'plants') {
  process.stdout.write(JSON.stringify(plants));
} else if (type === 'zombies') {
  process.stdout.write(JSON.stringify(zombies));
} else {
  process.exit(1);
}
