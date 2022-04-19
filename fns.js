inputst = '<input type="text" onkeydown="chkKey(this,event)" onblur="putVal(this)" id="num" />';

function $(id) {return document.getElementById(id);}
function putVal(ibox){
    try {
      r = ibox.parentElement.parentElement.rowIndex;
      c = ibox.parentElement.cellIndex;  
      props = Object.getOwnPropertyNames(students[0]);
//      console.log(props);
      if(c<2){  
        students[r-2][props[c]] = ibox.value;
      } else {
        students[r-2][props[c]].obtMarks = ibox.value;
      }
      ibox.parentElement.innerHTML = ibox.value;
    t.rows[r].cells[6].innerHTML=students[r-2]['total'];
    t.rows[r].cells[7].innerHTML=students[r-2]['result'];
    t.rows[r].cells[8].innerHTML=students[r-2]['percentage'];
    t.rows[r].cells[9].innerHTML=students[r-2]['grade'];
    } catch(e){console.log("err:"+e)};
    
}

function addRow(item){
 let r= t.insertRow();
 props = Object.getOwnPropertyNames(item);
 for(i=0;i<props.length;i++){
     c = r.insertCell();
     if(i>1) {c.innerHTML = item[props[i]].obtMarks;}
     else { c.innerHTML = item[props[i]]; }
     if(i<6){
         addEvent(c);
     }
    }
    {let c=r.insertCell();c.innerHTML=item['total'];}
    {let c=r.insertCell();c.innerHTML=item['result'];}
    {let c= r.insertCell();c.innerHTML=item['percentage'];}
    {let c= r.insertCell();c.innerHTML=item['grade'];}
    {let c= r.insertCell();
     c.innerHTML = "<input type='button' class='delBtn' value='X' onclick='delRow(this)'/>"; 
    }
}

function delRow(btn){
    r = btn.parentElement.parentElement.rowIndex;
    t.deleteRow(r);
    names.splice(r-2,1);
    console.log(names);
}

function mkEditable(col){
    vs = col.offsetWidth + "px";
    n = col.innerHTML
    col.innerHTML = inputst;
    $('num').style.width=vs;
    $('num').value=n;
    $('num').focus();
}
function chkKey(ibox,e){
    let cno= ibox.parentElement.cellIndex;
    let rno = ibox.parentElement.parentElement.rowIndex;
    if(e.key=='Enter'){
        putVal(ibox);
//        console.log(rno+","+cno+","+arrsubs.length);
        if(cno<=arrsubs.length){
            col = t.rows[rno].cells[cno+1];
        } else if(rno<students.length+1){
            col = t.rows[rno+1].cells[0];
        }
        console.log("new col :"+col.cellIndex);
        mkEditable(col);
        e.preventDefault();
    }else if(e.key=='Escape'){
        putVal(ibox);
        if(cno>0){
            col= t.rows[rno].cells[cno-1];
        } else if(rno>2){
            col = t.rows[rno-1].cells[arrsubs.length];
        }
        mkEditable(col);
        e.preventDefault();

    }

}
function addEvent(col) {
col.addEventListener("click",function(){mkEditable(col);});
}
function addName(item) {
r= t.insertRow();
c = r.insertCell();
addEvent(c);
c.innerHTML = item;
subs.forEach(function () {
   c=r.insertCell();
   addEvent(c);
});
r.insertCell();r.insertCell();r.insertCell();r.insertCell();
c= r.insertCell();
c.innerHTML = "<input type='button' class='delBtn' value='X' onclick='delRow(this)'/>"; 

}
