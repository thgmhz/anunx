import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core'

import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { DeleteForever } from '@material-ui/icons'

import TemplateDefault from '../../src/templates/Default'

const useStyles = makeStyles((theme) => ({
  mask: {},
  mainImage: {},
  boxContainer: {
    paddingBottom: theme.spacing(3),
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  thumbsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  dropzone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,    
    width: 200,
    height: 150,
    margin: '0 15px 15px 0',
    backgroundColor: theme.palette.background.default,
    border: '2px dashed black'
  },
  thumb: {
    position: 'relative',
    width: 200,
    height: 150,
    backgroundSize: 'cover',
    margin: '0 15px 15px 0',
    backgroundPosition: 'center center',

    '& $mainImage': {
      backgroundColor: 'blue',
      padding: '6px 10px',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },

    '&:hover $mask': {
      display: 'flex',
    },

    '& $mask': {
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      width: '100%',
      height: '100%'
    }
  }
}))

const validationSchema = yup.object().shape({
  title: yup.string()
    .min(6, 'Escreva um título maior')
    .max(100, 'Título muito grande')
    .required('Campo obrigatório'),  
})

const Publish = () => {
  const classes = useStyles()
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {      
      const newFiles = acceptedFile.map(file => {        
        return {
          ...file,
          preview: URL.createObjectURL(file)
        }
      })

      setFiles([
        ...files,
        ...newFiles,
      ])
    }
  })

  const handleRemoveFile = fileName => {
    const newFileState = files.filter(file => file.name !== fileName)
    setFiles(newFileState)
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={{
          title: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('ok enviou o form', values)
        }}
      >
        {
          ({
            values,
            errors,
            handleChange,
            handleSubmit,
          }) => {
            console.log(errors)

            return (
              <form onSubmit={handleSubmit}>
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Publicar Anúncio
                  </Typography>
                  <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    Quanto mais detalhado, melhor!
                  </Typography>
                </Container>

                <br/><br/>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Título do Anúncio
                    </Typography>
                    <TextField
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      label="ex.: Bicicleta Aro 18 com garantia"
                      size="small"
                      fullWidth
                      error={errors.title}
                      helperText={errors.title}
                    />
                    <br /><br />
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Categoria
                    </Typography>
                    <Select
                      native
                      value=""
                      fullWidth
                      onChange={() => {}}
                      inputProps={{
                        name: 'age',
                      }}
                    >
                      <option value="">Selecione</option>
                      <option value={1}>Bebê e Criança</option>
                      <option value={2}>Agricultura</option>
                      <option value={3}>Moda</option>
                      <option value={3}>Carros, Motos e Barcos</option>
                      <option value={3}>Serviços</option>
                      <option value={3}>Lazer</option>
                      <option value={3}>Animais</option>
                      <option value={3}>Moveis, Casa e Jardim</option>
                      <option value={3}>Imóveis</option>
                      <option value={3}>Equipamentos e Ferramentas</option>
                      <option value={3}>Celulares e Tablets</option>
                      <option value={3}>Esporte</option>
                      <option value={3}>Tecnologia</option>
                      <option value={3}>Emprego</option>
                      <option value={3}>Outros</option>
                    </Select>
                  </Box>
                </Container>
              
                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Imagens
                    </Typography>
                    <Typography component="div" variant="body2" color="textPrimary">
                      A primeira imagem é a foto principal do seu anúncio.
                    </Typography>
                    <Box className={classes.thumbsContainer}>
                      <Box className={classes.dropzone} {...getRootProps()}>
                        <input {...getInputProps()} />              
                        <Typography variant="body2" color="textPrimary">
                          Clique para adicionar ou arraste a imagem para aqui.
                        </Typography>
                      </Box>
                      
                      {
                        files.map((file, index) => (
                          <Box
                            key={file.name}
                            className={classes.thumb}
                            style={{ backgroundImage: `url(${file.preview})` }}
                          >
                            {
                              index === 0 ?
                                <Box className={classes.mainImage}>
                                  <Typography variant="body" color="secondary">
                                    Principal
                                  </Typography>
                                </Box> 
                              : null
                            }                  
                            <Box className={classes.mask}>
                              <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
                                <DeleteForever fontSize="large" />
                              </IconButton>
                            </Box>
                          </Box>
                        ))
                      }            
                    </Box>
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Descrição
                    </Typography>
                    <Typography component="div" variant="body2" color="textPrimary">
                      Escreva os detalhes do que está vendendo
                    </Typography>
                    <TextField
                      multiline
                      rows={6}
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Preço
                    </Typography>
                    <br />
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Valor</InputLabel>
                      <OutlinedInput
                        onChange={() => {}}
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        labelWidth={40}
                      />
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Dados de Contato
                    </Typography>
                    <TextField
                      label="Nome"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <br /><br />
                    <TextField
                      label="E-mail"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <br /><br />
                    <TextField
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box textAlign="right">
                    <Button type="submit" variant="contained" color="primary">
                      Publicar Anúncio
                    </Button>
                  </Box>
                </Container>
              </form>
            )
          }
        }
      </Formik>

      
    </TemplateDefault>
  )
}

export default Publish