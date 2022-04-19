let names = ['Ram','sham','ramesh','geeta'];
let titleLine = ['Lang','Maths','Science','So.Sc.', 'Total', '%age', 'Result','Grade'];

class Subject {
    sname;
    mmarks;
    pmarks;
    obtMarks;
    constructor(sname,mmarks,pmarks,obtMarks=0){
        this.sname=sname;this.mmarks=mmarks;this.pmarks=pmarks;this.obtMarks=obtMarks;
    }
    passed() { 
        return this.obtMarks>=this.pmarks;
    }
}

class Student {
    rollno;sname;
    lang;maths;sc;soSc;
    constructor(rollno,sname){
        this.rollno = rollno;
        this.sname = sname;
        this.lang = new Subject("Language",100,35);
        this.maths = new Subject("Maths",100,40);
        this.sc = new Subject("Science",100,40);
        this.soSc = new Subject("So.Sc.",100,35);
            }
    passed() {
        return this.lang.passed() && this.maths.passed() && this.sc.passed() && this.soSc.passed();
    }
    get result() {
        if (this.passed()) return "Pass"; else return "Fail";
    }
    get total() { 
        return this.lang.obtMarks + this.maths.obtMarks + this.sc.obtMarks + this.soSc.obtMarks;
    }
    get percentage() {
        return this.total/4;
    }
    get grade() {
        let p=this.percentage;
        if(!this.passed()) 
            return "F";
        else if(p<50)
            return "C";
        else if(p<60)
            return "B";
        else if(p<75)
            return "A";
        else 
            return "A+";
    }
}

let students = [];
names.forEach(function (nam,index) {students.push(new Student(index+101,nam));});

function $(id){
    return document.getElementById(id);
}

function mkEditable(col,n){
    let element = col.children[1];
    let data = element.innerHTML;
    let capt = col.children[0].innerHTML;
    col.style.padding="2px";

    let vs = col.offsetWidth-20 + "px";
    let vh = col.offsetHeight-10 + "px";
     if(n==1){
        let inputtxt = '<input type="text" onkeydown="chkKey(this,event)" onblur="pmkNonEditable(this,'+n+')" id="ibox" placeholder="'+capt+'"/>';
        col.innerHTML = inputtxt;
    } else {
        let inputnum = '<input type="Number" onkeydown="chkKey(this,event)" onblur="mkNonEditable(this,'+n+')" id="ibox"  placeholder="'+capt+'" />';
        col.innerHTML = inputnum;
    }
    $('ibox').style.height=vh;
    $('ibox').style.width=vs;
    $('ibox').value = data;
    $('ibox').focus();
}
function mkNonEditable(col,n) {
    
    if(n<2) {
        v = stud[item];
        t = item;

   } else {
       v = stud[item].obtMarks;
       t = stud[item].sname;
   }

}
function setCol(col,n){

}
function addNewRow(stud){
    let d = $('t-dtlArea');
    r = document.createElement('div');
    r.classList.add('t-dtlRow');

    props = Object.getOwnPropertyNames(stud);
    props.forEach(function (item,n) {
        let col = document.createElement('div');
        col.classList.add('a'+(n+1));
        let v;
        let t;
        if(n<2) {
             v = stud[item];
             t = item;

        } else {
            v = stud[item].obtMarks;
            t = stud[item].sname;
        }
        col.innerHTML = "<span class='title'>"+t+":</span><span class='data'>" + v + "</span> ";
       col.addEventListener('click',function(){mkEditable(col,n)});
        r.appendChild(col);
    
    });

     col = document.createElement('div');
     col.classList.add('a7');
     col.innerHTML = "<span class='title'>Total:</span><span class='data'>" + stud.total+ "</span> ";
    r.appendChild(col);

    col = document.createElement('div');
    col.classList.add('a8');
    col.innerHTML = "<span class='title'>%age:</span><span class='data'>" + stud.percentage+ "</span> ";
    r.appendChild(col);

    col = document.createElement('div');
    col.classList.add('a9');
    col.innerHTML = "<span class='title'>Result:</span><span class='data'>" + stud.result+ "</span> ";
    r.appendChild(col);

    col = document.createElement('div');
    col.classList.add('a10');

    col.innerHTML = "<span class='title'>Grade:</span><span class='data'>" + stud.grade+ "</span> ";
    r.appendChild(col);

    col = document.createElement('div');
    col.classList.add('a11');

    col.innerHTML = "<input type='button' value ='X' onclick='delRow(this)'/>";
    r.appendChild(col);

    d.appendChild(r);
}