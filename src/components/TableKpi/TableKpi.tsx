import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import styles from './TableKpi.module.scss'
const data = [
    {level: 'ОАО ТРАНСНЕФТЬ', oee: '20%', marge: '5%', plan: '801 шт', m: '80%'},
    {level: 'РБК АИ', oee: '22%', marge: '15%', plan: '642 шт', m: '10%'},
    {level: 'ООО КОРУС',oee: '30%', marge: '8%', plan: '531 шт', m: '90%'},
    { level: 'ТОО KAZTECH', oee: '74%', marge: '18%', plan: '1240 шт', m: '67%' },
    { level: 'АО СЕВЕРСТАЛЬ', oee: '81%', marge: '24%', plan: '980 шт', m: '88%' },
    { level: 'ТОО ASTANA LOGISTIC', oee: '56%', marge: '12%', plan: '430 шт', m: '45%' },
    { level: 'ООО ПРОМРЕСУРС', oee: '63%', marge: '17%', plan: '710 шт', m: '72%' },
    { level: 'АО KAZMINING', oee: '91%', marge: '29%', plan: '1560 шт', m: '95%' },
    { level: 'ТОО ALMA ENGINEERING', oee: '48%', marge: '9%', plan: '390 шт', m: '51%' },
    { level: 'ООО ТЕХНОПРОМ', oee: '69%', marge: '21%', plan: '845 шт', m: '77%' },
    { level: 'АО NEFT SERVICE', oee: '84%', marge: '26%', plan: '1320 шт', m: '93%' },
    { level: 'ТОО QAZ ENERGY', oee: '58%', marge: '14%', plan: '605 шт', m: '61%' },
    { level: 'ООО SMART FACTORY', oee: '77%', marge: '19%', plan: '990 шт', m: '82%' },
    { level: 'АО DIGITAL SYSTEMS', oee: '66%', marge: '16%', plan: '720 шт', m: '70%' },
    { level: 'ТОО INDUSTRIAL GROUP', oee: '73%', marge: '23%', plan: '1110 шт', m: '86%' },
]

const columnHelper = createColumnHelper()

const columns: any[] = [
    columnHelper.accessor('level', {
        header: 'Предприятие',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('oee', {
        header: 'ОЕЕ',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('marge', {
        header: 'Маржинальность',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('plan', {
        header: 'Выполнение плана',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('m', {
        header: 'Загрузка мощностей',
        cell: info => info.getValue()
    })
]

export const TableKpi = () => {

   const table = useReactTable({
       data, columns, getCoreRowModel: getCoreRowModel()
   })

    return (
        <div className={styles.main1}>
            <h1>Таблица следующего уровня</h1>
            <table className={styles.table1}>
                <thead className={styles.thead1}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className={styles.tr1}>
                        {headerGroup.headers.map(header => (
                            <th className={styles.th1} key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className={styles.tr1}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className={styles.td1}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}