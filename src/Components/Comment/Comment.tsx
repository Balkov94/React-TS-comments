import { useEffect, useState } from "react";
import { IParentFunctions } from "../CommentsWrapper/CommentsWrapper";
import { commentStatus } from "../interfaces/classesAndInterfaces";
import styles from "./Comment.module.css"

export interface IComment {
     key?: number
     id: number
     title: string,
     content: string
     status: commentStatus,
     timeOfCreation: string,
     timeOfModification: string,
}


function Comment(props: IComment & IParentFunctions) {
     const [selected, setSelected] = useState(props.status)//active , suspended

     const handleChangeCommentStatus = (event: any) => {
          setSelected(event.target.value);
          // lift the state up to the main parent
          // to change the status in localStorage too
          props.parentChangeCommentStatus(props.id);
     };


     const handleEditComment = (target: number) => {
          debugger;
          props.parentEditFunction(target);
          // main app is overflow-y auto !!! scrolllTO doesn't work
          // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
          

     }

     const handleDeleteComment = (targetID: number) => {
          props.parentDeleteFunction(targetID);
     }

     return (
          <div className={styles.commentWrapper}>
               <div className={styles.titleContainer}>
                    <h1>{props.title}</h1>
               </div>
               <div className={styles.contentContainer}>
                    <p>{props.content}</p>
               </div>

               <div className={styles.radioBtnContainer}>
                    <form action="submit">
                         <label htmlFor="active">active</label>
                         <input
                              type="radio"
                              name="commentStatus"
                              id="active"
                              value="active"
                              checked={selected === "active"}
                              onChange={handleChangeCommentStatus}
                         />
                         <label htmlFor="suspended">suspended</label>
                         <input
                              type="radio"
                              name="commentStatus"
                              id="suspended"
                              value="suspended"
                              checked={selected === "suspended"}
                              onChange={handleChangeCommentStatus}
                         />
                    </form>

               </div>

               <div className={styles.commentDatesContainer}>
                         <span>{props.timeOfCreation}</span>
                         {
                              (props.timeOfCreation!==props.timeOfModification)?
                             ( <span>{props.timeOfModification}</span>)
                             :
                             null
                         }
                        
               </div>

               <div className={styles.btnsContainer}>
                    <button className={styles.commentEditBtn} 
                    onClick={() => handleEditComment(props.id)}>Edit</button>
                    <button className={styles.commentDelBtn} 
                    onClick={() => handleDeleteComment(props.id)}>Delete</button>
               </div>
          </div>
     );
}

export { Comment };