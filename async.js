'use strict';

const superagent = require('superagent');


let fetchPeopleWithAsync = async () => {
  try {

    let peopleSet = await superagent.get('https://swapi.co/api/people');
    let people = (peopleSet.body && peopleSet.body.results) || [];
    let peopleRequests = people.map((person) => {
      return superagent.get(person, url);
    });
    let swapiNames = await Promise.all(peopleRequests)
      .then(people => {
        let names = [];
        for (let data of people){
          names.push(data.body.name);
        }
        return names;
      });
    return swapiNames;
  }
  catch(error){console.error('messed up', error);}
};


fetchPeopleWithAsync()
  .then(people => console.log.log('Promise', people));