
let untMap = {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .10,
    "QUARTER": .25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  };
  
 // getting the total in the drawer
  let total = function(cid){
    let all = 0;
    for(const drawer of cid){
       all += drawer[1];
    }
    return all.toFixed(2);
  } 
  

   // getting total lower bills for insufficient funds
   function billTotal(cid , changeNeeded){
     let totalIn = 0;
     
     for(const drawer of cid){
       let billName = drawer[0];
       let amount = drawer[1];
       let billWorth = untMap[billName];
       if(amount > 0 && billWorth <= changeNeeded){
         totalIn += drawer[1];
         
       }
     }
     return totalIn;
   }

//getting status
function getStatus(changeNeeded,total ,drawer){
  let totalBills = billTotal(drawer,changeNeeded);
  
  //testing
  console.log('total money',total)
  console.log("TOTAl LOWER BILLS : ",totalBills)

   if(changeNeeded < total && totalBills >= changeNeeded){
    return {status:"OPEN", change: []}
  } else if(changeNeeded == total){return {status:"CLOSED",change:[...drawer]}}
  if(changeNeeded > total){
    return {status:"INSUFFICIENT_FUNDS",change:[]}
  }else if(totalBills < changeNeeded && changeNeeded != total ){
    return {status:"INSUFFICIENT_FUNDS",change:[]}
  }
  
}

// initail code
function checkCashRegister(price, cash, cid) {
  let change = {status:"",change:[]};
  let accum = [];
  let totalIn = total(cid);
  let changeToReturn = cash - price;
  console.log("change needed:" ,changeToReturn);
  console.log("CHECKING status",getStatus(changeToReturn,totalIn,cid));
  change = getStatus(changeToReturn,totalIn,cid);
  // checking status 
  if(change.status == "INSUFFICIENT_FUNDS"){
    change.change = [];
    return change;
  }else if(change.status == "CLOSED"){
    change.change = [...cid];
    return change;
  }
  else if(change.status == "OPEN"){
  //looping thru drawer to count change back
  cid.reverse();
  for(const drawer of cid){
    let billName;
    let billAmount ;
    let billWorth ;
    let toReturn = [];
    let counter = 0;
    let billsIn;
    if(drawer[1] > 0){
      billName = drawer[0];
      billAmount = drawer[1];
      billWorth = untMap[billName];
      billsIn =  billAmount / billWorth;
      //testing
      console.log(`BILlS INSIDE  ${billName} DRAWER`,billsIn); 
      //testing
      // console.log(`this is DRAWER ${billName} `,drawer);
    }
      while(changeToReturn > 0 && billWorth <= changeToReturn && billsIn > 0){
        toReturn = [billName];
        counter += billWorth;
        --billsIn;
        counter.toFixed(2);
        billAmount -= billWorth;
        billAmount.toFixed(2);
        changeToReturn = changeToReturn.toFixed(2) - billWorth;
        changeToReturn.toFixed(2);
        //testing
        console.log(`CHANGE BACK ${changeToReturn}, drawer ${billName}`);
        
      }
      if(counter > 0){
      counter.toFixed(2);
      toReturn.push(counter);
      //testing
        console.log("this is RETURN",toReturn)
        accum = toReturn;
        //testing
        console.log("this is accumulator",accum)
      change.change.push(accum);
      //testing 
      // console.log(accum)
      }
  }}
   //testing 
  console.log("CHECKING change",change);

  // change.change[1] = accum;
  return change;
   
  }
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
