import { useParams } from 'react-router'

const Visualizer = () => {
  const { id } = useParams()

  return (
    <div className="visualizer-route">
      <h1>Visualizer</h1>
      <p>{id}</p>
    </div>
  )
}

export default Visualizer
