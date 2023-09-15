import { Stack } from '@mui/material';
import { categories } from '../utils/constants';

const Sidebar = ({selectedCategory, setSelectedCategory}) => (
    <Stack
        direction= "row"
        sx = {{
            overflowY: "auto",
            height : { sx: 'auto', md: '100%' },
            flexDirection : { md : 'column'},
            px : { md : 1}
        }}
        style={ {backgroundColor : '#D9D9D9'}}>

        {categories.map((category) => (
            <a href = {category.href} className='full-width'>
            <button className='category-btn'
            onClick={() => 
            setSelectedCategory(category.name)}
            style={{
                background: category.name === selectedCategory && '#C6C6C6',
                color: '#33363F',
            }}
            key = {category.name}
            >
                <span
                style={{
                color: '#33363F',
                marginRight: '15px'}}>
                {category.icon}
                </span>
                <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
                    {category.name}
                </span>
            </button>
            </a>
        ))}

    </Stack>
  )

export default Sidebar;