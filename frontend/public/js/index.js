"use strict";(()=>{var o=process?.env?.API||"api";console.log(o);fetch(`${o}/init`).then(e=>console.log(e));})();
