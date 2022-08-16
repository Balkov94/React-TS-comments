
import { Comment } from "../Comment/Comment";
import styles from "./CommentsWrapper.module.css"
import { IComment } from "../Comment/Comment";
import { useState } from "react";


export interface IallComments {
     data: IComment[];

}
export interface IParentFunctions {
     parentDeleteFunction(target?: number): void;
     parentEditFunction(target?: number): void;
     parentChangeCommentStatus(target?: number): void;
     buttonStatus: boolean
     handeButtonStatus(): void;
}


function CommentsWrapper(props: IallComments & IParentFunctions) {
     const [filter, setFilter] = useState("all");
   
     const handleFilterChange = (e: any) => {
          setFilter(e.target.value)
     }

     return (
          <div className={styles.wrapper}>
               <h1 className={styles.sectionTitle}>Comments</h1>
               <div className={styles.filterContainer}>
                    <select
                         name="filter"
                         id="filer"
                         defaultValue={filter}
                         onChange={(e) => handleFilterChange(e)}
                    >
                         <option className={styles.filterOptions} value="all">show all</option>
                         <option className={styles.filterOptions} value="active" defaultChecked>show active</option>
                         <option className={styles.filterOptions} value="suspended">show suspended</option>
                    </select>
               </div>
            
               {     
                    props.data.filter((c: IComment) => c.status === (filter === "all" ? c.status : (filter === "active" ? "active" : "suspended")))
                         .map(c => {
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

                                   buttonStatus={props.buttonStatus}
                                   handeButtonStatus={props.handeButtonStatus}
                              ></Comment>
                         })
               }



          </div>
     );
}

export default CommentsWrapper;