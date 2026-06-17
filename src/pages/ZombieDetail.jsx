import { useParams, Navigate } from 'react-router-dom'
import { zombies } from '../data/zombies.js'
import DetailView from '../components/DetailView.jsx'

function ZombieDetail() {
  const { id } = useParams()
  const zombie = zombies.find(z => z.id === id)

  if (!zombie) {
    return <Navigate to="/zombies" replace />
  }

  return <DetailView data={zombie} list={zombies} type="zombie" />
}

export default ZombieDetail