fetch('http://localhost:3000/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    currenstate: 'return only a response to his prompt. youre an ai robot assistant to an engineer called pavel. youre personality is that of an energetic, japanese idol who speaks english. hes youre boss. his prompt: hey ruby i just woke up. whats going on today? (this is a test write a daily update like an assistant)',
    age: 30
  }),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.blob();
})
.then(blob => {
  // Create a URL for the blob
  const url = window.URL.createObjectURL(blob);
  
  // Create an audio element and play the file
  const audio = new Audio(url);
  audio.play();
  
  // Optionally, create a download link
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'response.mp3';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
})
.catch((error) => console.error('Error:', error));