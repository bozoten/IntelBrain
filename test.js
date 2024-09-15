fetch('http://localhost:3000/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currenstate: 'distance to obstacle 2 meters, current speed is 1km/hr. destination is 125 degrees from the current direction & 1.6 meters. generate 20 step action sequence to reach destination in JSON the values should be the function, & acceleration in a scale of 1-10. executable functions are move_forward, move_right, move_left, break, reverse. RETURN ONLY JSON.', age: 30 }),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));