import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    margin: ' 20px 0px 20px 0px',
    listStyleType: 'none',
    '& >li': {
      margin: 0,
      padding: '16px',
    },
  },
});
const namess = 'category.name';
const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovevable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'có khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovevable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) => `từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte'),
    isRemovevable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: null,
  },
  // {
  //   id: 4,
  //   getLabel: (filters) => `kien dep trai`,
  //   isActive: () => true,
  //   isVisible: (filters) => Object.keys(filters).includes('category.name'),
  //   isRemovevable: true,
  //   onRemove: (filters) => {
  //     const newFilters = { ...filters };
  //     const namess = ""
  //     delete newFilters.category.name;

  //     return newFilters;
  //   },
  //   onToggle: (filters) => {},
  // },
];
FilterproductView.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

function FilterproductView({ filters = {}, onChange = null }) {
  const classes = useStyles();
  return (
    <Box component="ul" className={classes.root}>
      {FILTER_LIST.filter((x) => x.isVisible(filters)).map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovevable}
            onClick={
              x.isRemovevable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovevable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterproductView;
