import { useState } from 'react'
import DropZoneComponent from '@components/DropZoneComponent'
import styled from 'styled-components'
import RenderFile from '@components/RenderFile'
import axios from 'axios'
import DownloadFile from '@components/DownloadFile'
import EmailForm from '@components/EmailForm'

//styled components styled
const FlexColCenter = styled.div``
const RoundedBox500 = styled.div``
const Download = styled.div``

export default function Home() {
  const [file, setFile] = useState(null)
  const [id, setId] = useState(null)
  const [downloadPageLink, setDownloadPageLink] = useState(null)
  const [uploadState, setUploadState] = useState<
    'Uploading' | 'Upload Failed' | 'Uploaded' | 'Upload'
  >('Upload')

  async function handleUpload() {
    if (uploadState === 'Uploading') return
    setUploadState('Uploading')
    const formData = new FormData()
    formData.append('myFile', file)

    try {
      const { data } = await axios({
        method: 'post',
        data: formData,
        url: 'api/files/upload',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setDownloadPageLink(data.downloadPageLink)
      setId(data.id)
    } catch (error) {
      console.log(error.response.data)
      setUploadState('Upload Failed')
    }
  }

  function resetComponent() {
    setFile(null)
    setDownloadPageLink(null)
    setUploadState('Upload')
  }

  return (
    <FlexColCenter className="flexColCenter">
      <h1 className="my-4 text-3xl font-medium">Go a File? Share It like Fake News</h1>

      <RoundedBox500 className="w-full bg-gray-800 rounded shadow-xl flexColCenter lg:w-[500px]">
        <DropZoneComponent setFile={setFile} />
        {/* Render File if file exites */}
        {file && (
          <RenderFile
            file={{ format: file.type.split('/')[1], name: file.name, sizeInBytes: file.size }}
          />
        )}

        {/* Upload Button if file and but not uploadedPageLink */}
        {!downloadPageLink && file && (
          <button className="button_w-44_my-5" onClick={handleUpload}>
            {uploadState}
          </button>
        )}

        {/* Show link if we have downloadPageLink */}
        {downloadPageLink && (
          <Download className="p-2 text-center ">
            <DownloadFile downloadPageLink={downloadPageLink} />
            <EmailForm id={id} />
            <button className="button_w-44_my-5" onClick={resetComponent}>
              Upload New File
            </button>
          </Download>
        )}
      </RoundedBox500>
    </FlexColCenter>
  )
}
