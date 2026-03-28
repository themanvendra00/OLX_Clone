

///uploading the data for signup after validating
class User{
        constructor(){
           
        }
        validateUS(name){
          return name.length<=3?false:true
        };
        validatePassword(password){
          let x=password.includes('!')||password.includes('@')||password.includes('#')||password.includes('&')||password.includes('$');
          let p=password.toString();
          if(p==""){
            alert('password is empty')
          }
          let y=p.length>=8;
          let z=p[0]==p[0].toUpperCase();
          if(x&&y&&z){
            return true;
          }else{
            return false;
          }
        };
      async signUp(n,e,p,m,a,s){
          let isValidated=this.validateUS(n)&&this.validatePassword(p);
          if(isValidated){
            let userdata = await getUsersList();
            let result = userdata.some(function (el) { return el.email == e; });
            if(result==false){
              addUserLocal({
                id: "local-" + Date.now(),
                username: n,
                email: e,
                password: p,
                mobile: m,
                avatar: a || "",
                status: s
              });
              window.location.href="./login.html";
            }else{
              alert('Email already exists')
            }
         }else{
          alert('Please enter valid credentials')
        }
      }  
    } 
    let user=new User();
let inp_image = document.getElementById("image");
inp_image.onchange = () => {

handleImage();
alert("image uploaded, Sign Up to continue")
};


let image_url;
const handleImage = async () => {

//1.accept the fle
let img =document.getElementById("image");
let actual_img = img.files[0];
console.log("img",actual_img);
//imgbb is asking to send data in formdata object
let form = new FormData();
form.append("image",actual_img);
let res = await fetch(`https://api.imgbb.com/1/upload?key=cee8518884c81f87302c5c79899caa97`,
{
    method:"POST",
    body:form,
}
);
let data = await res.json();
 //console.log("datareal:",data);
image_url = data.data.display_url;
console.log("image_url:",image_url);
};
   
    const registerUser=()=>{

        const name=document.getElementById('name').value;
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        const mobile=document.getElementById('mobile').value;
        // const avatar = this.image_url;
        user.signUp(name,email,password,mobile,image_url,"IsNotActive");
        // console.log(user);
    }
    let signupbtn=document.getElementById("signup");
    signupbtn.addEventListener("click",function(){
      registerUser()
    });

    ///homepage address

    let home=document.querySelector('#heading img');
     home.onclick=function(){
     window.location.href='./index.html'
    }

    //add event handler on select file input



// new registration------------------------------------------->

// let registerUserName =document.getElementById("name");
// let registerUserEmail =document.getElementById("email");
// let registerUserPassword =document.getElementById("password");
// let registerUserMobile =document.getElementById("mobile");
// let registerUserButton =document.getElementById("signup");

// registerUserButton.addEventListener("click",async function(){
// let username = registerUserName.value;
// let email = registerUserEmail.value;
// let password = registerUserPassword;
// let mobile = registerUserMobile;

// let userObject = {
//   username : username,
//   password : password,
//   email : email,
//   mobile : mobile,
//   avatar : "avatar"
// }
// try{
//   let res = await 
//   fetch(`https://wild-tan-gharial-ring.cyclic.app/users`,{
//     method:'POST',
//     headers:{
//       "Content-Type":"application/json"
//     },
//     body:JSON.stringify(userObject)
//   })
//   // .then( res=>res.json())
//   // .then(data=>alert(JSON.stringify(data)))
//   // .catch(err=>alert("error"))
//   let data = res.json();
//   alert(JSON.stringify(data))
  
// }catch(err){
// console.log("error")
// }
// })

