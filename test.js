fetch('http://localhost:3000/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currenstate: 'RETURN ONLY JSON & DONT HALLUCINATE MAKE IT EXTRA ACCURATE, CALCULATE WITH MATH RETURN ONLY JSON. distance to obstacle 2 meters, current speed is 1km/hr. destination is 175 degrees from the current direction the current angle is 0 degrees. generate 20 step action sequence to reach destination in JSON the values should be the function, current, angle of vehicle (start with 0), & speed in a scale of 1-10. each turns the vehicle 15 degrees to whatever direction u choose. executable functions are move_forward, move_right, move_left, break, reverse.', age: 30 }),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));