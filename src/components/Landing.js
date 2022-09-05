import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../index.css";

export default function Landing() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="d-flex flex-column text-center align-items-center justify-content-center h100">
        <div className="f1">SPLIT</div>
        <div className="mt-4 f2">One stop solution for instant bill splits</div>
        <Button variant="outline-secondary" className='w mt-4' size="sm"> <Link to="/dashboard" className="aHome"> Explore  </Link></Button>
    </div>
    </div>
  )
}
