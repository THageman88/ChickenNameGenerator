import React from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
} from '@mui/material';

interface QuestionPageProps {
  question: string;
  imageSrc: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;               
}

export default function QuestionPage({
  question,
  imageSrc,
  children,
  onNext,
  onBack,                          
}: QuestionPageProps) {
  return (
    <Stack spacing={2} alignItems="center" sx={{ p: 4 }}>
      <Typography variant="h4" fontFamily="fantasy">
        Chicken Name Generator
      </Typography>
      <Box
        component="img"
        src={imageSrc}
        rel="preload"
        alt={question}
        sx={{ width: 200, height: 200, objectFit: 'cover',   border: '8px solid #8B4513',
  borderRadius: '6px',
  boxShadow: '0 0 12px rgba(152, 30, 30, 0.74)',
  backgroundColor: '#f5f5dc',
  padding: '4px' }}
      />
            <Typography variant="h6">{question}</Typography>
      {children}

      <Stack direction="row" spacing={2}>
        {onBack && (
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        )}
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
