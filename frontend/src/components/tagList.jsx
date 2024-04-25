import React from 'react';
import { Box, Typography } from '@mui/material';

const TagList = ({ tags, selectedTag, onTagSelected }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '10px', 
      flexWrap: 'wrap', 
      margin: '20px 0'
    }}>
      {tags.map(tag => (
        <Typography
          key={tag}
          sx={{
            cursor: 'pointer',
            color: selectedTag === tag ? '#58a75b' : 'inherit',
            '&:hover': {
              color: '#58a75b'
            },
            padding: '8px 16px',
            borderRadius: '20px',
          }}
          onClick={() => onTagSelected(tag)}
        >
          {tag}
        </Typography>
      ))}
    </Box>
  );
};

export default TagList;
