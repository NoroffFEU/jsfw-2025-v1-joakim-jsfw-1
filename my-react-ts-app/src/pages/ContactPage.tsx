import { Link } from 'react-router-dom'

function ContactPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p className="mb-6">You can add your contact form/content here.</p>
      <Link to="/" className="underline font-medium">
        Back to home
      </Link>
    </main>
  )
}

export default ContactPage
