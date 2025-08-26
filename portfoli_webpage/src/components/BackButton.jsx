export default BackButton (){
    return(
        <button 
                onClick={handleBackClick}
                style={{
                    position: 'absolute',
                    top: '100px', // Adjusted to account for header
                    left: '20px',
                    zIndex: 1000,
                    padding: '10px 20px',
                    backgroundColor: '#6C4F8C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif'
                }}
                >
                ← Back
        </button>
    )
}