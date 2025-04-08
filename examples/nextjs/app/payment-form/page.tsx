'use client'

import React, { useEffect } from 'react'
import { mymoid } from '@/app/lib/mymoid-embed'

export default function page() {
  useEffect(() => {
    if (!mymoid.isFormLoaded()) {
      mymoid.init()
      mymoid.render()
    }
  }, [])

  return (
    <div>
      <div id="embed-form"></div>
      <button id="submit-button">Submit</button>
    </div>
  )
}
