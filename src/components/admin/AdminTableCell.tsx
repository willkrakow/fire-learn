import React from 'react'
import { TableCell, Typography, TableCellProps, TypographyProps } from '@material-ui/core';

interface ITableCell extends TableCellProps {
    value: string;
    align: 'left' | 'center' | 'right';
    className?: string;
    typographyVariant?: TypographyProps['variant'];
}



type IAdminCell = TypographyProps & ITableCell;

const AdminTableCell: React.FC<IAdminCell> = ({ typographyVariant, value, align="center", className, ...props }: IAdminCell) => {
    return (
        <TableCell align={align} className={className} {...props}>
            <Typography color="primary" variant={typographyVariant}>
                {value}
            </Typography>
        </TableCell>
    )
}

export default AdminTableCell