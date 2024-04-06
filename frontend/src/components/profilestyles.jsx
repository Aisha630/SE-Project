export const profileStyles = {
    width: '90%',
    display: 'flex',
    height: '225px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#C7e3c8',
    borderRadius: '16px', // Soft corners
    position: 'relative', // Required for absolute positioning of the Avatar
    padding: '20px',
    marginTop: '20px', // Space from the top of the Grid
    overflow: 'visible', // This will allow the Avatar to overlay on top of the Card without being cut off
    zIndex: 1,
}

export const profileAvatarStyles = {
    width: 120,
    height: 120,
    mb: -6,
    position: 'absolute',
    top: -60,
    zIndex: 2, // The Avatar is above the Card
}

export const graphStyles = {
    width: '90%',
    display: 'flex',
    height: '225px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#white',
    borderRadius: '16px', // Soft corners
    position: 'relative', // Required for absolute positioning of the Avatar
    padding: '20px',
    marginTop: '20px', // Space from the top of the Grid
    overflow: 'visible', // This will allow the Avatar to overlay on top of the Card without being cut off
    zIndex: 1, // Adjust if needed to ensure proper layering
}