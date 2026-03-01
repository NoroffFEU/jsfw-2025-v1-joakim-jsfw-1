import { Link, useParams } from 'react-router-dom'

function ProductPage() {
  const { productId } = useParams()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>
      <p className="mb-6">Product ID: {productId}</p>
      <Link to="/" className="underline font-medium">
        Back to home
      </Link>
    </main>
  )
}

export default ProductPage
