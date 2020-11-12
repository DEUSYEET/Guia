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
  let url = "http://localhost:8080/deleteGuide?guideId=" +id;
  fetch(url).then(res=>{
    console.log(res);
  })
}
