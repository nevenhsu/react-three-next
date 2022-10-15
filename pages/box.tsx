import Instructions from 'components/dom/Instructions'
import dynamic from 'next/dynamic'

type Props = {}

const Box = dynamic(() => import('components/canvas/Box'), {
  ssr: false,
})

// Step 5 - delete Instructions components
const Page = (props: Props) => {
  return (
    <>
      <Instructions />
    </>
  )
}

Page.r3f = (props: Props) => (
  <>
    <Box route="/" />
  </>
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Box',
    },
  }
}
