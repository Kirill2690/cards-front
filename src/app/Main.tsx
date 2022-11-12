import React from 'react';
import {Header} from '../features/header/Header';
import {Pages} from './pages/Pages';

export const Main = () => {
  return (
      <div>
        <Header/>
        <Pages/>
      </div>
  );
};