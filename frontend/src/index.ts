const API = process?.env?.API || 'api';
console.log(API)
fetch(`${API}/init`).then((v) => console.log(v))
