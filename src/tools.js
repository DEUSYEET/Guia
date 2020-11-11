import { CognitoUserPool } from 'amazon-cognito-identity-js'
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




exports.userPool = new CognitoUserPool({
    UserPoolId:"us-east-2_r9mOSgn28",
    ClientId:"4id2vq725vkn530cdcj355d0dt",
})
