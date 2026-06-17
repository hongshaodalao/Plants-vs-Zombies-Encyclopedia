import { useParams, Navigate } from 'react-router-dom'
import { plants } from '../data/plants.js'
import DetailView from '../components/DetailView.jsx'

function PlantDetail() {
  const { id } = useParams()
  const plant = plants.find(p => p.id === id)

  if (!plant) {
    return <Navigate to="/plants" replace />
  }

  return <DetailView data={plant} list={plants} type="plant" />
}

export default PlantDetail