import React, { forwardRef, useEffect, useState } from "react";
import { IParentFunctions } from "../CommentsWrapper/CommentsWrapper";
import { commentStatus } from "../interfaces/classesAndInterfaces";
import styles from "./Comment.module.css";

import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

export interface IComment {
     key?: number
     id: number
     title: string,
     content: string
     status: commentStatus,
     timeOfCreation: string,
     timeOfModification: string,
}


// const Comment = forwardRef((props:IComment & IParentFunctions, currRef) => {
//      // passing the ref to a DOM element, 
//      // so that the parent has a reference to the DOM node


function Comment(props: IComment & IParentFunctions) {
     const [selected, setSelected] = useState(props.status)//active , suspended
     // const [buttonStatus, setButtonStatus] = useState<boolean>(props.buttonStatus) //true , false

     const handleEditComment = (target: number) => {
          props.parentEditFunction(target);
          props.parentAutoScroll(props.currRef)
          // disable buttons
          props.handeButtonStatus();
          // main app is overflow-y auto !!! scrolllTO doesn't work
          // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

          //disabbuttons until edition ends


     }

     const handleChangeCommentStatus = (event: any) => {
          setSelected(event.target.value);
          props.parentChangeCommentStatus(props.id);
          // lift the state up to the main parent
          // to change the status in localStorage and parent status TOO
          // props.parentChangeCommentStatus(props.id);

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
                    <ReactMarkdown remarkPlugins={[remarkGfm]} >
                         {props.content}
                    </ReactMarkdown>
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
                         (props.timeOfCreation !== props.timeOfModification) ?
                              (<span>{props.timeOfModification}</span>)
                              :
                              null
                    }

               </div>
               <div className={styles.btnsContainer}>
                    {/* <button className={styles.commentDelBtnDiabled} */}
                    <button className={styles[("commentEditBtn" + (props.buttonStatus ? 'Disabled' : ''))]}
                         disabled={props.buttonStatus}
                         onClick={() => handleEditComment(props.id)}>Edit</button>
                    <button className={styles[("commentDelBtn" + (props.buttonStatus ? 'Disabled' : ''))]}
                         disabled={props.buttonStatus}
                         onClick={() => handleDeleteComment(props.id)}>Delete</button>
               </div>
          </div>
     );
}

export { Comment };