getProducts();
let data;
async function getProducts(){
    try{
        let actual_data = await getApartmentsList();
        data = actual_data;
        displayProducts(actual_data);
    }
    catch(err){
        console.log("err:",err)
    }
}

let selectprice = document.getElementById("sort");

selectprice.addEventListener("change",sortbyPrice);
        
        function sortbyPrice(){
            let selectprice1 = document.getElementById("sort");
            console.log(selectprice1.value)
            if(selectprice1.value=="hl"){
              data.sort(function(a,b){
              return b.price-a.price;
            });
            displayProducts(data);
          } else if(selectprice.value=="lh"){
            data.sort(function(a,b){
              return a.price-b.price;
            });
            displayProducts(data);
          }
        };

function displayProducts(res){
    let cards =  document.querySelector("#cards")
     
    cards.innerHTML = "";
   
    res.forEach(function(el){
        cards.append(createListingProductCard(el));
    });
    
        
}

function search() {
  let input = document.getElementById("searchField").value;
  let newdata = data.filter(function (elem) {
      return elem.title.toLowerCase().includes(input.toLowerCase())
  })
  displayProducts(newdata)
}
