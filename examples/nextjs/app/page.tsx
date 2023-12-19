import { MymoidApi } from 'mymoid-api'

export default function Page(): JSX.Element {
  const api = new MymoidApi()
  const apiKey = api.getApiKey()

  return <>Authentication: {apiKey}</>
}
