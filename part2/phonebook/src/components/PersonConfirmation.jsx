const PersonConfirmation = ({ message }) => {
  const personConfirmationStyle = {
    color: 'green',
    fontSize: 16,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5
  }
  if (message === null) {
    return null
  }

  return (
    <div className='confirmation' style={personConfirmationStyle}>
      {message}
    </div>
  )
}

export default PersonConfirmation