import React from 'react'
import { TableCell, Typography, TableCellProps, TypographyProps } from '@material-ui/core';

interface ITableCell extends TableCellProps {
    value: string;
    align: 'left' | 'center' | 'right';
    className?: string;
}



type IAdminCell = TypographyProps & ITableCell;

const AdminCell: React.FC<IAdminCell> = ({ value, variant, align="center", className, ...props }: IAdminCell) => {
    return (
        <TableCell align={align} className={className} {...props}>
            <Typography variant={variant}>
                {value}
            </Typography>
        </TableCell>
    )
}

export default AdminCell