import type {FilterType, TodoInfo} from "../../type";
import styles from './TasksFilter.module.scss'

export interface FilteredTaskProps {
    filter: FilterType;
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
    count: TodoInfo;
}

export const FilteredTasks = ({filter, setFilter, count}: FilteredTaskProps) => {



    return(
            <div className={styles.container}>
                <button className={`${styles.button} ${filter === 'all' ? styles.active : ''}`} onClick={() => setFilter('all')}>Все({count.all})</button>
                <button className={`${styles.button} ${filter === 'inWork' ? styles.active : ''}`} onClick={() => setFilter('inWork')}>В работе({count.inWork})</button>
                <button className={`${styles.button} ${filter === 'completed' ? styles.active : ''}`} onClick={() => setFilter('completed')}>Сделано({count.completed})</button>
            </div>
    )
}




