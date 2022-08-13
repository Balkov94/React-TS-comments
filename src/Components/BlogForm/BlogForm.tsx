import { debug } from "console";
import { useRef, useState } from "react";
import { json } from "stream/consumers";
import { IComment } from "../Comment/Comment";
import CommentsWrapper, { IallComments } from "../CommentsWrapper/CommentsWrapper";
import { CommentClass } from "../interfaces/classesAndInterfaces";
import styles from "./BlogForm.module.css";


// Local storage initial data ______________________________________________________
let c1 = new CommentClass("first", "first content", "active", "01.01.2001", "02.02.2022")
let c2 = new CommentClass("second", "second content", "active", "22.22.2002", "22.22.2022")
let c3 = new CommentClass("third", "third content", "active", "03.03.2003", "02.02.2022")
let commentsData = [
     c1, c2, c3
]
if (!localStorage.getItem("comments")) {
     localStorage.setItem("comments", JSON.stringify(commentsData));
}
else {
     commentsData = JSON.parse(String(localStorage.getItem("comments")));
}
//____________________________________________________________________________________

function BlogForm() {
     const [comments, setComments] = useState(commentsData);
     const [title, setTitle] = useState("");
     const [content, setContent] = useState("");

     //  use ref to windwo.scrollTo()
     // const ref = useRef(null);

     // get data from l ocal storage

     const handleTitle = (event: any) => {
          setTitle(event.target.value);
     }
     const handleContent = (event: any) => {
          setContent(event.target.value);
     }

     const handleEditorAddComments = (event: any) => {
          event.preventDefault();
          // check new comment or editComment_______________________
          const editComment: IComment = JSON.parse(String(localStorage.getItem("editComment")));
          if (editComment) {
               const [date, time] = [new Date().toLocaleTimeString(), new Date().toDateString()];
               const timeOfModification = `Edited on: ${date} ${time}`;
               const updatedComment = { ...editComment, title, content, timeOfModification };
               localStorage.removeItem("editComment")

               // update local storage data
               const oldLocalStorage = JSON.parse(String(localStorage.getItem("comments")));
               oldLocalStorage.unshift(updatedComment);
               localStorage.setItem("comments", JSON.stringify(oldLocalStorage));
               //update comments state
               setComments([updatedComment, ...comments]);

          }
          else {
               const [date, time] = [new Date().toLocaleTimeString(), new Date().toDateString()];
               const timeOfCreation = `Created on: ${date} ${time}`;
               const newComment = new CommentClass(title, content, "active", timeOfCreation, timeOfCreation);
               // update local storage data
               const oldLocalStorage = JSON.parse(String(localStorage.getItem("comments")));
               oldLocalStorage.unshift(newComment);
               localStorage.setItem("comments", JSON.stringify(oldLocalStorage));
               //update comments state
               setComments([newComment, ...comments]);
          }
          setTitle("");
          setContent("");
     }

     const editComment = (target?: number): void => {
          const editedComment: IComment = JSON.parse(String(localStorage.getItem("comments")))
               .find((c: IComment) => c.id === target)

          console.log(editedComment); //entire old obj
          // delete OLD edited comment
          const oldLocalStorage = JSON.parse(String(localStorage.getItem("comments")));
          const updatedLocalStorage = oldLocalStorage.filter((c: IComment) => c.id !== target)
          localStorage.setItem("comments", JSON.stringify(updatedLocalStorage));
          setComments(comments => comments.filter(c => c.id !== target))

          // ***** save edit commen in localStorage to reuse form
          localStorage.setItem("editComment", (JSON.stringify(editedComment)));
          setTitle(editedComment.title);
          setContent(editedComment.content);

     }

     const deleteComment = (target?: number): void => {
          const oldLocalStorage = JSON.parse(String(localStorage.getItem("comments")));
          const updatedLocalStorage = oldLocalStorage.filter((c: IComment) => c.id !== target)
          localStorage.setItem("comments", JSON.stringify(updatedLocalStorage));
          setComments(comments => comments.filter(c => c.id !== target))
     }

     const changeCommentStatus = (target?: number): void => {
          const oldLocalStorage = JSON.parse(String(localStorage.getItem("comments")));
          const commentIndex = oldLocalStorage.findIndex((comment: IComment) => comment.id === target)
          const comment: IComment = oldLocalStorage.find((c: IComment) => c.id === target)
          const updatedLocalStorage = oldLocalStorage.filter((c: IComment) => c.id !== target)
          comment.status = ((comment.status === "active") ? "suspended" : "active");
          updatedLocalStorage.splice(commentIndex,0, comment);
          localStorage.setItem("comments", JSON.stringify(updatedLocalStorage));

          setComments(updatedLocalStorage)

          // (* NOT WORKING) This doesn't work on first rendering ???
          // setComments(comments => comments.map(c => {
          //      // debugger;
          //      if (c.id === target) {
          //           c.status = ((c.status === "active") ? "suspended" : "active");
          //      }
          //      return c;
          // }))

     }

     return (
          <>
               <div className={styles.formWrapper}>
                    <form className={styles.form}>
                         <label htmlFor="title">Title</label>
                         <input value={title} onChange={handleTitle}
                              type="text" name="title" id="title"  maxLength={80}/>

                         <label htmlFor="content">Content</label>
                         <textarea value={content} onChange={handleContent}
                              name="content" id="content" cols={30} rows={5}  maxLength={512}></textarea>
                         <button onClick={handleEditorAddComments}>Save</button>
                    </form>
               </div>

               <CommentsWrapper
                    data={comments}
                    parentDeleteFunction={deleteComment}
                    parentEditFunction={editComment}
                    parentChangeCommentStatus={changeCommentStatus}
               ></CommentsWrapper>

          </>

     );
}

export default BlogForm;