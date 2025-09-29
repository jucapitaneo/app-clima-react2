import React, { useState } from 'react';
import InputText from '../atoms/InputText';
import ButtonPrimary from '../atoms/ButtonPrimary';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  function submit(e) {
    e.preventDefault();
    const city = (value || '').trim();
    if (city) onSearch(city);
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <InputText value={value} onChange={setValue} placeholder="Ex: São Paulo" />
      <ButtonPrimary onClick={submit}>Buscar</ButtonPrimary>
    </form>
  );
}