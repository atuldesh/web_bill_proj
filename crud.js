bills = [];
isNewBill=true;
let $ = function( id ) { return document.getElementById( id ); };
function saveBill(){
    console.log($("bDate").value);return;
    let vbill = new Bill($("bDate").value,$("billNo").value,$("ttype").value,$("cName").value);


}