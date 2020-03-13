var axios = require('axios');
var cheerio = require('cheerio');

/**
 * 得到所有电影的html字符串
 */
async function getMoviesHtml(){
    const resp = await axios.get('https://movie.douban.com/chart');
    return resp.data;
}


async function test(){
    const html  = await getMoviesHtml();
   
    let $ = cheerio.load(html);
    let trs = $('tr.item');
    console.log(trs.length)
    // $.html();
}

test();