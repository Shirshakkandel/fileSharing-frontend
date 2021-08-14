import styled from 'styled-components'

const FlexCol = styled.div``
const Delete = () => {
  return (
    <div className="w-full px-10 py-48 xl:max-w-4xl xl:mx-auto">
      <FlexCol className="flex flex-col w-full mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-50 ">
          This is a boilerplate for Next js with TypeScript, Tailwind CSS(@JIT) and Styled
          components
        </h1>
        <FlexCol className="flex flex-col pl-8 space-y-4 text-xl font-medium text-gray-300">
          <h3>- src based project directory</h3>
          <h3>- typeScript path mapping already configured</h3>
        </FlexCol>
        <FlexCol className="flex flex-col pl-8 space-y-4 text-xl font-medium text-gray-300">
          <h5 className="text-2xl">Tips:</h5>
          <h3>- vs code users : install Tailwind CSS IntelliSense & Headwind</h3>
          <h3>- use next-connect for the api</h3>
        </FlexCol>
      </FlexCol>
    </div>
  )
}

export default Delete
