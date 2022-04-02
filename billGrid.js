let nrows=1;
let brows = [1];
let itemsList = ['Shirt','Trouser','T-Shirt','Jeans','Short','Lower','Kurta','Saree','Upper','Frock','Short Kurta','Jacket'];
let l=itemsList.length;
   let optlist="";
    for(i=0;i<l;i++){
        optlist= optlist + '<option value="'+itemsList[i] + '">';
    }
   let iw1=(document.getElementById('c1').offsetWidth-18) +"px";
   let iw2=(document.getElementById('c2').offsetWidth-8) +"px";
    let ih1=(document.getElementById('c1').offsetHeight-8) +"px";
//       alert(iw1+','+iw2)
    let itemInput='<input placeholder="Select Item" list = "items" style="width:'+iw1+';height:'+ih1+';" id="item" onkeydown="chkKey(this,event)" onblur="mkNonEditable(this)" ><datalist id="items">'+optlist+' </datalist>';
  let qtyInput = '<input placeholder="Quantity" type="number" style="width:'+iw2+';height:'+ih1+';" id="qty" onkeydown="chkKey(this,event)" onblur="mkNonEditable(this)" style="border-style: none;"/>';
  let  rateInput = '<input type="number" placeholder="Rate" style="width:'+iw2+';height:'+ih1+';" id="rate" onkeydown="chkKey(this,event)" onblur="mkNonEditable(this)"/>';

 // window.addEventListener("resize", displayWindowSize);

