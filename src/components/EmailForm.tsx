import axios from 'axios'
import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'

const FlexColCenter = styled.div``

const EmailForm: FunctionComponent<{ id: string }> = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState('')
  const [emailTo, setEmailTo] = useState('')
  const [message, setMessage] = useState(null)

  const handleEmail = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'api/files/email',
        data: {
          id,
          emailFrom,
          emailTo,
        },
      })

      setMessage(data.message)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  return (
    <FlexColCenter className="w-full p-2 space-y-3 flexColCenter">
      <h3>You can also send the file through mail</h3>

      <form onSubmit={handleEmail} className="w-full p-2 space-y-3 flexColCenter">
        <input
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none min-w-[300px]"
          type="email"
          placeholder="Email From"
          required
          onChange={(e) => setEmailFrom(e.target.value)}
          value={emailFrom}
        />
        <input
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none min-w-[300px]"
          type="email"
          placeholder="Email To"
          required
          onChange={(e) => setEmailTo(e.target.value)}
          value={emailTo}
        />
        <button className="button_w-44_my-5" type="submit">
          Email
        </button>
      </form>

      {message && <p className="font-medium text-red-500">{message}</p>}
    </FlexColCenter>
  )
}

export default EmailForm
