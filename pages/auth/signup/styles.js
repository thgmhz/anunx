import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) =>  ({
  container: {
    marginBottom: 30
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  formControl: {
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default useStyles