
import { Comment } from "../Comment/Comment";
import styles from "./CommentsWrapper.module.css"

import { IComment } from "../Comment/Comment";


export interface IallComments {
     data: IComment[];

}
export interface IParentFunctions {
     parentDeleteFunction(target?: number): void;
     parentEditFunction(target?: number): void;
     parentChangeCommentStatus(target?: number): void;
}

function CommentsWrapper(props: IallComments & IParentFunctions) {

     return (
          <div className={styles.wrapper}>
               <h1>Comments</h1>
               {


                    props.data.map((c: IComment) => {
                         return <Comment
                              key={c.id}
                              id={c.id}
                              title={c.title}
                              content={c.content}
                              status={c.status}
                              timeOfCreation={c.timeOfCreation}
                              timeOfModification={c.timeOfModification}
                              parentDeleteFunction={props.parentDeleteFunction}
                              parentEditFunction={props.parentEditFunction}
                              parentChangeCommentStatus={props.parentChangeCommentStatus}

                         ></Comment>
                    })

               }
          </div>
     );
}

export default CommentsWrapper;