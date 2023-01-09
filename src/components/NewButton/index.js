import React from 'react';
import './index.scss';

export default function NewButton(props) {
  return (
  <button style={{ color: 'red' }} className="btn-style">{props.name}</button>
  )
}