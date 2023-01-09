import React from 'react';
import ReactDOM from 'react-dom';
import { NewButton } from './components';

function App() {
  return (
    <NewButton name="新按钮" />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));