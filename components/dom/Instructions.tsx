import { Box, Text, Stack, Space } from '@mantine/core'

export default function Instructions() {
  return (
    <Box
      className="absolute-horizontal pointer-events-none select-none"
      sx={{
        top: 32,
      }}
    >
      <Text
        size="xs"
        color="dimmed"
        sx={(theme) => ({
          display: 'none',
          '@media (min-width: 576px)': {
            display: 'block',
          },
        })}
      >
        This is a minimal starter for Nextjs + Threejs.
        <br /> Click on the cube to navigate to the `/box` page.
        <br /> OrbitControls is enabled by default.
      </Text>

      <Space h="md" />

      <Stack spacing="xs">
        <Text className="whitespace-nowrap">
          Step 1 - update:{' '}
          <Text inherit span color="red">
            pages/index
          </Text>
        </Text>

        <Text className="whitespace-nowrap">
          Step 2 - update:{' '}
          <Text inherit span color="red">
            components/canvas/Shader/index
          </Text>
        </Text>

        <Text className="whitespace-nowrap">
          Step 3 - delete:{' '}
          <Text inherit span color="red">
            pages/box
          </Text>
        </Text>

        <Text className="whitespace-nowrap">
          Step 4 - update header:{' '}
          <Text inherit span color="red">
            components/Head
          </Text>
        </Text>

        <Text className="whitespace-nowrap">
          Step 5 - delete:{' '}
          <Text inherit span color="red">
            components/dom/Instructions
          </Text>
        </Text>
      </Stack>
    </Box>
  )
}
