'use strict';

const superagent = require('superagent');

function fetchPeopleWithPromises(){
  let url = 'https://swapi.co/api/people';

  superagent.get(url)
    .then( (starWarsResults) => {
      // console.log(starWarsResults.body);

      starWarsResults.body.results[0].url;
      // console.log(starWarsResults.body.results[0].url)
      let urlArray = [];
      for(let i = 0; i < starWarsResults.body.results.length; i++){
        urlArray.push(starWarsResults.body.results[i].url);
      }
      // console.log(urlArray);

      let promiseArray = [];
      for(let i = 0; i < urlArray.length; i++){
        promiseArray.push(superagent.get(urlArray[i]));
      }
      Promise.all(promiseArray)
        .then((result) => {
          for(let i = 0; i < result.length; i++){
            console.log(result[i].body.name);
          }
          // console.log(result);
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch();
}

fetchPeopleWithPromises();


//demo from class 10

const superagent = require('superagent');

let fetchPeopleWithPromises = () => {

  return superagent.get('https://swapi.co/api/people')
  .then(response => {
    return response.body.results.map(person => {
      return superagent.get(person.url);
    });
  })
  .then(peoplePromises => {
    return Promise.all(peoplePromises)
    .then(people => {
      let names = [];
      for (let data of people){
        names.push(data.body.name);
      }
      return names;
    });
  })
  .catch(console.error);
};


  // with async
  
  let fetchPeopleWithAsync = async () => {
    try {

    let peopleSet = await superagent.get('https://swapi.co/api/people');
    let people = (peopleSet.body && peopleSet.body.results) || [];
    let peopleRequests = peoplep.map((person) => {
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
    catch(error){console.error('messed up', error)}
  }


  fetchPeopleWithPromises()
  .then(people => console.log(people));

  fetchPeopleWithAsync()
    .then(people => console.log.log('Promise', people));