const volumeControl = document.getElementById('volumeControl');
const backButton = document.getElementById('backButton');

// Get the existing music volume from localStorage or set it to 0.5 if not available
const currentVolume = localStorage.getItem('musicVolume') || 0.5;
volumeControl.value = currentVolume;

volumeControl.addEventListener('input', () => {
    const newVolume = volumeControl.value;
    localStorage.setItem('musicVolume', newVolume);
    window.opener.postMessage({ type: 'setVolume', volume: newVolume }, '*');
});

backButton.addEventListener('click', () => {
    window.close();
});
