import React from 'react'

const Notification = (props) => {
    const { value, notificationType } = props
    console.log(value, notificationType)
  return (
    <div className={`notification-${notificationType}`}>{value}</div>
  )
}

export default Notification