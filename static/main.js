var percentage
var uploadPercent=document.querySelector('.percentage')
var select=document.querySelector('.select')
const photos=document.querySelector("#photo")

const firebaseConfig = {
    apiKey: "AIzaSyBDzrMJ7Kr5mgkTcApyxdLSzCPf8mcILCs",
    authDomain: "neural-style-transfer-86b78.firebaseapp.com",
    projectId: "neural-style-transfer-86b78",
    storageBucket: "neural-style-transfer-86b78.appspot.com",
    messagingSenderId: "291163793715",
    appId: "1:291163793715:web:d73d85088038bd11e23646",
    measurementId: "G-0P3JC0VGTC"
};

var k=0
function selectImg(){
    k+=1
    if(photos.files.length>0){
        select.innerHTML='File selected'
    }
}

firebase.initializeApp(firebaseConfig);

var j=0;
function uploadImage() {
    j+=1
    select.innerHTML=''
    if(j>=4){
        uploadPercent.innerHTML="Max upload limit reached"
        return 0
    }
    if(photos.files.length==0){
        j=0
        select.innerHTML='No file selected'
    }
    const ref = firebase.storage().ref();
    const file = photos.files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
    contentType: file.type
};
const task = ref.child(name).put(file, metadata);

task.on('state_changed',(snapshot)=>{
    percentage=Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)
    uploadPercent.innerHTML="Uploading:"+percentage+"%"
})

task
.then(snapshot => 
    snapshot.ref.getDownloadURL())
.then(url => {
alert('image uploaded successfully');
document.querySelector("#image").src = url;
})
.catch(console.error);
}
const errorMsgElement = document.querySelector('span#errorMsg');

const img=document.createElement('img')


$('#List').find('tbody').html('')
var i=0
function getfromeFirebase(){
    let storageref=firebase.storage().ref()

    storageref.listAll()
    .then((res)=>{
        res.items.forEach((imageRef) => {
            imageRef.getDownloadURL().then(function(url){
                i++
                renderImg(i,url)
            });
          });
        })
    .catch(function (error) {
        console.log(error);
    });
    
}


function renderImg(i,url){
    var image = new Image();
    image.src = url;
    const img=document.getElementById('gallery_container').appendChild(image)
    img.style.width='6%'
    img.style.padding='0.5%'

    if(i==16){
        i=0
        var next=document.createElement('br')
        document.getElementById('gallery_container').appendChild(next)
    }

}
getfromeFirebase()


