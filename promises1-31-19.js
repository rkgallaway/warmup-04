'use strict';

const superagent = require('superagent');

let fetchPeopleWithPromises = () =>{
  return superagent.get('https://swapi.co/api/people')
    .then(res => {
      return res.body.results.map(person => {
        return superagent.get(person.url);
      });
    })
    .then(peoplePromises => {
      return Promise.all(peoplePromises)
        .then(people => {
          let names =[];
          for (let data of people){
            names.push(data.body.name);
          }
          return names;
        });
    }).catch(console.error);
};

fetchPeopleWithPromises()
  .then(people => console.log(people));