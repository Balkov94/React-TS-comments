import React, { useState, } from "react";
import { IComment } from "../Comment/Comment";
import CommentsWrapper from "../CommentsWrapper/CommentsWrapper";
import { CommentClass } from "../classes/commentClass";
import styles from "./MainForm.module.css";

// Local storage initial data ______________________________________________________
let c1 = new CommentClass("remark-gfm (missing **BOLD** nad *Italic* font-styles)", "# GFM ## Autolink literals www.example.com, https://example.com, and contact@example.com. ## Footnote A note[^1] [^1]: Big note. ## Strikethrough ~one~ or ~~two~~ tildes.", "active", "Created on: 05:57:25 AM Sun Aug 14 2022", "Edited on: 06:01:25 AM Sun Aug 14 2022")
let c2 = new CommentClass("Test comments", "content text", "active", "Created on: 07:57:17 AM Sun Aug 13 2022", "Created on: 07:57:17 AM Sun Aug 13 2022")
let commentsData = [c1, c2];
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
     const [buttonStatus, setButtonStatus] = useState(false);


     const handeButtonStatus = () => {
          setButtonStatus(buttonStatus => (!buttonStatus))
     }

     const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
     }

     const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setContent(event.target.value);
     }

     const handleEditAddComments = (event: React.FormEvent) => {
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
               // activate comment button after edition
               handeButtonStatus();

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

     const editComment = (commentID: number): void => {
          const editedComment: IComment = JSON.parse(String(localStorage.getItem("comments")))
               .find((c: IComment) => c.id === commentID)

          // console.log(editedComment); //entire old obj
          // delete OLD edited comment
          const oldLocalStorage = JSON.parse(String(localStorage.getItem("comments")));
          const updatedLocalStorage = oldLocalStorage.filter((c: IComment) => c.id !== commentID)
          localStorage.setItem("comments", JSON.stringify(updatedLocalStorage));
          setComments(comments => comments.filter(c => c.id !== commentID))

          // ***** save edit commen in localStorage to reuse form
          localStorage.setItem("editComment", (JSON.stringify(editedComment)));
          setTitle(editedComment.title);
          setContent(editedComment.content);


     }

     const deleteComment = (commentID: number): void => {
          const oldLocalStorage = JSON.parse(String(localStorage.getItem("comments")));
          const updatedLocalStorage = oldLocalStorage.filter((c: IComment) => c.id !== commentID)
          localStorage.setItem("comments", JSON.stringify(updatedLocalStorage));
          setComments(comments => comments.filter(c => c.id !== commentID))
     }

     const changeCommentStatus = (commentID: number): void => {
          const oldLocalStorage = JSON.parse(String(localStorage.getItem("comments")));
          const commentIndex = oldLocalStorage.findIndex((comment: IComment) => comment.id === commentID)
          const comment: IComment = oldLocalStorage.find((c: IComment) => c.id === commentID)
          const updatedLocalStorage = oldLocalStorage.filter((c: IComment) => c.id !== commentID)
          comment.status = ((comment.status === "active") ? "suspended" : "active");
          updatedLocalStorage.splice(commentIndex, 0, comment);
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


               {/* _______________________________________________________________________ */}
               <div className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={handleEditAddComments}>
                         <label htmlFor="title">Title</label>
                         <input value={title} onChange={handleTitle} placeholder="name"
                              type="text" name="title" id="title" maxLength={80} />

                         <label htmlFor="content">Content</label>
                         <textarea value={content} onChange={handleContent} placeholder="Type your text here..."
                              name="content" id="content" cols={30} rows={5} maxLength={512}>
                         </textarea>
                         <button className={styles[("formBtn" + ((title.trim().length < 3 || content.trim().length < 3) ? 'Disabled' : 'Active'))]}
                              type="submit"
                              // onClick={handleEditAddComments}
                              disabled={(title.trim().length < 3 || content.trim().length < 3)
                                   ? true : false}
                         > SAVE COMMENT</button>
                    </form>
               </div>
               <CommentsWrapper
                    data={comments}
                    parentDeleteFunction={deleteComment}
                    parentEditFunction={editComment}
                    parentChangeCommentStatus={changeCommentStatus}
                    buttonStatus={buttonStatus}
                    handeButtonStatus={handeButtonStatus}
               ></CommentsWrapper>

          </>

     );
}

export default BlogForm;