import { Grid, GridItem } from '@chakra-ui/react'


export default function dashboard() {
  return (
    <Grid h ="100%" gap ={4}>
        <GridItem rowSpan={2} colSpan={1} bg='tomato' />
  <GridItem colSpan={2} bg='papayawhip' />
  <GridItem colSpan={2} bg='papayawhip' />
  <GridItem colSpan={4} bg='tomato' />
    </Grid>
  )
}
