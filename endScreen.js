

const finalScore = (document.getElementById('finalScore'))
const newScore = localStorage.getItem('newScore')
finalScore.innerHTML =(`Congratulations you got ${newScore}/10 right!`);