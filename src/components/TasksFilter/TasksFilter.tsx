import type {Filter, TodoInfo} from "../../type";
import styles from './TasksFilter.module.scss'
import {Segmented} from "antd";
import type {Dispatch, SetStateAction} from "react";

export interface FilteredTaskProps {
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
    count: TodoInfo;
}

export const FilterButtons = ({filter, setFilter, count}: FilteredTaskProps) => {

    return(
            <div className={styles.container}>
                <Segmented
                options={[
                    {
                        label: `Все(${count.all})`,
                        value: 'all'
                    },
                    {
                        label: `Активные(${count.inWork})`,
                        value: 'inWork'
                    },
                    {
                        label: `Завершенные(${count.completed})`,
                        value: 'completed'
                    },
                ]}
                value={filter}
                onChange={setFilter}
                size="large"
                >
                </Segmented>
            </div>
    )
}




