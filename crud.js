const bills = [];
isNewBill=true;
let $ = function( id ) { return document.getElementById( id ); };
function saveBill(){
 //   console.log($("bDate").value);return;
    let vbill = new Bill($("bDate").value,$("billNo").value,$("ttype").value,$("cName").value);
    for(i=0;i<brows.length;i++){
        let r = brows[i]-1;
        let vamt = parseFloat($("c"+(r*4+4)).innerHTML);
        if (isNaN(vamt) ) vamt =0;
        console.log('vamt:'+vamt);
        if(vamt!=0){
            let vitem = $("c"+(r*4+1)).innerHTML;
            let vqty = parseFloat($("c"+(r*4+2)).innerHTML);
            let vrate = parseFloat($("c"+(r*4+3)).innerHTML);
            let vbillitem = new BillItem(vitem,vqty,vrate);
            console.log(vbillitem);
            vbill.billItems.push(vbillitem);
        }
    } 
    bills.push(vbill);
    console.log(bills);
}