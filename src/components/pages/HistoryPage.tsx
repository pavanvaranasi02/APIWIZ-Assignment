import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import JournalList from '../organisms/JournalList';
import { JournalEntry } from '../../types';

const HistoryPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  useEffect(() => {
    const fetchEntries = async () => {
      const mockEntries: JournalEntry[] = [
      ];
      setEntries(mockEntries);
    };

    fetchEntries();
  }, []);

  const handleFilterChange = (mood: string) => {
    setSelectedFilter(mood);
  };

  return (
    <Container maxWidth="lg">
      <JournalList
        entries={entries}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
      />
    </Container>
  );
};

export default HistoryPage;