import type {FilterType, TodoInfo} from "../../type";
import styles from './TasksFilter.module.scss'
import {Button} from "antd";

export interface FilteredTaskProps {
    filter: FilterType;
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
    count: TodoInfo;
}

export const FilteredTasks = ({filter, setFilter, count}: FilteredTaskProps) => {



    return(
            <div className={styles.container}>
                <Button className={`${styles.button} ${filter === 'all' ? styles.active : ''}`} onClick={() => setFilter('all')}>Все({count.all})</Button>
                <Button className={`${styles.button} ${filter === 'inWork' ? styles.active : ''}`} onClick={() => setFilter('inWork')}>В работе({count.inWork})</Button>
                <Button className={`${styles.button} ${filter === 'completed' ? styles.active : ''}`} onClick={() => setFilter('completed')}>Сделано({count.completed})</Button>
            </div>
    )
}




