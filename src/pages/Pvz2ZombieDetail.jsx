import { useParams, Navigate } from 'react-router-dom'
import { zombies } from '../data/pvz2/zombies.js'
import Pvz2DetailView from '../components/Pvz2DetailView.jsx'

function Pvz2ZombieDetail() {
  const { id } = useParams()
  const zombie = zombies.find(z => z.id === id)

  if (!zombie) {
    return <Navigate to="/pvz2/zombies" replace />
  }

  return <Pvz2DetailView data={zombie} list={zombies} type="zombie" />
}

export default Pvz2ZombieDetail
