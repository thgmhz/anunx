import Header from '../components/Header'

const Default = ({ children }) => {

  return (
    <>
      <Header />
      {children}
      <footer>FOOTER</footer>
    </>
  )
}

export default Default