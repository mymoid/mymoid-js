'use client'

import React, { useEffect, useState } from 'react'
import { mymoid } from '@/app/lib/mymoid-embed'

export default function page() {
  const [holderName, setHolderName] = useState('')

  useEffect(() => {
    if (!mymoid.isFormLoaded()) {
      mymoid.init()
      mymoid.render()
    }

    mymoid.on('validation', (data) => console.log(data))
  }, [])

  async function submitAction() {
    await mymoid.submitPaymentForm(holderName)
  }

  return (
    <div>
      <iframe id="iframe-3ds" style={{ display: 'none' }}></iframe>
      <form action={submitAction}>
        <input
          type="text"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
          style={{ color: 'black' }}
        />
        <div id="embed-form" style={{ width: 300, height: 50 }}></div>
        <button id="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
