let title = document.querySelector(".title");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let price = document.querySelector(".price");
let discount = document.querySelector(".discount");
let small = document.querySelector(".small")
let count = document.querySelector(".count")
let category = document.querySelector(".category")
let tbody = document.getElementById('tbody')
let btncreate = document.querySelector(".btn-create")

//temp produt object


let tempid;

let modebutton='create';
let total;


function gettotal()
{

    if(price.value !=''){
        total = (Number(taxes.value)+ Number(ads.value)+ +price.value) - +discount.value
    
        small.innerHTML=`${total}`
        small.classList.add('total')
    }else{
        small.style.background = 'red'
        small.innerHTML = ''
    }

}



if(localStorage.getItem('products')){
    dataproducts = JSON.parse(localStorage.getItem('products'))
}else{
    dataproducts=[]
}

// console.log(dataproducts)

// create product
btncreate.addEventListener('click',function(e){
    e.preventDefault();
    let product = {
        id:Date.now(),
        title:title.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total,
        price:price.value,
        count:count.value,
        category:category.value,
    }

    

    if(title.value !='' && category.value !='' && price.value !=''){
        
    
    if(modebutton === 'create'){
        
        if(product.count > 1){
            for (let i = 0; i < product.count; i++) {
                
                dataproducts.push(product)
            }
        }else{
            dataproducts.push(product)
        }
    

        }
        else{
            let lol = dataproducts.find((item)=> item.id === tempid)
            console.log(lol)
            // lol = product;
            lol.title = product.title;
            lol.price = product.price;
            lol.ads = product.ads;
            lol.taxes = product.taxes;
            lol.discount = product.discount;
            lol.category = product.category;
            
            lol.total = product.total;
            
            console.log(product)
        }

        

        clearinputs()
    
    }

    addtolocalstorage()

    drawproduct()
    
})

function addtolocalstorage(){
    localStorage.setItem('products',JSON.stringify(dataproducts))
}

function drawproduct(){
    
    tbody.innerHTML=''
    
    dataproducts.forEach((product,index)=>{
        let pro = `
        <tr>
        <td>${index+=1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick='updateproduct(${product.id})' class="update">update</button></td>
        <td><button onclick='deleteitem(${product.id})' class="delete">delete</button></td>
    </tr>
        `
        tbody.innerHTML +=pro;
    })
    
            // button for delete all
        let deletediv = document.querySelector('.deleteall')

        if(dataproducts.length > 0){
            deletediv.innerHTML=`
            <button class='deleteallbtn' onclick='deleltalldata()'>delete all ${dataproducts.length}</button>
            `

            // console.log(deleteall)
        }else{
            deletediv.innerHTML=''
        }
        
}
// fuction deleltalldata
function deleltalldata(){
    localStorage.clear()
    dataproducts.splice(0)
    drawproduct()
}

drawproduct()
// functtion clear 
function clearinputs(){
    title.value='';
    price.value='';
    ads.value='';
    taxes.value='';
    discount.value='';
    category.value='';
    count.value='';
}
// fuction delete
function deleteitem(id){
    
    dataproducts = dataproducts.filter((item)=> item.id !== id)
    small.style.background = 'red'
        small.innerHTML = ''
    addtolocalstorage()
    drawproduct()
}





function updateproduct(id){
    prodcut = dataproducts.find((item)=> item.id === id)
    
    // console.log(prodcut)
    title.value=prodcut.title;
    price.value=prodcut.price;
    ads.value=prodcut.ads;
    taxes.value=prodcut.taxes;
    discount.value=prodcut.discount;
    category.value=prodcut.category;

    modebutton='update';
    btncreate.innerHTML='update'
    tempid = id;
    count.style.display = "none";

    gettotal()
}


let searchtitlebtn = document.querySelector(".searchtitle-btn");
let searchvalue = document.querySelector(".search")

searchtitlebtn.addEventListener("click",function(e){
    e.preventDefault()
    searchvalue.placeholder ="search by title"
    dataproducts = dataproducts.filter((item)=> item.title.includes( searchvalue.value.toLowerCase()))
    drawproduct()

})





let searchcategorybtn = document.querySelector(".category-btn");

searchcategorybtn.addEventListener("click",function(e){
    e.preventDefault()
    searchvalue.placeholder ="search by category"
    dataproducts = dataproducts.filter((item)=> item.category.includes( searchvalue.value.toLowerCase()))
    drawproduct()

})



