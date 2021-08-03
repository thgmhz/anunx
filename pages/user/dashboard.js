import {
  Button,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { getSession } from "next-auth/client"

import dbConnect from '../../src/utils/dbConnect'
import ProductsModel from '../../src/models/Products'
import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'

const useStyles = makeStyles((theme) => ({
  buttonAdd: {
    margin: '30px auto',
    display: 'block',
  }
}))

const Home = ({ products }) => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center">
          Meus Anúncios
        </Typography>
        <Button variant="contained" color="primary" className={classes.buttonAdd}>
          Publicar novo anúncio
        </Button>
      </Container>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {
            products.map(product => (
              <Grid key={product._id} item xs={12} sm={6} md={4}>
                <Card
                  image={`/uploads/${product.files[0].name}`}
                  title={product.title}
                  subtitle={product.price}
                  actions={
                    <>
                      <Button size="small" color="primary">
                        Editar
                      </Button>
                      <Button size="small" color="primary">
                        Remover
                      </Button>
                    </>
                  }
                />              
              </Grid> 
            ))
          }                          
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  await dbConnect()

  const products = await ProductsModel.find({ 'user.id': session.userId })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default Home