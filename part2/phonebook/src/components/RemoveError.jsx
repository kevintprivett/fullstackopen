const RemoveError = ({ message }) => {
  const removeErrorStyle = {
    color: 'red',
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
    <div className='error' style={removeErrorStyle}>
      {message}
    </div>
  )
}

export default RemoveError