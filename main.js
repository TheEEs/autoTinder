const axios = require("axios").default;
const fs = require("fs");
const AUTH_TOKEN = "1dc280f2-b59c-4737-84c6-344c08c28dba";
var page = 0;

axios.get("https://api.gotinder.com/v2/matches?count=100",{
    headers:{
        "X-Auth-Token": AUTH_TOKEN,
        "Content-type": "application/json",
        "User-agent": "Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)"
    }
}).then(({data: {data}}) => {
    const next_page_token = data.next_page_token;
    for(var match of data.matches){
        for(var photo of match.person.photos){
            fs.appendFile(`data-${page}.txt`,photo.url + "\n",(err) => {

            });
        }
    }
    return next_page_token;
}).then(page_token => {
    return get_matches_photo(page_token);
});

async function get_matches_photo(page_token){
    if(page_token){
        page += 1;
        const {data: {data}} = await axios.get(`https://api.gotinder.com/v2/matches?count=100&page_token=${page_token}`,{
            headers:{
                "X-Auth-Token": AUTH_TOKEN,
                "Content-type": "application/json",
                "User-agent": "Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)"
            }
        });
        const next_page_token = data.next_page_token;
        for(var match of data.matches){
            for(var photo of match.person.photos){
                fs.appendFile(`data-${page}.txt`,photo.url + "\n",(err) => {

                });
            }
        }
        get_matches_photo(next_page_token);
    }
}