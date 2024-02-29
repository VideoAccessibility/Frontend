import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: 'auto', md: '100%' },
      flexDirection: { md: 'column' },
      px: { md: 2 },
    }}
    style={{ backgroundColor: '#D9D9D9' }}
  >
    {categories.map((category, idx) => (
      <Link to={category.href} className='full-width' key={idx}>
        <button
          className='category-btn'
          onClick={() => {
            // Check if setSelectedCategory is a function before calling it
            if (typeof setSelectedCategory === 'function') {
              setSelectedCategory(category.name);
            }
          }}
          style={{
            background: category.name === selectedCategory && '#C6C6C6',
            color: '#33363F',
            width: '100%',
          }}
        >
          <span style={{ color: '#33363F', marginRight: '15px' }}>
            {category.icon}
          </span>
          <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8' }}>
            {category.name}
          </span>
        </button>
      </Link>
    ))}
  </Stack>
);

export default Sidebar;
