import { plants } from '../data/plants.js'
import Card from '../components/Card.jsx'

function PlantsList() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
      {plants.map(plant => (
        <Card key={plant.id} data={plant} type="plant" />
      ))}
    </div>
  )
}

export default PlantsList
