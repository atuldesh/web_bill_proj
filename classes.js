class BillItem{
    item;
    qty;
    rate;
     constructor(item,qty,rate){
        this.item = item;
        this.qty = qty;
        this.rate = rate; 
    }
    amount() { 
        return this.qty * this.rate;
    }
};
class Bill{
    bdate;
    ttype;
    cname;
    billItems = [];
    constructor(bdate,billno,ttype,cname){
        this.bdate = bdate;
        this.billno = billno;
        this.ttype = ttype;
        this.cname = cname;
    };
    billAmount() {
        let tot=0;
        for(i=0;i<this.billItems.length;i++){
            tot = tot + this.billItems[i].amount();
        }
        return tot;
    }
};