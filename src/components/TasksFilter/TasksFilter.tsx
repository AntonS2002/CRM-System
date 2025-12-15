import type {FilterType, TodoInfo} from "../../type";

export interface FilteredTaskProps {
    filter: FilterType;
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
    count: TodoInfo;
}

export const FilteredTasks = ({filter, setFilter, count}: FilteredTaskProps) => {



    return(
            <div className={'container'}>
                <button className={`btn-aac ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Все({count.all})</button>
                <button className={`btn-aac ${filter === 'inWork' ? 'active' : ''}`} onClick={() => setFilter('inWork')}>В работе({count.inWork})</button>
                <button className={`btn-aac ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Сделано({count.completed})</button>
            </div>
    )
}




