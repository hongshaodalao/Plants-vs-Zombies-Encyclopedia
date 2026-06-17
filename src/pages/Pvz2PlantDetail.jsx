import { useParams, Navigate } from 'react-router-dom'
import { plants } from '../data/pvz2/plants.js'
import Pvz2DetailView from '../components/Pvz2DetailView.jsx'

function Pvz2PlantDetail() {
  const { id } = useParams()
  const plant = plants.find(p => p.id === id)

  if (!plant) {
    return <Navigate to="/pvz2/plants" replace />
  }

  return <Pvz2DetailView data={plant} list={plants} />
}

export default Pvz2PlantDetail
