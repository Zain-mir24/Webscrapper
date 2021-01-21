     const request = require("request-promise")
     const cheerio = require("cheerio")
     const json2csv = require("json2csv").Parser  
     const fs= require("fs")
     
     const movie="https://www.imdb.com/title/tt2560140/?ref_=hm_fanfav_tt_9_pd_fp1";
     
     (async()=> {
          let imdbdata=[];
          const response = await request({
            method: 'POST',
            uri: movie,
            gzip:true,
            headers: {       
                accept: 
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
               "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
            }
          });
          let $ = cheerio.load(response);
         const title =$('div[class="title_wrapper"]>h1').text().trim() //getting title from the website
         const rating=$('div[class="ratingValue"]').text().trim() //getting the rating
         const summary=$('div[class="summary_text"]').text().trim()

         imdbdata.push({
             title:title,                   //webscraper workings
             rating: rating,
             summmary:summary
         });
         const j2csv = new json2csv()
         const csv =j2csv.parse(imdbdata)


         fs.writeFileSync("./imdb.csv",csv,"utf-8");
      })();
    
    
      process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection at:', promise, 'reason:', reason);
        // Application specific logging, throwing an error, or other logic here
      });
    
    
    
   