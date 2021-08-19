import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

const DropZone = styled.div``
const DashedFlexColCenter = styled.div``

export const DropZoneComponent = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/jpeg,image/png,audio/mpeg',
  })

  return (
    <div className="w-full p-4">
      <DropZone {...getRootProps()} className="rounded-md cursor-pointer h-80 focus:outline-none">
        <input {...getInputProps()} />

        <DashedFlexColCenter
          className={`h-full space-y-3 border-2 border-dashed flexColCenter border-yellow-light rounded-xl ${
            isDragReject === true ? 'border-red-500' : ''
          } ${isDragAccept === true ? 'border-green-500' : ''} `}
        >
          <img src="/images/folder.png" alt="folder" className="w-16 h-16" />
          {isDragReject ? (
            <p>Sorry, This app only supports images and mp3</p>
          ) : (
            <>
              <p>Drag & Drop Files Here</p>
              <p className="mt-2 text-base text-gray-300">Only jpeg , png & mp3 files supported</p>
            </>
          )}
        </DashedFlexColCenter>
      </DropZone>
    </div>
  )
}

export default DropZoneComponent
