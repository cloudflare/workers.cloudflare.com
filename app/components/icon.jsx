import React from "react"

import "./icon.css"

const randomString = () => Math.random().toString().split(".")[1].substr(0, 6)
const uniqueReadableID = (prefix) => `${prefix}-${randomString()}`

const Icon = (props) => {
  const gradientID = uniqueReadableID("gradient")
  const shadowID = uniqueReadableID("shadow")
  const pathID = uniqueReadableID("path")

  return (
    <svg
      className="Icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={props.viewBox}
    >
      <defs>
        {props.withGradientFill && (
          <linearGradient id={gradientID} x1="76%" x2="12%" y1="0%" y2="107%">
            <stop offset="0%" stopColor="#f8ac4a" />
            <stop offset="100%" stopColor="#f48424" />
          </linearGradient>
        )}
        {props.withShadow && (
          <filter
            id={shadowID}
            width="140%"
            height="130%"
            x="-20%"
            y="-10%"
            filterUnits="objectBoundingBox"
          >
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
              stdDeviation="1.5"
            />
            <feColorMatrix
              in="shadowBlurOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.184188179 0"
            />
          </filter>
        )}
        <path id={pathID} d={props.pathD} />
      </defs>
      {props.withShadow && (
        <use
          fill="#000"
          filter={"url(#" + shadowID + ")"}
          href={"#" + pathID}
        />
      )}
      <use
        fill={
          props.withGradientFill ? "url(#" + gradientID + ")" : "currentColor"
        }
        href={"#" + pathID}
      />
    </svg>
  )
}

export default Icon
