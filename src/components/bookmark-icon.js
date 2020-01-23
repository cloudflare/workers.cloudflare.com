import React from "react"

const uid = () => `id${ Math.random().toString().split('.')[1] }`

const BookmarkIcon = (props) => {
  const gradientID = uid()
  const shadowID = uid()
  const pathID = uid()

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 34">
        <defs>
          <linearGradient id={gradientID} x1="76%" x2="12%" y1="0%" y2="107%">
            <stop offset="0%" stopColor="#f8ac4a"/>
            <stop offset="100%" stopColor="#f48424"/>
          </linearGradient>
          <filter id={shadowID} width="140%" height="130%" x="-20%" y="-10%" filterUnits="objectBoundingBox">
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/>
            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1.5"/>
            <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.184188179 0"/>
          </filter>
          <path id={pathID} d="M2 0h22a2 2 0 012 2v29.586a1 1 0 01-1.707.707L13.707 21.707a1 1 0 00-1.414 0L1.707 32.293A1 1 0 010 31.586V2a2 2 0 012-2z"/>
        </defs>
        <use fill="#000" filter={"url(#" + shadowID +")"} href={"#" + pathID}/>
        <use fill={"url(#" + gradientID +")"} href={"#" + pathID}/>
      </svg>
    </>
  )
}

export default BookmarkIcon
