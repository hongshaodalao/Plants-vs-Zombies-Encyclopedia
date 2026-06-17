import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import PlantsList from './pages/PlantsList.jsx'
import PlantDetail from './pages/PlantDetail.jsx'
import ZombiesList from './pages/ZombiesList.jsx'
import ZombieDetail from './pages/ZombieDetail.jsx'
import Pvz2Home from './pages/Pvz2Home.jsx'
import Pvz2PlantsList from './pages/Pvz2PlantsList.jsx'
import Pvz2PlantDetail from './pages/Pvz2PlantDetail.jsx'
import Pvz2ZombiesList from './pages/Pvz2ZombiesList.jsx'
import Pvz2ZombieDetail from './pages/Pvz2ZombieDetail.jsx'
import WorldsList from './pages/WorldsList.jsx'
import WorldDetail from './pages/WorldDetail.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<PlantsList />} />
        <Route path="plants/:id" element={<PlantDetail />} />
        <Route path="zombies" element={<ZombiesList />} />
        <Route path="zombies/:id" element={<ZombieDetail />} />
        <Route path="pvz2" element={<Pvz2Home />} />
        <Route path="pvz2/plants" element={<Pvz2PlantsList />} />
        <Route path="pvz2/plants/:id" element={<Pvz2PlantDetail />} />
        <Route path="pvz2/zombies" element={<Pvz2ZombiesList />} />
        <Route path="pvz2/zombies/:id" element={<Pvz2ZombieDetail />} />
        <Route path="pvz2/worlds" element={<WorldsList />} />
        <Route path="pvz2/worlds/:id" element={<WorldDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
