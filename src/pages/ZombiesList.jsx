import { zombies } from '../data/zombies.js'
import Card from '../components/Card.jsx'

function ZombiesList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
      {zombies.map(zombie => (
        <Card key={zombie.id} data={zombie} type="zombie" />
      ))}
    </div>
  )
}

export default ZombiesList
