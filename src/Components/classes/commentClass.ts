// local storage check items
// fix double ids -> when refresh page
let idCounter = 0;
if (localStorage.getItem("comments")) {
     let arr = JSON.parse(String(localStorage.getItem("comments")))
     idCounter = arr.length
}
//_________________________________________________________________
export type commentStatus = "active" | "suspended"
export class CommentClass {

     static idCounter: number = idCounter;

     public id = ++CommentClass.idCounter;

     constructor(
          public title: string,
          public content: string,
          public status:commentStatus,
          public timeOfCreation: string,
          public timeOfModification: string,

     ) { }

     toString = () => {
          console.log(`id:${this.id}, title:${this.title}, content:${this.content}`);

     }
}




