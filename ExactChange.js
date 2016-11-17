function checkCashRegister(price, cash, cid) {

  var changeDue = cash - price; //Total amount of change due

  var drawerTotal = cid.reduce(function (first, second, index, array) { //Total amount in the drawer
    return first + second[1];
  }, 0.0);

  if(drawerTotal == changeDue) {
    return "Closed";
  } else if (drawerTotal < changeDue) {
    return "Insufficient Funds";
  }

  var values = [
    ["PENNY",         0.01],
    ["NICKEL",        0.05],
    ["DIME",          0.10],
    ["QUARTER",       0.25],
    ["ONE",           1.00],
    ["FIVE",          5.00],
    ["TEN",          10.00],
    ["TWENTY",       20.00],
    ["ONE HUNDRED", 100.00]
  ];

  var change = cid.reduceRight(function(prev, current, index, array) {  //Starting with the largest bills in the drawer, for each denomination of money,
    var changeTotal = 0.0;
      if (changeDue >= values[index][1]) { //If we owe more than the value of the current money type (starting with the largest),
        while (changeDue > 0 && current[1] > 0 && changeDue >= values[index][1]) { //Keep doing these things while we still owe money, and there is still money of this type in the drawer, and we owe more than or the same amount as the value of the current money we are working with.

          changeTotal += values[index][1]; //Add one unit of this money type to our change
          changeTotal = Math.round(changeTotal * 1000) / 1000;


          changeDue -= values[index][1]; //Reduce the amount we owe by the value of one unit of this money type
          changeDue = Math.round(changeDue * 1000) / 1000;


          current[1] -= values[index][1]; //Remove one unit of this money type from our drawer
          current[1] = Math.round(current[1] * 1000) / 1000;

        }//while 
      }//if


    if (changeTotal > 0.0) { //If we used any of this denomination of money
      prev.push([current[0], changeTotal]); //Add an entry to our change array
    }
    return prev; //Return our change array so that we start with it on our next loop through

  }, []);//var change 

  if (changeDue === 0) { //If we had exact change
    return change; //That's great
  } else { //If not
    return "Insufficient Funds"; //Tough luck
  }

}                                 



checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);