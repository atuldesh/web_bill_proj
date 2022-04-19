let names = ['Ram','sham','ramesh','geeta'];
let arrsubs = ['Lang','Maths','Science','So.Sc.'];

class Subject {
    sname;
    mmarks;
    pmarks;
    #marks;
    constructor(sname,mmarks,pmarks,marks=0){
        this.sname=sname;this.mmarks=mmarks;this.pmarks=pmarks;this.#marks=marks;
    }
    set obtMarks(m) {
      let temp= isNaN(m)?0:parseInt(m);
      if(temp<0 || temp>this.mmarks) return;
    this.#marks = temp;
     }
    get obtMarks() {
        return this.#marks;
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
names.forEach(function (item,index) {
   let stud = new Student(index+101,item);
   students.push(stud);
});
console.log(students);
