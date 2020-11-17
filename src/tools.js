// const cognito = require('amazon-cognito-identity-js')

exports.getVidID = url=> {
  let cleanUrl = url.replace("https://","").trim();
  
  if(cleanUrl.includes("youtu.be")){
    let splitUrl = cleanUrl.split("/")
    return(splitUrl[1])
  } else {
    let splitUrl = cleanUrl.split("?v=")
    let cleanSplitUrl = splitUrl[1].split("&");
    return(cleanSplitUrl[0])
  }
}

exports.deleteGuide = id =>{
  
  let url = "";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "http://localhost:8080/deleteGuide?guideId=" +id;
  } else {
      url = 
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/deleteGuide?guideId=" + id
  }
  
  fetch(url).then(res=>{
    console.log(res);
  })
}
