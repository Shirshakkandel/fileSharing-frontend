import axios from 'axios'
import { IFile } from 'libs/type'
import { GetServerSidePropsContext, NextPage } from 'next'
import styled from 'styled-components'
import fileDownload from 'js-file-download'
import RenderFile from '@components/RenderFile'

//layout
const DownloadFlexColCenter96 = styled.div``

const index: NextPage<{ file: IFile }> = ({ file: { format, name, sizeInBytes, id } }) => {
  // console.log(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/files/${id}`)
  async function handleDownload() {
    const { data } = await axios.get(`api/files/${id}/download`, { responseType: 'blob' })
    fileDownload(data, name)
  }
  return (
    <DownloadFlexColCenter96 className="py-3 space-y-4 bg-gray-800 rounded-md shadow-xl flexColCenter w-96">
      {!id ? (
        <span>oops! File does not exist! check the URL</span>
      ) : (
        <>
          <img src="/images/file-download.png" alt="" className="w-16 h-16" />
          <h1 className="text-xl">Your file is ready to be downloaded</h1>
          <RenderFile file={{ format, name, sizeInBytes }} />
          <button className="button_w-44_my-5" onClick={handleDownload}>
            Download
          </button>
        </>
      )}
    </DownloadFlexColCenter96>
  )
}

export default index

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  let file

  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/files/${id}`)
    file = data
  } catch (error) {
    console.log(error.response.data)
    file = {}
  }

  return {
    props: {
      file,
    }, // will be passed to the page component as props
  }
}
