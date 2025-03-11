import { Alert } from 'react-bootstrap'

const Notification = ({ message, variant }) => {
  return (
    <div className="container">
      {message && <Alert variant={variant}>{message}</Alert>}
    </div>
  )
}

export default Notification