function chcolor(c,n){
    if(n==0) {
        c.style.backgroundColor = "#FFAAFF";
    } else {
        c.style.backgroundColor = 'rgb(124, 172, 236)';
    } 
}
function chk(tbox,e){
    
    if (e.keyCode==32) {
//            e.keyCode=0;
        if(tbox.value=="Cash"){
        tbox.value="Credit";
        tbox.classList.add("credit-color");
        tbox.classList.remove("cash-color");

        } else { tbox.value="Cash";
        tbox.classList.add("cash-color");
        tbox.classList.remove("credit-color");

    }
    }
    e.preventDefault();

}
function mkEditable(c)
{
   let cno = parseInt((c.id).slice(1));
   let n = (cno-1) % 4 +1;
    let v=c.innerHTML;

    let  i ;
    if(n==1){
        c.innerHTML=itemInput;
        i = document.getElementById("item");

    } else if(n==2){
        c.innerHTML=qtyInput;
        i = document.getElementById("qty");
        
    } else if(n==3) {
        c.innerHTML=rateInput;
        i = document.getElementById("rate");

    }
    i.value=v;
    i.focus();

}
function mkNonEditable(tbox){
    if(tbox == 'undefined') return;
    try {
    let temp = tbox.value
    let c = tbox.parentElement;
    c.innerHTML=temp;
    let cno = parseInt((c.id).slice(1));
    let rno = Math.trunc((cno-1)/4);
    amt = parseFloat(document.getElementById("c"+(rno*4+2)).innerHTML)*parseFloat(document.getElementById("c"+(rno*4+3)).innerHTML);
    document.getElementById("c"+(rno*4+4)).innerHTML = (isNaN(amt)==true)?'':amt.toFixed(2);
}
    catch(e){}

}
function chkKey(tbox,e) {
//            alert(e.key)
    let c=tbox.parentElement;
    let cno = parseInt((c.id).slice(1));
    let rno = Math.trunc((cno-1)/4)+1;
    nrows = brows[brows.length-1];
    let nc;
    if(e.key=='Enter' || e.key=='Tab'){
        if(tbox.id=='item'){
          nc = document.getElementById('c'+(cno+1)) 
          mkEditable(nc);
        } else if(tbox.id=='qty'){
            nc = document.getElementById('c'+(cno+1)) 
            mkEditable(nc);
        }else if(tbox.id=='rate'){
            mkNonEditable(tbox);
            if(rno==nrows){
                   addRow();
               }
            cno = getNextRowCol(cno);   
//alert(cno)
            nc = document.getElementById('c'+(cno));
            mkEditable(nc);
        }
        e.preventDefault();// mkNonEditable(tbox);
    } else if(e.key=='ArrowDown'){
        mkNonEditable(tbox);
     if(rno==nrows){
            addRow();
        }
        cno=getNextRowCol(cno);
        let nc=document.getElementById('c'+(cno));                
        mkEditable(nc);
    } else if(e.key=='ArrowUp'){
        if(rno==1) return;
        cno=getPrevRowCol(cno);
        nc=document.getElementById('c'+(cno));
        console.log("up:"+cno);
        mkEditable(nc);e.preventDefault();
    } else if(e.key=='Escape'){
        if(cno==1) return;
        if(cno%4==1){
            cno=getPrevRowCol(cno);
//   alert(cno);
        } else {cno = cno-1;}
        nc=document.getElementById('c'+(cno));
        mkEditable(nc);e.preventDefault();

    }
    
}
function getNextRowCol(n) {
    let r = Math.trunc(n/4)+1;
//            alert("r="+r)
    for(i=0;i<brows.length-1;i++){
        if(brows[i]==r){
//                    alert(r + "," + brows[i])
           let cno = (brows[i+1]-1)*4+(n%4==3?1:n%4);
           console.log("cno:"+cno);
           let nc=document.getElementById('c'+(cno));
            if(!(nc)){
                addRow();
                let rno = brows[brows.length-1];
                cno = (rno-1)*4+cno%4;
                console.log("cno1:"+cno);
                return cno;
            } else {return cno;}
                
        }
    }
    return n%4;
}
function getPrevRowCol(n) {
    let r = Math.trunc(n/4)+1;
    for(i=1;i<brows.length;i++){
        if(brows[i]==r){
            let cno = (brows[i-1]-1)*4+n%4;
            console.log("cno~:"+cno);
            return cno;
        }
    }
    console.log("n:"+n%4);
    return n%4;            
}
function delRow(rno){
//            alert(rno)
    if(rno==1){
        document.getElementById('c1').innerHTML='';
        document.getElementById('c2').innerHTML='';
        document.getElementById('c3').innerHTML='';
        document.getElementById('c4').innerHTML='';
    } else {
        if(document.getElementById('c'+((rno-1)*4+1))){
            (document.getElementById('d'+(rno))).remove();
            rno=rno-1;
        console.log("del"+rno);
            (document.getElementById('c'+(rno*4+1))).remove();
            (document.getElementById('c'+(rno*4+2))).remove();
            (document.getElementById('c'+(rno*4+3))).remove();
            (document.getElementById('c'+(rno*4+4))).remove();
            (document.getElementById('card'+(rno+1))).remove();

        }
        for(i=1;i<brows.length;i++){
            if(brows[i]==rno+1){
                brows.splice(i,1);break;
            }
        }

    }
}
function addRow(){
    let rno = brows[brows.length-1];
    console.log("rno:"+rno);
    let id1="c"+((rno*4)+1);               
    let id2="c"+((rno*4)+2);
    let id3="c"+((rno*4)+3);
    let id4="c"+((rno*4)+4);

    let cid = "card" + (rno+1);
    let cdiv = document.createElement('div');
    cdiv.id = cid;
    cdiv.classList.add('rowCard');

    let ncol=document.createElement('div');
    ncol.classList.add('item');ncol.id=id1;
    ncol.addEventListener('mouseover',function(){chcolor(ncol,0)});
    ncol.addEventListener('mouseout',function(){chcolor(ncol,1)});
    ncol.addEventListener('click',function(){mkEditable(ncol)});
 //   ncol.innerHTML="Item"
    cdiv.appendChild(ncol);
    let ncol1=document.createElement('div');
    ncol1.classList.add('qty');ncol1.id=id2;
    ncol1.addEventListener('mouseover',function(){chcolor(ncol1,0)});
    ncol1.addEventListener('mouseout',function(){chcolor(ncol1,1)});
    ncol1.addEventListener('click',function(){mkEditable(ncol1)});
 //   ncol1.innerHTML="Quantity";
    cdiv.appendChild(ncol1);
    let ncol2=document.createElement('div');
    ncol2.classList.add('rate');ncol2.id=id3;
    ncol2.addEventListener('mouseover',function(){chcolor(ncol2,0)});
    ncol2.addEventListener('mouseout',function(){chcolor(ncol2,1)});
    ncol2.addEventListener('click',function(){mkEditable(ncol2)});
 //   ncol2.innerHTML = "Rate";
    cdiv.appendChild(ncol2);
    let ncol3=document.createElement('div');
    ncol3.id=id4;ncol3.classList.add('amount');
    ncol3.innerHTML='Amount';
    cdiv.appendChild(ncol3);

    let id5="d"+(rno+1);
    brows.push(rno+1);
    let ncol4=document.createElement('div');
    ncol4.id=id5;ncol4.classList.add('del');
    ncol4.innerHTML="X";
    let delButton = '<input id="b'+(rno+1)+'" class="delBtn" type="button" value ="X" onclick="delRow('+(rno+1)+')"/>';

    ncol4.innerHTML=delButton;
    cdiv.appendChild(ncol4);
    let g =document.getElementById('dgrid');
    g.appendChild(cdiv);
    }
