import { Header } from '../../../components'

const allUsers = () => {
  const user = { name: 'Ankur' }
  
  return (
    <main className="dashboard wrapper">
      <Header 
        title={`Welcome ${user?.name ?? 'Guest'}`}
        description="Check out our users in real time"
      />
      All Users Page Contents
    </main>
  )
}

export default allUsers