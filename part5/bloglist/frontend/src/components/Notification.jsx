const Notification = ({ errorMessage, infoMessage }) => {
    if (errorMessage === null && infoMessage === null) {
        return null
    }

    if (errorMessage === null) {
        return (
            <div className='info'>
                {infoMessage}
            </div>
        )
    }

    return (
        <div className='error'>
            {errorMessage}
        </div>
    )
}

export default Notification
