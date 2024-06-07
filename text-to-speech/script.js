document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convert-button');
    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voice-select');
    const audioPlayer = document.getElementById('audio-player');

    convertButton.addEventListener('click', convertTextToSpeech);

    function convertTextToSpeech() {
        const text = textInput.value.trim();
        const voice = voiceSelect.value;

        if (!text) {
            alert('Please enter some text.');
            return;
        }

        fetch('https://48pn5nnkel.execute-api.us-east-2.amazonaws.com/dev/text-to-speech', { // Replace with your API Gateway endpoint URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, voice })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to convert text to speech.');
            }
            return response.json();
        })
        .then(data => {
            const audioUrl = data.audio_url;
            audioPlayer.src = audioUrl;
            audioPlayer.style.display = 'block';
            audioPlayer.play();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    }
});
