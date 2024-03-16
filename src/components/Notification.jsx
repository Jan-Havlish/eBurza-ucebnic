import PropTypes from 'prop-types'

const Notification = (props) => {
    const { value, notificationType } = props
    console.log(value, notificationType)
  return (
    <div className={`notification-${notificationType}`}>{value}</div>
  )
}

export default Notification

Notification.propTypes = {
    value: PropTypes.string.isRequired,
    notificationType: PropTypes.string.isRequired
}