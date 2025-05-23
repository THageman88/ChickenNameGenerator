import { useState, useEffect } from 'react';
import type {
  Color,
  Pattern,
  Season,
  TimeOfDay,
  Trait,
  Treat,
  Weather,
} from '../Names';
import {
  Colors,
  Patterns,
  Seasons,
  TimesOfDay,
  Traits,
  Treats,
  Weathers,
} from '../Names';
import type { ChatInput } from '../openai';
import { generateChickenName } from '../openai';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  MenuItem,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import ChickenNAMING from '../images/ChickenNAMING.png';
import chickenWindow from '../images/chickenWindow.png';
import ResultImage from '../images/result.png';
import QuestionPage from './QuestionPage';

const questionData = [
  { label: 'Season',          options: Seasons },
  { label: 'Time of Day',     options: TimesOfDay },
  { label: 'Weather',         options: Weathers },
  { label: 'Feather Pattern', options: Patterns },
  { label: 'Primary Color',   options: Colors },
  { label: 'Temperament',     options: Traits },
  { label: 'Favorite Treat',  options: Treats },
] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function NameGenerator() {
  const [season,    setSeason]    = useState<Season>(Seasons[0]);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(TimesOfDay[0]);
  const [weather,   setWeather]   = useState<Weather>(Weathers[0]);
  const [pattern,   setPattern]   = useState<Pattern>(Patterns[0]);
  const [color,     setColor]     = useState<Color>(Colors[0]);
  const [trait,     setTrait]     = useState<Trait>(Traits[0]);
  const [treat,     setTreat]     = useState<Treat>(Treats[0]);

  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('chickenNamesHistory');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('chickenNamesHistory', JSON.stringify(history));
  }, [history]);

  const [name,    setName]    = useState('');
  const [step,    setStep]    = useState(0);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const pickThreeInputs = (): ChatInput[] => {
    const all: ChatInput[] = [
      { label: 'Season',          value: season },
      { label: 'Time of Day',     value: timeOfDay },
      { label: 'Weather',         value: weather },
      { label: 'Feather Pattern', value: pattern },
      { label: 'Primary Color',   value: color },
      { label: 'Temperament',     value: trait },
      { label: 'Favorite Treat',  value: treat },
    ];
    return shuffle(all).slice(0, 3);
  };

  const handleNext = async () => {
    if (loading) return;

    if (step < questionData.length) {
      setStep(step + 1);
      return;
    }

    setStep(step + 1);
    setLoading(true);
    setError(null);

    const inputs = pickThreeInputs();
    try {
      const generated = await generateChickenName(inputs, history);
      setName(generated);
      setHistory(h => {
        const next = [generated, ...h];
        return next.length > 25 ? next.slice(0, 25) : next;
      });
    } catch (err) {
      console.error(err);
      setError('Sorry, could not generate a name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleRetry = () => {
    setSeason(Seasons[0]);
    setTimeOfDay(TimesOfDay[0]);
    setWeather(Weathers[0]);
    setPattern(Patterns[0]);
    setColor(Colors[0]);
    setTrait(Traits[0]);
    setTreat(Treats[0]);
    setName('');
    setHistory([]);
    setStep(0);
    setError(null);
  };

  // Welcome screen
  if (step === 0) {
    return (
      <Stack spacing={2} alignItems="center" sx={{ p: 4 }}>
        <Typography variant="h4" fontFamily="fantasy">
          Chicken Name Generator
        </Typography>
        <Box
          component="img"
          src={ChickenNAMING}
          alt="Welcome"
          sx={{
            width: 200,
            height: 200,
            border: '8px solid #8B4513',
            borderRadius: '6px',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.6)',
            backgroundColor: '#f5f5dc',
          }}
        />
        <Button variant="contained" onClick={() => setStep(1)}>
          Start
        </Button>
      </Stack>
    );
  }

  // Questionnaire pages
  if (step > 0 && step <= questionData.length) {
    const { label, options } = questionData[step - 1];
    const currentValue =
      label === 'Season'          ? season :
      label === 'Time of Day'     ? timeOfDay :
      label === 'Weather'         ? weather :
      label === 'Feather Pattern' ? pattern :
      label === 'Primary Color'   ? color :
      label === 'Temperament'     ? trait :
                                    treat;

    const onChange = (e: SelectChangeEvent<string>) => {
      const v = e.target.value;
      if (label === 'Season')           setSeason(v as Season);
      else if (label === 'Time of Day') setTimeOfDay(v as TimeOfDay);
      else if (label === 'Weather')     setWeather(v as Weather);
      else if (label === 'Feather Pattern') setPattern(v as Pattern);
      else if (label === 'Primary Color')   setColor(v as Color);
      else if (label === 'Temperament')     setTrait(v as Trait);
      else                                  setTreat(v as Treat);
    };

    return (
      <QuestionPage
        question={label}
        imageSrc={chickenWindow}
        onNext={handleNext}
        onBack={handleBack}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{color:'inherit'}}>{label}</InputLabel>
          <Select value={currentValue} label={label}  onChange={onChange}>
            {options.map(opt => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </QuestionPage>
    );
  }

  return (
    <Stack spacing={2} alignItems="center" sx={{ p: 4 }}>
      <Typography variant="h4" fontFamily="fantasy">
        Chicken Name Generator
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          component="img"
          src={ResultImage}
          alt="Result"
          sx={{
            width: 200,
            height: 200,
            border: '8px solid #8B4513',
            borderRadius: '6px',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.6)',
            backgroundColor: '#f5f5dc',
            padding: '4px',
          }}
        />
      )}

      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <>
          <Typography variant="h6">Your Chicken Name Is:</Typography>
          <Typography variant="h3" fontWeight="bold">
            {name}
          </Typography>
        </>
      )}

      <Button variant="contained" onClick={handleRetry} disabled={loading}>
        Retry
      </Button>
    </Stack>
  );
}
