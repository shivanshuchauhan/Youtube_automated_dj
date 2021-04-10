const puppeteer = require("puppeteer");

(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
    });

    let allPages = await browser.pages();
    let  tab = allPages[0];
    await tab.goto("https://www.youtube.com");
    
    await tab.waitForSelector('#search' , {visible:true});
    
    await tab.type("#search", "punjabi party music");
    
    await tab.click("#search-icon-legacy");
    await tab.waitForTimeout(3000);
    await tab.waitForSelector('#title-wrapper' , {visible:true});
    
    await tab.click("#title-wrapper");
  

    playSong();
    function playSong(){
        clearInterval();
        let check= tab.waitForSelector('#search' , {visible:true});
        check
        .then(function(){
            
            let skipPromise = tab.waitForSelector('.ytp-ad-skip-button.ytp-button' , {visible:true});
            skipPromise
            .then(function (){
            tab.click(".ytp-ad-skip-button.ytp-button");
            console.log("initial skip done");
            })
            .catch(function(error){
            console.log("no initial skip");
            });
    
            let run=1;
            setInterval(function(){
            if(run<4){
                let skip = tab.waitForSelector('.ytp-ad-skip-button.ytp-button' , {visible:true});
                skip
                .then(function (){
                    tab.click(".ytp-ad-skip-button.ytp-button");
                    console.log("skip done");
                })
                .catch(function(error){
                    console.log("no skip");
                }); 
                run++;
            }else{
                tab.click(".ytp-next-button.ytp-button");
                run=1;
                playSong();
    
            }
           
            }, 31000);
    
        
        })
        .catch(function(error){
            console.log("exit");
        });
    }

})();