const rp = require('request-promise');
const cheerio = require('cheerio');

let titles = [];

const options = {
  uri: 'https://medium.com/@patrickferris17/has-recommended',
  transform: (body) => {
    return cheerio.load(body);
  }
}

//.x.cf.dx.dy.dz.dl.dk.ea.eb.cc.y

rp(options)
  .then(($) => {
    let array = ($.html().split('"type":"H3","href":null,"layout":null,"metadata":null,"text":'));
    let urls = ($.html().split('https'));
    console.log(urls);
    array.forEach((elem, idx) => {
      if(idx > 0) {
        titles.push(elem.split('"')[1]);
      }
    })

  })
  .then(() => {
    console.log(titles);
  })
  .catch((err) => {
    console.log('No Scraping Today :(');
    console.log(err);
});
