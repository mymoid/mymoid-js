'use client'

import React, { useEffect } from 'react'
import { mymoid } from '@/app/lib/mymoid-embed'

export default function page() {
  useEffect(() => {
    if (!mymoid.isFormLoaded()) {
      mymoid.init()
      mymoid.render()
    }

    mymoid.on('validation', (data) => console.log(data))
  }, [])

  return (
    <div>
      <iframe id="iframe-3ds" style={{ display: 'none' }}></iframe>
      <div id="embed-form" style={{ width: 300, height: 50 }}></div>
      <button id="submit-button">Submit</button>
    </div>
  )
}
