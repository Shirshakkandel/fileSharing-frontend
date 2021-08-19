import { IFile } from '@libs/type'
import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import { sizeInMb } from '@libs/sizeInMb'

const RenderFlexYcenter = styled.div``
const RightSpan = styled.span``

const RenderFile: FunctionComponent<{ file: IFile }> = ({
  file: { format, sizeInBytes, name },
}) => {
  return (
    <RenderFlexYcenter className="flex items-center w-full p-4 my-2">
      <img src={`/images/${format}.png`} alt="" className="w-14 h-14" />
      <span className="mx-2">{name}</span>
      <RightSpan className="ml-auto">{sizeInMb(sizeInBytes)}</RightSpan>
    </RenderFlexYcenter>
  )
}

export default RenderFile
